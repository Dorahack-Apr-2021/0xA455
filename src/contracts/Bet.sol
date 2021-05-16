pragma solidity ^0.5.0;

contract Bet {
    uint constant betAmount = 2700000000000000 wei; // The bet that each person will make. This is $10 in Gwei
    
    
    address contractAddress; // The address of the user that stores the gwei between the transaction
    uint public contractBalance; // The balance of the contract
    address user1; // The address of the first user
    uint public user1Balance; // The balance of the first user
    address user2; // The address of the second user
    uint public user2Balance; // The balance of the second user
    int[] serialNums1; // The card's serial number for player 1
    int[] serialNums2; // The card's serial number for player 1
    
    
    
    // Metric storage----------------------------------------
    
    // serial num (6724473)
    // rare/common/legendary (0.5/0/1)
    // circulation count (444)
    // set (1/2)
    // certificed baller shot (1/0)
    int[5] weights = [4, 3, 4, 3, 1];
    int[] values1;
    int[] RCLs1;
    int[] circulationCts1; 
    int[] sets1;
    int[] CBSs1;
    
    int[] values2;
    int[] RCLs2;
    int[] circulationCts2; 
    int[] sets2;
    int[] CBSs2;
    
    
    int[][5] differences1;
    int[][5] differences2;
    
    
    
    // Set each variable to a default values
    constructor() public {
        contractAddress = 0x0000000000000000000000000000000000000000;
        user1 = 0x0000000000000000000000000000000000000000;
        user1Balance =  0;
        user2 = 0x0000000000000000000000000000000000000000;
        user2Balance = 0;
    }
    
    
    // Set the addresses and player values for each user and create the contract
    function setup(address usr1, address usr2, int[] memory newSerialNums1, int[] memory newSerialNums2, int[5][] memory metrics1, int[5][] memory metrics2) public {
        // Store the variables
        contractAddress = address(this);
        user1 = usr1;
        user1Balance = user1.balance;
        user2 = usr2;
        user2Balance = user2.balance;
        serialNums1 = newSerialNums1;
        serialNums2 = newSerialNums2;
        
        // Store each metric for each player for user 1
        values1 = metrics1[0];
        RCLs1 = metrics1[1];
        circulationCts1 = metrics1[2];
        sets1 = metrics1[3];
        CBSs1 = metrics1[4];
        
        // Store each metrics for each player for user 2
        values2 = metrics2[0];
        RCLs2 = metrics2[1];
        circulationCts2 = metrics2[2];
        sets2 = metrics2[3];
        CBSs2 = metrics2[4];
    }
    
    
    
    // Checks if the balances of each user meets the required betAmount. It returns a null
    // address if both users meet the requirement.
    function check() public returns(address) {
        // If user1 doesn't meet the bet amount, return the first user
        if (user1Balance < betAmount) return user1;
        
        // If user2 doesn't meet the bet amount, return the second user
        if (user2Balance < betAmount) return user2;
        
        // If both users meet the requirement, return a null address
        return 0x0000000000000000000000000000000000000000;
    }
    
    
    
    // Deducts the betAmount from each user and adds the bet amount to the contract user
    function initialUpdate() public {
        contractBalance += betAmount*2;
        user1Balance -= betAmount;
        user2Balance -= betAmount;
    }
    
    
    // Adds a new value to each valuearray
    function addValues(int sNums1, int sNums2, int[] memory newValues1, int[] memory newValues2) public {
        serialNums1.push(sNums1);
        serialNums2.push(sNums2);
        
        // Store each metric for each player for user 1
        values1.push(newValues1[0]);
        RCLs1.push(newValues1[1]);
        circulationCts1.push(newValues1[2]);
        sets1.push(newValues1[3]);
        CBSs1.push(newValues1[4]);
        
        // Store each metrics for each player for user 2
        values2.push(newValues2[0]);
        RCLs2.push(newValues2[1]);
        circulationCts2.push(newValues2[2]);
        sets2.push(newValues2[3]);
        CBSs2.push(newValues2[4]);
    }
    
    
    // Gets the sum of a given array
    function getSum(int[] memory someArray) private returns(int) {
        int sum = 0;
        
        for(uint i = 0; i < someArray.length; i++)
            sum += someArray[i];
        
        return sum;
    }
    
    
    
    // Gets the difference of each array value given two arrays and returns an 
    // array of the difference in each index in teh array
    function getDifference(int[] memory initialValues, int[5] memory finalValues) private returns(int[] memory) {
        // Holds the difference of each index in the array
        int[] memory differences = new int[](initialValues.length);
        
        for (uint i = 0; i < initialValues.length; i++) {
            differences[i] = (finalValues[i] - initialValues[i]);
        }
        
        return differences;
    }
    
    
    
    // Transfers the money to a sinlge address
    function transfer(address winner) private returns(bool) {
        // If the winner is user1, add the balance to player1
        if (winner == user1) {
            user1Balance += contractBalance;
            contractBalance = 0;
        }
        // If the winner is user2, add the balance to player2
        else if (winner == user2) {
            user2Balance += contractBalance;
            contractBalance = 0;
        }
        // If the winner is not player1 or player2, return false
        else {
            return false;
        }
        
        return true;
    }


    // Transfers the money to both addresses
    function tie() private returns(bool) {
        user1Balance += contractBalance/2;
        user2Balance += contractBalance/2;
        contractBalance = 0;
        return true;
    
    
    /*
    // Normalizing each value in the metrics arrays
    function normalizeMultiply() private {
        // Create the constants for each multiplier
        uint highestVal = 250000 * 10000;
        uint highestCirculationCts = 35000 * 5 * 10000;
        
        // Itereate through each player
        for (uint i = 0; i < serialNums1.length; i++) {
            // Serial numbers do not change, they stay the same
            
            // Normalize and multiply the player values
            values1[i] = int((1-(uint(values1[i])/highestVal))*uint(weights[0]));
            values2[i] = int((1-(uint(values2[i])/highestVal))*uint(weights[0]));
            
            // Normalize and multiply the RCL values
            RCLs1[i] = int((uint(RCLs1[i]))*uint(weights[1]));
            RCLs2[i] = int((uint(RCLs2[i]))*uint(weights[1]));
            
            // Normalize and multiply the circulation count values
            circulationCts1[i] = int((1-(uint(circulationCts1[i])/highestCirculationCts))*uint(weights[2]));
            circulationCts2[i] = int((1-(uint(circulationCts2[i])/highestCirculationCts))*uint(weights[2]));
            
            
            // Normalize and multiply the set values
            if (sets1[i] == 2) {
                sets1[i] = 0;
            }
            else {
                sets1[i] = 1 * weights[3];
            }
            
            if (sets2[i] == 2) {
                sets2[i] = 0;
            }
            else {
                sets2[i] = 1 * weights[3];
            }
            
            // CBS is already normalized and is multiplied by 1, so it doesn't need to change
        }
    }
    */
    
    
    // Normalizing each value in the metrics arrays
    function normalizeMultiply() private {
        // Create the constants for each multiplier
        uint highestVal = 250000;
        uint highestCirculationCts = 35000;
        
        
        
        // Normalize and multiply the player values
        for (uint i = 0; i < differences1[0].length; i++) {
            differences1[0][i] = ((differences1[0][i]/int(highestVal)))*weights[0]*100;
            differences2[0][i] = ((differences2[0][i]/int(highestVal)))*weights[0]*100;
        }
        
        
        // Serial numbers do not change, they stay the same
        
        
        // Normalize and multiply the RCL values
        for (uint i = 0; i < differences1[1].length; i++) {
            differences1[1][i] = differences1[1][i] * weights[1];
            differences2[1][i] = differences2[1][i] * weights[1];
        }
        
        
        // Normalize and multiply the circulation count values
        for (uint i = 0; i < differences1[2].length; i++) {
            differences1[2][i] = -1*((differences1[2][i])/int(highestCirculationCts))*weights[2]*10;
            differences2[2][i] = -1*((differences2[2][i])/int(highestCirculationCts))*weights[2]*10;
        }


        // Normalize and multiply the set values
        for (uint i = 0; i < differences1[3].length; i++) {
            if (int(differences1[3][i]+sets1[i]) ==  20000) {
                differences1[3][i] = 0;
            }
            else if (int(differences1[3][i]+sets1[i]) ==  10000) {
                differences1[3][i] = 10000 * weights[3];
            }
            
            if (int(differences2[3][i]+sets2[i]) ==  20000) {
                differences2[3][i] = 0;
            }
            else if (int(differences2[3][i]+sets2[i]) ==  10000) {
                differences2[3][i] = 10000 * weights[3];
            }
        }
        // CBS is already normalized and is multiplied by 1, so it doesn't need to change
    }
    
    int public sum1;
    int public sum2;
    // Get the new values of each card and return the winner
    function calculateBestPlayer(int[5][] memory newValues1, int[5][] memory newValues2) public returns(bool) {
        // Get the difference of each players' card value sum
        
        // Difference of all data points in values array
        differences1 = [
            getDifference(values1, newValues1[0]),
            getDifference(RCLs1, newValues1[1]),
            getDifference(circulationCts1, newValues1[2]),
            getDifference(sets1, newValues1[3]),
            getDifference(CBSs1, newValues1[4])
            ];
        differences2 = [
            getDifference(values2, newValues2[0]),
            getDifference(RCLs2, newValues2[1]),
            getDifference(circulationCts2, newValues2[2]),
            getDifference(sets2, newValues2[3]),
            getDifference(CBSs2, newValues2[4])
            ];
            
            
        // Normalize the data
        normalizeMultiply();
        
        
        // Get the sum of each difference array-------------------------------
        sum1 = -1;
        sum2 = -1;
        sum1 += 1;
        sum2 += 1;
        
        // Itereate through each player
        for (uint i = 0; i < differences1.length; i++) {
            // Get the sum of that player
            sum1 += getSum(differences1[i]);
            sum2 += getSum(differences2[i]);
        }
        
        
        // If sum1 is greater than sum2, player 1 get's the balance
        if (sum1 > sum2) return transfer(user1);
        // If sum2 is greater than sum1, player 2 gets the balance
        else if (sum1 <= sum2) return transfer(user2);
        // If the sums are equal, both players split the pot
        else return false;
    }
}