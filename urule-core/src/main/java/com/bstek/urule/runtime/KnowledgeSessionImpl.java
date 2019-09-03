package com.bstek.urule.runtime;

import com.bstek.urule.Utils;
import com.bstek.urule.debug.DebugWriter;
import com.bstek.urule.debug.MessageItem;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.model.GeneralEntity;
import com.bstek.urule.model.flow.FlowDefinition;
import com.bstek.urule.model.flow.ins.FlowContextImpl;
import com.bstek.urule.model.library.Datatype;
import com.bstek.urule.runtime.agenda.Agenda;
import com.bstek.urule.runtime.agenda.AgendaFilter;
import com.bstek.urule.runtime.event.KnowledgeEvent;
import com.bstek.urule.runtime.event.KnowledgeEventListener;
import com.bstek.urule.runtime.response.ExecutionResponseImpl;
import com.bstek.urule.runtime.response.FlowExecutionResponse;
import com.bstek.urule.runtime.response.RuleExecutionResponse;
import com.bstek.urule.runtime.rete.*;

import java.io.IOException;
import java.util.*;

public class KnowledgeSessionImpl implements KnowledgeSession {
    private Context context;
    private EvaluationContextImpl evaluationContext;
    private FlowContextImpl flowContext;
    private Agenda agenda;
    private KnowledgeSession parentSession;
    private List<String> activedActivationGroup;
    private Map<String, Object> sessionValueMap;
    private List<MessageItem> execMessageItems;
    private Map<String, Object> initParameters;
    private Map<String, Object> allFactsMap;
    private List<KnowledgePackage> knowledgePackageList;
    private List<ReteInstance> reteInstanceList;
    private Map<String, Object> parameterMap;
    private List<Map<?, ?>> factMaps;
    private Map<String, KnowledgeSession> knowledgeSessionMap;
    private Map<String, List<ReteInstanceUnit>> activationReteInstancesMap;
    private Map<String, List<ReteInstanceUnit>> agendaReteInstancesMap;
    private KnowledgeEventManager knowledgeEventManager;

    public KnowledgeSessionImpl(KnowledgePackage knowledgePackage) {
        this((new KnowledgePackage[]{knowledgePackage}), null);
    }

    public KnowledgeSessionImpl(KnowledgePackage knowledgePackage, KnowledgeSession parentSession) {
        this(new KnowledgePackage[]{knowledgePackage}, parentSession);
    }

    public KnowledgeSessionImpl(KnowledgePackage[] knowledgePackages, KnowledgeSession parentSession) {
        this.activedActivationGroup = new ArrayList<>();
        this.sessionValueMap = new HashMap<>();
        this.execMessageItems = new ArrayList<>();
        this.initParameters = new HashMap<>();
        this.allFactsMap = new HashMap<>();
        this.knowledgePackageList = new ArrayList<>();
        this.reteInstanceList = new ArrayList<>();
        this.parameterMap = new HashMap<>();
        this.factMaps = new ArrayList<>();
        this.knowledgeSessionMap = new HashMap<>();
        this.activationReteInstancesMap = new HashMap<>();
        this.agendaReteInstancesMap = new HashMap<>();
        this.knowledgeEventManager = new KnowledgeEventManagerImpl();

        for (KnowledgePackage knowledgePackage : knowledgePackages) {
            this.knowledgePackageList.add(knowledgePackage);
            this.reteInstanceList.add(knowledgePackage.newReteInstance());
            Map<String, String> p = knowledgePackage.getParameters();
            if (p != null) {
                for (String key : p.keySet()) {
                    Datatype type = Datatype.valueOf(p.get(key));
                    if (type.equals(Datatype.Integer)) {
                        this.initParameters.put(key, 0);
                    } else if (type.equals(Datatype.Long)) {
                        this.initParameters.put(key, 0);
                    } else if (type.equals(Datatype.Double)) {
                        this.initParameters.put(key, 0);
                    } else if (type.equals(Datatype.Float)) {
                        this.initParameters.put(key, 0);
                    } else if (type.equals(Datatype.Boolean)) {
                        this.initParameters.put(key, false);
                    } else if (type.equals(Datatype.List)) {
                        this.initParameters.put(key, new ArrayList());
                    } else if (type.equals(Datatype.Set)) {
                        this.initParameters.put(key, new HashSet());
                    } else if (type.equals(Datatype.Map)) {
                        this.initParameters.put(key, new HashMap());
                    }
                }
            }
        }

        this.initFromParentSession(parentSession);
        this.initContext();
        this.agenda = new Agenda(this.context);
    }

