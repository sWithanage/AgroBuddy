
#Assigning the Optimal Range, Minimum and Maximum Temperatures for Ash Plantain
minTempRangeAshPlantain = 26
maxTempRangeAshPlantain = 30
ashPlantainTemperaturePoints = 0
#Total points for Temperature, Market Price & Rainfall - Ash Plantain
totPointsAshPlantainTemp = 0
# totPointsAshPlantainPrice = 0
# totPointsAshPlantainRainfall = 0

#Assigning the Optimal Range, Minimum and Maximum Temperatures for Brinjals
minTempRangeBrinjals = 21
maxTempRangeBrinjals = 32
brinjalsTemperaturePoints = 0
#Total points for Temperature, Market Price & Rainfall - Brinjals
totPointsBrinjalsTemp = 0
# totPointsBrinjalsPrice = 0
# totPointsBrinjalsRainfall = 0

#Assigning the Optimal Range, Minimum and Maximum Temperatures for Cucumber
minTempRangeCucumber = 21
maxTempRangeCucumber = 28
cucumberTemperaturePoints = 0
#Total points for Temperature, Market Price & Rainfall - Cucumber
totPointsCucumberTemp = 0
# totPointsCucumberPrice = 0
# totPointsCucumberRainfall = 0

#Assigning the Optimal Range, Minimum and Maximum Temperatures for Ladies Fingers
minTempRangeLadiesFingers = 20
maxTempRangeLadiesFingers = 30
ladiesFingersTemperaturePoints = 0
#Total points for Temperature, Market Price & Rainfall - Ladies Fingers
totPointsLadiesFingersTemp = 0
# totPointsLadiesFingersPrice = 0
# totPointsLadiesFingersRainfall = 0

#Assigning the Optimal Range, Minimum and Maximum Temperatures for Red-Pumpkin
minTempRangePumpkin = 19
maxTempRangePumpkin = 30
pumpkinTemperaturePoints = 0
#Total points for Temperature, Market Price & Rainfall - Red-Pumpkin
totPointsPumpkinTemp = 0
# totPointsPumpkinPrice = 0
# totPointsPumpkinRainfall = 0

