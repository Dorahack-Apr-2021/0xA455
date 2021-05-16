pragma solidity ^0.5.0;

contract Bet {
    uint constant betAmount = 10 wei;//2700000000000000; // The bet that each person will make. This is $10 in Gwei
    
    
    address contractAddress; // The address of the user that stores the gwei between the transaction
    uint public contractBalance; // The balance of the contract
    address user1; // The address of the first user
    uint public user1Balance; // The balance of the first user
    address user2; // The address of the second user
    uint public user2Balance; // The balance of the second user
    int[] initialValues1; // The player values of user1's cards
    int[] initialValues2; // The player values of user2's cards
    
    
    /// Set each variable to a default values
    constructor() public {
        contractAddress = 0x0000000000000000000000000000000000000000;
        user1 = 0x0000000000000000000000000000000000000000;
        user1Balance =  0;
        user2 = 0x0000000000000000000000000000000000000000;
        user2Balance = 0;
        initialValues1 = [0];
        initialValues2 = [0];
    }
    
    
    // Set the addresses and player values for each user and create the contract
    function setup(address usr1, address usr2, int[] memory values1, int[] memory values2) public {
        // Store the variables
        contractAddress = address(this);
        user1 = usr1;
        user1Balance = user1.balance;
        user2 = usr2;
        user2Balance = user2.balance;
        initialValues1 = values1;
        initialValues2 = values2;
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
    function addValues(int val1, int val2) public {
        initialValues1.push(val1);
        initialValues2.push(val2);
    }
    
    
    // Gets the sum of a given array
    function getSum(int[] memory someArray) private returns(int) {
        uint i;
        int sum = 0;
        
        for(i = 0; i < someArray.length; i++)
            sum += someArray[i];
        
        return sum;
    }
    
    
    
    // Gets the difference of each array value given two arrays and returns an 
    // array of the difference in each index in teh array
    function getDifference(int[] memory initialValues, int[] memory finalValues) private returns(int[] memory) {
        
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
    }
    
    
    
    // Get the new values of each card and return the winner
    function calculateBestPlayer(int[] memory newValues1, int[] memory newValues2) public returns(bool) {
        // Get the difference of each players' card value sum
        int[] memory difference1 = getDifference(initialValues1, newValues1);
        int[] memory difference2 = getDifference(initialValues2, newValues2);
        
        // Get the sum of each difference array
        int sum1 = getSum(difference1);
        int sum2 = getSum(difference2);
        
        
        // If sum1 is greater than sum2, player 1 get's the balance
        if (sum1 > sum2) return transfer(user1);
        // If sum2 is greater than sum1, player 2 gets the balance
        if (sum1 < sum2) return transfer(user2);
        // If the sums are equal, both players split the pot
        else return false;
    }
}