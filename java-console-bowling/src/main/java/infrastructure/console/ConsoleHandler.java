package infrastructure.console;

import domain.TextFileProcessor;
import domain.TextFileException;

public class ConsoleHandler {

    public static void handler(String[] args) throws ConsoleArgsException, TextFileException {
        if(args.length != 1 ){
            throw new ConsoleArgsException();
        }
        ConsolePrint.print(TextFileProcessor.process(args[0]));
    }
}
