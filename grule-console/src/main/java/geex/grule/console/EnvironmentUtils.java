package geex.grule.console;

import com.bstek.urule.Utils;
import org.springframework.context.ApplicationContext;

import java.util.Collection;


/**
 * @author Jacky.gao
 * 2015年1月6日
 */
public class EnvironmentUtils {
    private static EnvironmentProvider environmentProvider;

    public static User getLoginUser() {
        if (environmentProvider == null) {
            initEnvironmentProvider();
        }
        return environmentProvider.getLoginUser();
    }

    public static void initEnvironmentProvider() {
        ApplicationContext context = Utils.getApplicationContext();
        Collection<EnvironmentProvider> providers = context.getBeansOfType(EnvironmentProvider.class).values();
        if (providers.size() == 0) {
            environmentProvider = new DefaultEnvironmentProvider();
        } else {
            environmentProvider = providers.iterator().next();
        }
    }

    public static EnvironmentProvider getEnvironmentProvider() {
        if (environmentProvider == null) {
            initEnvironmentProvider();
        }
        return environmentProvider;
    }
}
