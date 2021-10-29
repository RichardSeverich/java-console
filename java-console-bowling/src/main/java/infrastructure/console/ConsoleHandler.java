package infrastructure.console;


public class ConsoleHandler {
    
    public static void handler(String[] args) throws ArgsException{
        if(args.length != 1 ){
            throw new ArgsException();
        }
        
    }
}
