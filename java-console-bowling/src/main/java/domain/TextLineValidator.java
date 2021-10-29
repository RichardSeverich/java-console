package domain;

public class TextLineValidator {

    public static boolean validateLine(String line) {
        String[] lineParts = line.split("	");
        // lineParts[0] = Jeff
        // lineParts[1] = 10
        if(lineParts.length != 2) { return false; }
        if(isNumber(lineParts[0])){ return false; } // Position 0 must not be a number
        if(!isNumber(lineParts[1]) && !lineParts[1].equals("F")){ return false; } // Position 1 must be a number or F
        // score should be equals or higher than 0 or less or equals than 10 
        if(!lineParts[1].equals("F") && (Integer.parseInt(lineParts[1]) > 10 || Integer.parseInt(lineParts[1]) < 0)) {
            return false;
        }
        return true;
    }

    private static boolean isNumber(String number){
        try {
            Integer.parseInt(number);
            return true;
        } catch (NumberFormatException e){
            return false;
        }
    }
}