    public void initFromParentSession(KnowledgeSession parentSession) {
        if (parentSession != null) {
            this.parentSession = parentSession;
            this.knowledgeEventManager.getKnowledgeEventListeners().addAll(parentSession.getKnowledgeEventListeners());
            this.execMessageItems = parentSession.getExecMessageItems();
            this.knowledgeSessionMap = parentSession.getKnowledgeSessionMap();
            this.allFactsMap.putAll(parentSession.getAllFactsMap());
            this.sessionValueMap.putAll(parentSession.getSessionValueMap());
        }
    }

    public RuleExecutionResponse fireRules() {
        return this.execute(null, null, 2147483647);
    }

    public RuleExecutionResponse fireRules(int max) {
        return this.execute(null, null, max);
    }

    public RuleExecutionResponse fireRules(AgendaFilter filter) {
        return this.execute(filter, null, 2147483647);
    }

    public RuleExecutionResponse fireRules(AgendaFilter filter, int max) {
        return this.execute(filter, null, max);
    }

    public RuleExecutionResponse fireRules(Map<String, Object> parameters) {
        return this.execute(null, parameters, 2147483647);
    }

    public RuleExecutionResponse fireRules(Map<String, Object> parameters, AgendaFilter filter) {
        return this.execute(filter, parameters, 2147483647);
    }

    public RuleExecutionResponse fireRules(Map<String, Object> parameters, AgendaFilter filter, int max) {
        return this.execute(filter, parameters, max);
    }

    public RuleExecutionResponse fireRules(Map<String, Object> parameters, int max) {
        return this.execute(null, parameters, max);
    }

    public FlowExecutionResponse startProcess(String processId) {
        return this.startProcess(processId, null);
    }

    public FlowExecutionResponse startProcess(String processId, Map<String, Object> parameters) {
        FlowDefinition targetFlow = null;

        for (KnowledgePackage knowledgePackage : this.knowledgePackageList) {
            Map<String, FlowDefinition> flowMap = knowledgePackage.getFlowMap();
            if (flowMap != null && flowMap.containsKey(processId)) {
                targetFlow = flowMap.get(processId);
                break;
            }
        }

        if (targetFlow == null) {
            throw new RuleException("Rule flow [" + processId + "] not exist.");
        } else {
            this.parameterMap.clear();
            this.clearInitParameters();
            this.parameterMap.putAll(this.initParameters);
            if (parameters != null) {
                this.parameterMap.putAll(parameters);
            }

            this.flowContext.setVariableMap(this.parameterMap);
            this.flowContext.setResponse(new ExecutionResponseImpl());
            long start = System.currentTimeMillis();
            targetFlow.newInstance(this.flowContext);
            ExecutionResponseImpl response = (ExecutionResponseImpl) this.flowContext.getResponse();
            response.setDuration(System.currentTimeMillis() - start);
            reset();
            return response;
        }
    }

