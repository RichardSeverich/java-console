package infrastructure.console;

import domain.TextFileProcessor;
import domain.TextFileException;

public class Main {
    public static void main(String[] args) throws ConsoleArgsException, TextFileException{
        ConsoleHandler.handler(args);
    }
}