#Point Allocation for Temperature
def tempPrediction(predictedTemperatureArray):
    global ashPlantainTemperaturePoints, totPointsAshPlantainTemp
    global brinjalsTemperaturePoints, totPointsBrinjalsTemp
    global cucumberTemperaturePoints, totPointsCucumberTemp
    global ladiesFingersTemperaturePoints, totPointsLadiesFingersTemp
    global pumpkinTemperaturePoints, totPointsPumpkinTemp


    for predictedTemperatureValues in predictedTemperatureArray:


        #Point Allocation for Temperature - Ash-Plantain

        #If the predictedValues fall within the Optimum Range of 26-30°C
        if predictedTemperatureValues >= minTempRangeAshPlantain and  predictedTemperatureValues <= maxTempRangeAshPlantain:
            ashPlantainTemperaturePoints += 10
        # If the predictedValues is less than 26°C
        elif predictedTemperatureValues <= minTempRangeAshPlantain:
            minTotal = predictedTemperatureValues - minTempRangeAshPlantain
            ashPlantainTemperaturePoints += minTotal
        # If the predictedValues is more than 30°C
        elif predictedTemperatureValues >= maxTempRangeAshPlantain:
            maxTotal = maxTempRangeAshPlantain - predictedTemperatureValues
            ashPlantainTemperaturePoints += maxTotal
        #Assigning the points gathered up into Total Points for Ash-Plantain - Temperature
        totPointsAshPlantainTemp += ashPlantainTemperaturePoints


        # Point Allocation for Temperature - Brinjals

        # If the predictedValues fall within the Optimum Range of 21-32°C
        if predictedTemperatureValues >= minTempRangeBrinjals and predictedTemperatureValues <= maxTempRangeBrinjals:
            brinjalsTemperaturePoints += 10
        # If the predictedValues is less than 16°C
        elif predictedTemperatureValues <= minTempRangeBrinjals:
            minTotal = predictedTemperatureValues - minTempRangeBrinjals
            brinjalsTemperaturePoints += minTotal
        # If the predictedValues is more than 36°C
        elif predictedTemperatureValues >= maxTempRangeBrinjals:
            maxTotal = maxTempRangeBrinjals - predictedTemperatureValues
            brinjalsTemperaturePoints += maxTotal
        # Assigning the points gathered up into Total Points for Brinjals - Temperature
        totPointsBrinjalsTemp += brinjalsTemperaturePoints


        # Point Allocation for Temperature - Cucumber

        # If the predictedValues fall within the Optimum Range of 21-32°C
        if predictedTemperatureValues >= minTempRangeCucumber and predictedTemperatureValues <= maxTempRangeCucumber:
            cucumberTemperaturePoints += 10
        # If the predictedValues is less than 16°C
        elif predictedTemperatureValues <= minTempRangeCucumber:
            minTotal = predictedTemperatureValues - minTempRangeCucumber
            cucumberTemperaturePoints += minTotal
        # If the predictedValues is more than 36°C
        elif predictedTemperatureValues >= maxTempRangeCucumber:
            maxTotal = maxTempRangeCucumber - predictedTemperatureValues
            cucumberTemperaturePoints += maxTotal
        # Assigning the points gathered up into Total Points for Cucumber - Temperature
        totPointsCucumberTemp += cucumberTemperaturePoints


        # Point Allocation for Temperature - Ladies Fingers

        # If the predictedValues fall within the Optimum Range of 21-32°C
        if predictedTemperatureValues >= minTempRangeLadiesFingers and predictedTemperatureValues <= maxTempRangeLadiesFingers:
            ladiesFingersTemperaturePoints += 10
        # If the predictedValues is less than 16°C
        elif predictedTemperatureValues <= minTempRangeLadiesFingers:
            minTotal = predictedTemperatureValues - minTempRangeLadiesFingers
            ladiesFingersTemperaturePoints += minTotal
        # If the predictedValues is more than 36°C
        elif predictedTemperatureValues >= maxTempRangeLadiesFingers:
            maxTotal = maxTempRangeLadiesFingers - predictedTemperatureValues
            ladiesFingersTemperaturePoints += maxTotal
        # Assigning the points gathered up into Total Points for Ladies Fingers - Temperature
        totPointsLadiesFingersTemp += ladiesFingersTemperaturePoints


        # Point Allocation for Temperature - Red-Pumpkin

        # If the predictedValues fall within the Optimum Range of 21-32°C
        if predictedTemperatureValues >= minTempRangePumpkin and predictedTemperatureValues <= maxTempRangePumpkin:
            pumpkinTemperaturePoints += 10
        # If the predictedValues is less than 16°C
        elif predictedTemperatureValues <= minTempRangePumpkin:
            minTotal = predictedTemperatureValues - minTempRangePumpkin
            pumpkinTemperaturePoints += minTotal
        # If the predictedValues is more than 36°C
        elif predictedTemperatureValues >= maxTempRangePumpkin:
            maxTotal = maxTempRangePumpkin - predictedTemperatureValues
            pumpkinTemperaturePoints += maxTotal
        # Assigning the points gathered up into Total Points for Red-Pumpkin - Temperature
        totPointsPumpkinTemp += pumpkinTemperaturePoints
    return totPointsAshPlantainTemp

#Point Allocation for Market Price.
def pricePrediction (predictedAshPlantainPriceArray, predictedBrinjalPriceArray, predictedCucumberPriceArray, predictedLadiesFingerPriceArray, predictedPumpkinPriceArray):

    #Point Allocation for Ash Plantain Price
    for predictedAshPlantainPrice in  predictedAshPlantainPriceArray:
        print()
    #Point Allocation for Brinjal Price
    for predictedAshPlantainPrice in predictedBrinjalPriceArray:
        print()
    #Point Allocation for Cucumber Price
    for predictedAshPlantainPrice in predictedCucumberPriceArray:
        print()
    #Point Allocation for Ladies Finger Price
    for predictedAshPlantainPrice in predictedLadiesFingerPriceArray:
        print()
    #Point Allocation for Pumpkin Price
    for predictedAshPlantainPrice in predictedPumpkinPriceArray:
        print()
    return ()