    private RuleExecutionResponse execute(AgendaFilter filter, Map<String, Object> params, int max) {
        this.parameterMap.clear();
        clearInitParameters();
        this.parameterMap.putAll(this.initParameters);
        for (Map<?, ?> factMap : this.factMaps) {
            for (Object key : factMap.keySet()) {
                this.parameterMap.put(key.toString(), factMap.get(key));
            }
        }
        if (params != null) {
            this.parameterMap.putAll(params);
        }
        addToFactsMap(this.parameterMap);

        long start = System.currentTimeMillis();
        evaluationRete(this.allFactsMap.values());
        ExecutionResponseImpl resp = (ExecutionResponseImpl) this.agenda.execute(filter, max);
        resp.setDuration(System.currentTimeMillis() - start);
        reset();
        return resp;
    }

    private void clearInitParameters() {
        List<String> stringList = new ArrayList<>();
        Iterator var2 = this.initParameters.keySet().iterator();

        String key;
        while (var2.hasNext()) {
            key = (String) var2.next();
            Object obj = this.initParameters.get(key);
            if (obj != null) {
                if (obj instanceof List) {
                    ((List) obj).clear();
                } else if (obj instanceof Set) {
                    ((Set) obj).clear();
                } else if (obj instanceof Map) {
                    ((Map) obj).clear();
                } else if (obj instanceof Number) {
                    this.initParameters.put(key, 0);
                } else if (obj instanceof Boolean) {
                    this.initParameters.put(key, false);
                } else if (obj instanceof String) {
                    stringList.add(key);
                }
            }
        }

        var2 = stringList.iterator();

        while (var2.hasNext()) {
            key = (String) var2.next();
            this.initParameters.remove(key);
        }

    }

    public List<KnowledgePackage> getKnowledgePackageList() {
        return this.knowledgePackageList;
    }

    public Object getParameter(String key) {
        return this.parameterMap.get(key);
    }

    public boolean update(Object obj) {
        this.reevaluate(obj);
        return true;
    }

    public boolean insert(Object fact) {
        if (!(fact instanceof GeneralEntity) && fact instanceof Map) {
            Map<?, ?> map = (Map) fact;
            this.factMaps.add(map);
            return false;
        } else {
            this.addToFactsMap(fact);
            return true;
        }
    }

    public boolean retract(Object fact) {
        this.agenda.retract(fact);
        this.allFactsMap.remove(this.getClassName(fact));
        return true;
    }

    public void assertFact(Object fact) {
        this.addToFactsMap(fact);
        this.reevaluate(fact);
    }

    public Map<String, Object> getParameters() {
        return this.parameterMap;
    }

    private void addToFactsMap(Object fact) {
        String className = this.getClassName(fact);
        this.allFactsMap.put(className, fact);
    }

    private String getClassName(Object fact) {
        String className = null;
        if (fact instanceof GeneralEntity) {
            GeneralEntity ge = (GeneralEntity) fact;
            className = ge.getTargetClass();
        } else {
            className = fact.getClass().getName();
        }

        return className;
    }

    private void reset() {
        this.activationReteInstancesMap.clear();
        this.agenda.clean();
        this.factMaps.clear();
        this.allFactsMap.clear();
        this.activedActivationGroup.clear();
        this.agendaReteInstancesMap.clear();
    }

    private void reevaluate(Object obj) {
        for (ReteInstance reteInstance : this.reteInstanceList) {
            reteInstance.resetForReevaluate(obj);
        }

        List<Object> facts = new ArrayList<>();
        facts.add(obj);
        evaluationRete(facts);
    }

