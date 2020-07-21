package geex.grule.console.repository.refactor.file;


import geex.grule.console.repository.refactor.Refactor;

public abstract class FileRefactor implements Refactor {
    public FileRefactor() {
    }

    public abstract String doRefactor(String var1, String var2, String var3);

    protected String perfectPath(String path) {
        if (!path.startsWith("/")) {
            path = "/" + path;
        }

        return path;
    }
}
