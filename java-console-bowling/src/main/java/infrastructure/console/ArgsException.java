package infrastructure.console;

public class ArgsException extends Exception {

    public ArgsException() {
        super("Must have an argument");
    }
}