    private void evaluationRete(Collection<Object> facts) {
        Iterator reteInstanceIterator = this.reteInstanceList.iterator();

        label84:
        while (true) {
            ReteInstance reteInstance;
            Collection trackers = null;
            Map reteInstanceMap;
            do {
                if (!reteInstanceIterator.hasNext()) {
                    this.evaluationContext.clean();
                    return;
                }

                reteInstance = (ReteInstance) reteInstanceIterator.next();
                for (Object fact : facts) {
                    this.doRete(reteInstance, fact, false);
                }

                this.doRete(reteInstance, "__*__", true);
                Map<String, List<ReteInstanceUnit>> agendaReteInstanceMap = reteInstance.getAgendaGroupReteInstancesMap();
                if (agendaReteInstanceMap != null) {
                    this.agendaReteInstancesMap.putAll(agendaReteInstanceMap);
                }

                reteInstanceMap = reteInstance.getActivationGroupReteInstancesMap();
            } while (reteInstanceMap == null);

            this.activationReteInstancesMap.putAll(reteInstanceMap);
            Iterator var7 = reteInstanceMap.keySet().iterator();

            label82:
            while (true) {
                String key;
                String id;
                do {
                    if (!var7.hasNext()) {
                        continue label84;
                    }

                    key = (String) var7.next();
                    id = reteInstance.getId() + key;
                } while (this.activedActivationGroup.contains(id));

                List<ReteInstanceUnit> insList = (List<ReteInstanceUnit>) reteInstanceMap.get(key);
                Iterator var11 = insList.iterator();

                while (true) {
                    ReteInstanceUnit insUnit;
                    Date expiresDate;
                    do {
                        Date effectiveDate;
                        do {
                            if (!var11.hasNext()) {
                                continue label82;
                            }

                            insUnit = (ReteInstanceUnit) var11.next();
                            effectiveDate = insUnit.getEffectiveDate();
                        } while (effectiveDate != null && effectiveDate.getTime() > (new Date()).getTime());

                        expiresDate = insUnit.getExpiresDate();
                    } while (expiresDate != null && expiresDate.getTime() < (new Date()).getTime());

                    ReteInstance ri = insUnit.getReteInstance();
                    for (Object fact : facts) {
                        trackers = ri.enter(this.evaluationContext, fact);
                        if (trackers != null && trackers.size() > 0) {
                            this.activedActivationGroup.add(id);
                            this.agenda.addTrackers(trackers, false);
                            break;
                        }
                    }

                    if (trackers != null && trackers.size() > 0) {
                        break;
                    }
                }
            }
        }
    }

    private void doRete(ReteInstance reteInstance, Object fact, boolean noneCondition) {
        Collection<FactTracker> trackers = reteInstance.enter(this.evaluationContext, fact);
        if (trackers != null) {
            this.agenda.addTrackers(trackers, noneCondition);
        }
    }

    public void activeRule(String activationGroupName, String ruleName) {
        if (!this.activationReteInstancesMap.containsKey(activationGroupName)) {
            throw new RuleException("Activation group [" + activationGroupName + "] not exist!");
        } else {
            List<ReteInstanceUnit> unitList = this.activationReteInstancesMap.get(activationGroupName);
            Iterator var4 = unitList.iterator();

            label42:
            while (var4.hasNext()) {
                ReteInstanceUnit insUnit = (ReteInstanceUnit) var4.next();
                String name = insUnit.getRuleName();
                if (name.equals(ruleName)) {
                    Date effectiveDate = insUnit.getEffectiveDate();
                    if (effectiveDate == null || effectiveDate.getTime() <= (new Date()).getTime()) {
                        Date expiresDate = insUnit.getExpiresDate();
                        if (expiresDate == null || expiresDate.getTime() >= (new Date()).getTime()) {
                            ReteInstance reteIns = insUnit.getReteInstance();
                            Iterator var10 = this.allFactsMap.values().iterator();

                            while (true) {
                                if (!var10.hasNext()) {
                                    break label42;
                                }

                                Object fact = var10.next();
                                Collection<FactTracker> trackers = reteIns.enter(this.evaluationContext, fact);
                                if (trackers != null) {
                                    this.agenda.addTrackers(trackers, false);
                                }
                            }
                        }
                    }
                }
            }

            this.evaluationContext.clean();
        }
    }

