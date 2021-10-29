package domain;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class TextFileReader {

    public static List<String> readFile(String fileName){
        List<String> listOfLines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
               listOfLines.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return listOfLines;
    }
}
