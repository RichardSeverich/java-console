package infrastructure.console;

public class ConsoleArgsException extends Exception {

    public ConsoleArgsException() {
        super("Must have an argument");
    }
}
