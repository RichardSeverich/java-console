package infrastructure.console;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

public class ConsolePrint {

    public static void print(Map<String,List<String>> scoresMap) {
        System.out.println("Frame		1		2		3		4		5		6		7		8		9		10");
        for (Map.Entry<String, List<String>> entry : scoresMap.entrySet()) {
            // DECLARE VARIABLES
            List<Integer> scoreAccumulatorList = new ArrayList<>();
            List<Integer> pinfallsScoresList = new ArrayList<>();
            int playerTurn = 0;
            int previousScoreSingle = 0;
            int scoreAcumulator = 0;
            int counterTwoStrikes = 0;
            int counter = 0;
            System.out.println(entry.getKey());
            System.out.print("Pinfalls	");
            for (String score: entry.getValue()) {
                // PRINT PINFALLS
                playerTurn++;
                counter++;
                if(score.equals("10")){
                    String valueToPrint = (counter>entry.getValue().size()-3) ? "X	" : "	X	";
                    System.out.print(valueToPrint);
                    playerTurn++;
                    pinfallsScoresList.add(-1);
                    pinfallsScoresList.add(Integer.parseInt(score));
                } else if(playerTurn==2 && !score.equals("F") && (Integer.parseInt(score) + previousScoreSingle) == 10){
                    System.out.print("/	");
                    pinfallsScoresList.add(Integer.parseInt(score));
                } else if(score.equals("F")){
                    System.out.print("F	");
                    pinfallsScoresList.add(0);
                } else {
                    System.out.print(score + "	");
                    pinfallsScoresList.add(Integer.parseInt(score));
                }
                if(playerTurn==2){
                    playerTurn=0;
                }
                previousScoreSingle = (score.equals("F")) ? 0 :Integer.parseInt(score);
                // TOTAL SCORES CALCULATION
                if(pinfallsScoresList.size()==4) {
                    Integer totalScorePerFourPinfalls = pinfallsScoresList
                        .stream()
                        .filter(value -> value > 0)
                        .collect(Collectors.summingInt(Integer::intValue));
                    int firstPinfall = pinfallsScoresList.get(0);
                    int secondPinfall = pinfallsScoresList.get(1);
                    int thirdPinfall = pinfallsScoresList.get(2);
                    // SUM THE RESULT OF THE SUBSEQUENT WHEN THERE ARE TWO STRIKES
                    if(counterTwoStrikes==1){
                        counterTwoStrikes=0;
                        int indexLast = scoreAccumulatorList.size()-1;
                        int valueToAdd = scoreAccumulatorList.get(indexLast) + ((thirdPinfall == -1) ? 10 : thirdPinfall);
                        scoreAccumulatorList.remove(indexLast);
                        scoreAccumulatorList.add(indexLast, valueToAdd);
                        scoreAcumulator = scoreAcumulator + ((thirdPinfall == -1) ? 10 : thirdPinfall);
                    }
                    // IF CURRENT PINFALL IS OPEN OR FAIL
                    if(firstPinfall==0 || secondPinfall==0) {
                        totalScorePerFourPinfalls = firstPinfall + secondPinfall;
                    }
                    // IF CURRENT PINFALL IS NO STRIKE AND OPEN SUM 10
                    if(firstPinfall != -1 && firstPinfall + secondPinfall == 10) {
                        totalScorePerFourPinfalls = firstPinfall + secondPinfall
                            + ((thirdPinfall == -1) ? 10 : thirdPinfall);
                    }
                    // IF PINFALL IS NOT STRIKE AND THE OPEN DONT SUM 10
                    if(firstPinfall != -1 && firstPinfall + secondPinfall < 10) {
                        totalScorePerFourPinfalls = firstPinfall + secondPinfall;
                    }
                    // IF CURRENT AND NEXT SCORES ARE STRIKES.
                    if(firstPinfall == -1 && thirdPinfall==-1) {
                        counterTwoStrikes++;
                    }
                    scoreAccumulatorList.add(totalScorePerFourPinfalls + scoreAcumulator);
                    // REMOVE TWO FIRST PINFALLS
                    pinfallsScoresList.remove(0);
                    pinfallsScoresList.remove(0);
                    scoreAcumulator = scoreAcumulator + totalScorePerFourPinfalls;
                }
            }
            System.out.println("");
            // PRINT SCORES
            System.out.print("Score		");
            for (Integer scoreFinal: scoreAccumulatorList) {
                System.out.print(scoreFinal + "		");
            }
            System.out.println("");
        }
    }
}
