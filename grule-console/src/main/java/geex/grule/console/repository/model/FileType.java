package geex.grule.console.repository.model;

import com.bstek.urule.dsl.Constant;
import com.bstek.urule.exception.RuleException;

/**
 * @author Jacky.gao
 * @author fred
 * 2014年12月24日
 */
public enum FileType {
    Ruleset {
        @Override
        public String toString() {
            return "rs.xml";
        }
    }, RulesetLib {
        @Override
        public String toString() {
            return "rsl.xml";
        }
    }, DecisionTable {
        @Override
        public String toString() {
            return "dt.xml";
        }
    }, ScriptDecisionTable {
        @Override
        public String toString() {
            return "dts.xml";
        }
    }, ActionLibrary {
        @Override
        public String toString() {
            return "al.xml";
        }
    }, VariableLibrary {
        @Override
        public String toString() {
            return "vl.xml";
        }
    }, ParameterLibrary {
        @Override
        public String toString() {
            return "pl.xml";
        }
    }, ConstantLibrary {
        @Override
        public String toString() {
            return "cl.xml";
        }
    }, RuleFlow {
        @Override
        public String toString() {
            return "rl.xml";
        }
    }, UL {
        @Override
        public String toString() {
            return Constant.UL_SUFFIX;
        }
    }, DecisionTree {
        @Override
        public String toString() {
            return "dtree.xml";
        }
    }, ComplexScorecard {
        @Override
        public String toString() {
            return "scc";
        }
    }, Scorecard {
        @Override
        public String toString() {
            return "sc";
        }
    }, DIR {
        @Override
        public String toString() {
            return "DIR";
        }
    }, Crosstab {
        @Override
        public String toString() {
            return "ct.xml";
        }
    },
    ;

    public static FileType parse(String type) {
        switch (type) {
            case "rs.xml":
                return FileType.Ruleset;
            case "rsl.xml":
                return FileType.RulesetLib;
            case "dt.xml":
                return FileType.DecisionTable;
            case "dts.xml":
                return FileType.ScriptDecisionTable;
            case "al.xml":
                return FileType.ActionLibrary;
            case "vl.xml":
                return FileType.VariableLibrary;
            case "pl.xml":
                return FileType.ParameterLibrary;
            case "cl.xml":
                return FileType.ConstantLibrary;
            case "rl.xml":
                return FileType.RuleFlow;
            case "ul":
                return FileType.UL;
            case "dtree.xml":
                return FileType.DecisionTree;
            case "sc":
                return FileType.Scorecard;
            case "scc":
                return ComplexScorecard;
            case "DIR":
                return FileType.DIR;
            case "ct.xml":
                return FileType.Crosstab;
            default:
                throw new RuleException("Unknow type:" + type);
        }
    }
}
