package com.bstek.urule.model.rete;

import com.bstek.urule.runtime.rete.Activity;
import com.bstek.urule.runtime.rete.ObjectTypeActivity;

import java.util.Map;

public class ObjectTypeNode extends BaseReteNode {
    public static final String NON_CLASS = "*";
    private String objectTypeClass;
    private NodeType nodeType = NodeType.objectType;

    public ObjectTypeNode() {
        super(0);
    }

    public ObjectTypeNode(String objectTypeClass, int id) {
        super(id);
        this.objectTypeClass = objectTypeClass;
    }

    @Override
    public NodeType getNodeType() {
        return nodeType;
    }

    public boolean support(Object object) {
        return support(object.getClass().getName());
    }

    public boolean support(String className) {
        return objectTypeClass.equals(className);
    }

    public String getObjectTypeClass() {
        return objectTypeClass;
    }

    public void setObjectTypeClass(String objectTypeClass) {
        this.objectTypeClass = objectTypeClass;
    }

    @Override
    public Activity newActivity(Map<Object, Object> context) {
        Class<?> targetClass = null;
        ObjectTypeActivity activity = null;
        try {
            if (!objectTypeClass.equals(ObjectTypeNode.NON_CLASS)) {
                targetClass = Class.forName(objectTypeClass);
            }
            activity = new ObjectTypeActivity(targetClass);
        } catch (ClassNotFoundException e) {
            activity = new ObjectTypeActivity(objectTypeClass);
        }
        for (Line line : lines) {
            activity.addPath(line.newPath(context));
        }
        return activity;
    }
}
