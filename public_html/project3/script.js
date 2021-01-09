/*
 * calcMean - calculates mean by calling the calcSum function and dividing the sum by the array length.  
 */
function calcMean(array) {
    sum = calcSum(array);
    mean = sum / array.length;

    return mean.toFixed(2);
}

/*
 * calcMedian - calculates median by first using bubble sort to sort the array. Next, if the array length is divisible by 2,
                it will add the two middle values and divide them by 2. Else, the middle of the array is the median.
 */
function calcMedian(array) {
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array.length; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    middle = Math.floor(array.length / 2);
    if (array.length % 2 == 0) {
        median = (array[middle - 1] + array[middle]) / 2;
        return median.toFixed(2);
    } else {
        median = array[middle];
        return median.toFixed(2);
    }
}

/*
 * calcMode - calculates mode by setting a counter for each element of the array. The elements that occur the most 
              are pushed in another array and returned.

    *Note - This was the method I was having the most trouble on. As I was doing research and not being able to find 
            techniques from w3schools and zyBooks, as well as following the pseudocode given from office hours, I stumbled
            upon this website. However, I made sure that this was my absolute last resort after trying different techniques 
            when finding the mode.  
    
    Credit for mode method: (I used my own variable names and found ways to shorten the method) 
    https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript
 */
function calcMode(array) {
    modesOccured = []; 
    tempCounter = []; 

    most = 0;
 
    for (i = 0; i < array.length; i++) {
        tempCounter[array[i]] = (tempCounter[array[i]] || 0) + 1;
        if (most < tempCounter[array[i]]) {
            most = tempCounter[array[i]];
        }
    }
    for (i in tempCounter)
        if (tempCounter.hasOwnProperty(i)) {
            if (most === tempCounter[i]) {
                modesOccured.push(i);
            }
        }
 
    return modesOccured.join(" "); 
}    

   /*
    * Note: My attempt below to follow the psuedocode given for the mode given from office hours 10-06-20
            I was not able to get it to work, mode kept returning undefined. I think it may have something
            to do with the data types.
    */    

   /* modes = "";
    modeCount = 0;
    currentCount = 0;
    index = 1;
    
    for (i = 1; i < array.length; i ++) {
        if (index < array.length && array[index - 1] == array[index]) {
            currentCount++;
        } else if (currentCount == modeCount) {
            modes += array[index - 1] + " ";
            currentCount = 0;
        } else if (currentCount > modeCount) {
            modes += array[index - 1] + " ";
            modeCount = currentCount;
            currentCount = 0;
        }
    }
    return modes;
}*/


/*
 * calcStdDev - calculates the standard deviation by first calling the calcVariance method to calculate the variance of the 
                array. Next, simple take the square root of the variance to get the standard deviation.
 */
function calcStdDev(array) {
    variance = calcVariance(array);
    stdDev = Math.sqrt(variance);

    return stdDev.toFixed(2);
}

/*
 * calcSum - calculates the sum by iterating through the array and adding each element to the previous to find the total sum.  
 */
function calcSum(array) {
    sum = 0;
    for (i = 0; i < array.length; i++) {
        sum += array[i];
    } 
    return sum.toFixed(2);
}

/*
 * calcVariance - calculates the variance by subtracting the mean from each element of the array. Each element is then raised to the
                  power of 2 and totally added. The final variance is then divided by the array length and returns the result.
 */
function calcVariance(array) {
    variance = 0;
    mean = calcMean(array);
   
    for (i = 0; i < array.length; i++) {
        variance += Math.pow((array[i] - mean), 2);
    }

    result = variance / array.length;
    return result.toFixed(2);
}

/*
 * findMax - finds the max value of the array by iterating each element of the array and comparing it to the last element. If it is
             greater, it becomes the max value. This process is continued until the max value is found.
 */
function findMax(array) {
    max = array[0]
    for (i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max.toFixed(2);
}

/*
 * findMin - finds the min value of the array by iterating each element of the array and comparing it to the last element. If it is
             less, it becomes the min value. This process is continued until the min value is found.
 */
function findMin(array) {
    min = array[0]
    for (i = 1; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
        }
    }
    return min.toFixed(2);
}

/*
 * performStatistics - only function that interacts with the html form. First, the function takes the user input and places each 
                       each element into an array, separating each input through spaces. Next, the function parses the user input 
                       to be a float value. Additionally, if the user inputs a value larger than 100 or less than 0, an alert will
                       pop up warning the user that the numbers are out of range. Next, the function counts the spaces between the
                       the user input to determine the number of values inputted. If there are less than 4 spaces or greater than 19
                       spaces, an alert will pop up stating either too many numbers were entered or too little numbers were entered.
                       Finally, the function proceeds to call each function and display each result on the webpage.
 */
function performStatistics() {
    userInputArray = [];
    userInputArray = document.getElementById("userInput").value.split(" ");

    userInputArrayCopy = [];
    for (i = 0; i < userInputArray.length; i++) {
        userInputArrayCopy[i] = parseFloat(userInputArray[i]);
        if (userInputArrayCopy[i] > 100 || userInputArrayCopy[i] < 0) {
            alert("numbers out of range. Only numbers 0 - 100 allowed.");
            return false;
        }
    }

    /*
     * IMPORTANT NOTE ON SPACES: When inputting numbers in textarea, make sure there are NO SPACES AFTER THE LAST NUMBER typed in.
     */
    userInput = document.getElementById("userInput").value;
    spaces = (userInput.split(" ").length) - 1;

    if(spaces < 4) {
        alert("not enough numbers to calculate.");
        return false;
    } else if(spaces > 19) {
        alert("too many numbers entered.");
        return false;
    }

    document.getElementById("sum").value = calcSum(userInputArrayCopy);
    document.getElementById("mean").value = calcMean(userInputArrayCopy);
    document.getElementById("min").value = findMin(userInputArrayCopy);
    document.getElementById("max").value = findMax(userInputArrayCopy);
    document.getElementById("median").value = calcMedian(userInputArrayCopy);
    document.getElementById("variance").value = calcVariance(userInputArrayCopy);
    document.getElementById("stdDev").value = calcStdDev(userInputArrayCopy);
    document.getElementById("mode").value = calcMode(userInputArrayCopy);

    return false;
}