    public void activeAgendaGroup(String groupName) {
        if (!this.agendaReteInstancesMap.containsKey(groupName)) {
            throw new RuleException("Agenda group [" + groupName + "] not exist!");
        } else {
            List<ReteInstanceUnit> unitList = this.agendaReteInstancesMap.get(groupName);
            Iterator var3 = unitList.iterator();

            while (true) {
                ReteInstanceUnit insUnit;
                Date expiresDate;
                do {
                    Date effectiveDate;
                    do {
                        if (!var3.hasNext()) {
                            return;
                        }

                        insUnit = (ReteInstanceUnit) var3.next();
                        effectiveDate = insUnit.getEffectiveDate();
                    } while (effectiveDate != null && effectiveDate.getTime() > (new Date()).getTime());

                    expiresDate = insUnit.getExpiresDate();
                } while (expiresDate != null && expiresDate.getTime() < (new Date()).getTime());

                ReteInstance reteIns = insUnit.getReteInstance();
                Collection<FactTracker> trackers = null;
                Iterator var9 = this.allFactsMap.values().iterator();

                while (var9.hasNext()) {
                    Object fact = var9.next();
                    trackers = reteIns.enter(this.evaluationContext, fact);
                    if (trackers != null) {
                        this.agenda.addTrackers(trackers, false);
                    }
                }

                trackers = reteIns.enter(this.evaluationContext, "__*__");
                if (trackers != null) {
                    this.agenda.addTrackers(trackers, true);
                }
            }
        }
    }

    public void writeLogFile() throws IOException {
        if (this.execMessageItems.size() != 0) {
            for (DebugWriter writer : Utils.getDebugWriters()) {
                writer.write(this.execMessageItems);
            }

            this.execMessageItems.clear();
        }
    }

    public List<MessageItem> getExecMessageItems() {
        return this.execMessageItems;
    }

    public Map<String, Object> getAllFactsMap() {
        return this.allFactsMap;
    }

    public void addEventListener(KnowledgeEventListener listener) {
        this.knowledgeEventManager.addEventListener(listener);
    }

    public List<KnowledgeEventListener> getKnowledgeEventListeners() {
        return this.knowledgeEventManager.getKnowledgeEventListeners();
    }

    public boolean removeEventListener(KnowledgeEventListener listener) {
        return this.knowledgeEventManager.removeEventListener(listener);
    }

    public void fireEvent(KnowledgeEvent event) {
        this.knowledgeEventManager.fireEvent(event);
    }

    public KnowledgeSession getKnowledgeSession(String id) {
        return this.knowledgeSessionMap.get(id);
    }

    public void putKnowledgeSession(String id, KnowledgeSession session) {
        if (this.knowledgeSessionMap.containsKey(id)) {
            this.knowledgeSessionMap.put(id, session);
        }

    }

    public Object getSessionValue(String key) {
        return this.sessionValueMap.get(key);
    }

    public void setSessionValue(String key, Object value) {
        this.sessionValueMap.put(key, value);
    }

    public Map<String, Object> getSessionValueMap() {
        return this.sessionValueMap;
    }

    public Map<String, KnowledgeSession> getKnowledgeSessionMap() {
        return this.knowledgeSessionMap;
    }

    public KnowledgeSession getParentSession() {
        return this.parentSession;
    }

    private void initContext() {
        Map<String, String> allVariableCategoryMap = null;

        for (KnowledgePackage knowledgePackage : this.knowledgePackageList) {
            if (allVariableCategoryMap == null) {
                allVariableCategoryMap = knowledgePackage.getVariableCateogoryMap();
            } else {
                allVariableCategoryMap.putAll(knowledgePackage.getVariableCateogoryMap());
            }
        }

        this.context = new ContextImpl(this, Utils.getApplicationContext(), allVariableCategoryMap, this.execMessageItems);
        this.evaluationContext = new EvaluationContextImpl(this, Utils.getApplicationContext(), allVariableCategoryMap, this.execMessageItems);
        this.flowContext = new FlowContextImpl(this, allVariableCategoryMap, Utils.getApplicationContext(), this.execMessageItems);
    }

    public Context getContext() {
        return this.context;
    }

    public List<ReteInstance> getReteInstanceList() {
        return this.reteInstanceList;
    }
}
