package domain;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

public class TextFileProcessor {

    public static Map<String,List<String>> process(String fileName) throws TextFileException {
        Map<String,List<String>> scoresMap = new HashMap<>();
        List<String> listOfLines = TextFileReader.readFile(fileName);
        if(listOfLines.size() < 12){
            throw new TextFileException("The file must have at least 12 lines");
        }
        int lineCounter=1;
        for (String line: listOfLines) {
            if(TextLineValidator.validateLine(line)) {
                String[] lineParts = line.split("	");
                String playerName = lineParts[0];
                List<String> listOfScoresOnePlayer = scoresMap.get(playerName);
                if (listOfScoresOnePlayer == null) {
                    listOfScoresOnePlayer = new ArrayList<>();
                }
                listOfScoresOnePlayer.add(lineParts[1]);
                scoresMap.put(playerName, listOfScoresOnePlayer);
                lineCounter++;
            } else {
                throw new TextFileException("There is an error on file, on line " + lineCounter);
            }
        }
        for (Map.Entry<String, List<String>> entry : scoresMap.entrySet()) {
           if(entry.getValue().size() < 12){
               throw new TextFileException(entry.getKey() + " player must have at least 12 scores");
           }
           int sumScores = 0;
           for (String score: entry.getValue()) {
               if(!score.equals("F")) {
                   sumScores = sumScores + Integer.parseInt(score);
               }
           }
           if(sumScores>120){
               throw new TextFileException(entry.getKey() + " player has extra score");
           }
        }
        return scoresMap;
    }
}
