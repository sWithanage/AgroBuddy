# =====================================================
# Title                 :   Price Predictor
# Author                :   Venura Pallawela
# Last modified Date    :   03 May 2020
# =====================================================

import json
import numpy
import urllib.request
from Models.Components import CustomLogger as logger

downloadedData = 0
totalDownloads = 12
pointPerRupee = 0


def getBestPlant():
    global pointPerRupee

    print("Finding Best Plant")

    # -------------------------------------------------------------------------
    # Method to get Forecasted data from DB into an Array
    # -------------------------------------------------------------------------
    def getForecast(variable):
        global downloadedData
        with urllib.request.urlopen("https://agrobuddybackend.nn.r.appspot.com/" + str(variable)) as url:
            data = json.loads(url.read().decode())
            modelSelected = data["model"]
            temporaryList = []
            for x in data[modelSelected]:
                temporaryList.append(x["value"])
            downloadedData += 1
            return temporaryList

    # -------------------------------------------------------------------------
    # Method to get Previous Years' Dataset into an Array
    # -------------------------------------------------------------------------
    def getPastYearData(variable, variableName):
        global downloadedData
        with urllib.request.urlopen("https://agrobuddybackend.nn.r.appspot.com/" + str(variable)) as url:
            data = json.loads(url.read().decode())
            temporaryList = []
            for x in data:
                temporaryList.append(x[variableName])
            downloadedData += 1
            return temporaryList

    # -------------------------------------------------------------------------
    # Method to get Predicted Values for Rainfall Data
    # -------------------------------------------------------------------------
    def getRainfall(variable, variableName):
        with urllib.request.urlopen("https://agrobuddybackend.nn.r.appspot.com/prediction/" + str(variable)) as url:
            data = json.loads(url.read().decode())
            modelSelected = data[0][variableName]
            return modelSelected

    # -------------------------------------------------------------------------
    # Method to get the Amount of Area Cultivated for Each Plant
    # -------------------------------------------------------------------------
    def getCultivatedAreaData(variable, reqPlant):
        with urllib.request.urlopen("https://agrobuddybackend.nn.r.appspot.com/" + str(variable)) as url:
            data = json.loads(url.read().decode())
            for x in data:
                if x["plant_name"] == reqPlant:
                    return x["cultivatedArea"]

    # -------------------------------------------------------------------------
    # Saving all data into variables from the above 4 methods.
    # -------------------------------------------------------------------------
    cultivatedAreaAshPlantain = getCultivatedAreaData("cultivatedarea", "AshPlantain")
    cultivatedAreaBrinjal = getCultivatedAreaData("cultivatedarea", "Brinjals")
    cultivatedAreaCucumber = getCultivatedAreaData("cultivatedarea", "Cucumber")
    cultivatedAreaLadiesFinger = getCultivatedAreaData("cultivatedarea", "LadiesFingers")
    cultivatedAreaPumpkin = getCultivatedAreaData("cultivatedarea", "Pumpkin")
    temperatureArray = getForecast("forecast/temperature")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    rainfallArray = getForecast("forecast/rainfall")
    rainfallPrevYearMaximum = getRainfall("maxrain", "maxRainfall")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    ashPlantainMPriceArray = getForecast("forecast/ashPlantainMPrice")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    ashPlantainPrevYearPrices = getPastYearData("marketprice/ashplantain", "AshPlantain")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    brinjalMPriceArray = getForecast("forecast/brinjalMPrice")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    brinjalPrevYearPrices = getPastYearData("marketprice/brinjal", "Brinjal")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    cucumberMPriceArray = getForecast("forecast/cucumberMPrice")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    cucumberPrevYearPrices = getPastYearData("marketprice/cucumber", "Cucumber")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    ladiesFingersMPriceArray = getForecast("forecast/ladiesFingersMPrice")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    ladiesFingerPrevYearPrices = getPastYearData("marketprice/ladiesFinger", "LadiesFinger")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    redPumpkinMPriceArray = getForecast("forecast/redPumpkinMPrice")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
    redPumpkinPrevYearPrices = getPastYearData("marketprice/redPumpkin", "RedPumpkin")
    logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")

    print("\nData Downloaded successfully ")

            # -------------------------------------------------------------------------
                                # Point Allocation for Market Price
            # -------------------------------------------------------------------------

    # -------------------------------------------------------------------------
    # Method to Calculate the Maximum Difference.
    # -------------------------------------------------------------------------
    def getMaximumDifference():
        maxDifferenceArray = []
        # Calls the above method to get each plants AVERAGE and MAXIMUM
        # Assigns each value obtained into a array as the MAXIMUM DIFFERENCE for each plant
        maxDifferenceArray.append(singleDifference(ashPlantainPrevYearPrices, ashPlantainMPriceArray))
        maxDifferenceArray.append(singleDifference(brinjalPrevYearPrices, brinjalMPriceArray))
        maxDifferenceArray.append(singleDifference(cucumberPrevYearPrices, cucumberMPriceArray))
        maxDifferenceArray.append(singleDifference(ladiesFingerPrevYearPrices, ladiesFingersMPriceArray))
        maxDifferenceArray.append(singleDifference(redPumpkinPrevYearPrices, redPumpkinMPriceArray))
        # Finds the Maximum Value within the Array with the MAXIMUM DIFFERENCE
        return (100 / numpy.amax(maxDifferenceArray))               #Returns a variable which is 100/MaximumValue

    # -------------------------------------------------------------------------
    # Method to Find the Maximum from an Array with the Maximum Difference Variables
    # -------------------------------------------------------------------------
    def singleDifference(previousYearPrices, forecast):
        previousYearAverage = numpy.average(previousYearPrices)     #Calculates the AVERAGE of the previous years' market price for the relevant plant
        maxOfThePlant = numpy.amax(forecast)                        #Gets the MAXIMUM predicted market price for the plant
        return (maxOfThePlant - previousYearAverage)                #Returns the Difference between the AVERAGE and the Maximum

    # The Points Per Each Rupee is the Value obtained from the above Method
    pointPerRupee = getMaximumDifference()

    # -------------------------------------------------------------------------
    # Method to Assign Points to each Plant using Points Per Rupee
    # -------------------------------------------------------------------------
    def pricePoints(previousYearValueArray, forecastArray):
        global pointPerRupee
        temporaryPoints = 0
        dayCount = 0
        averagePriceForPreviousYear = numpy.average(previousYearValueArray)
        for weekValue in forecastArray:
            if (weekValue >= averagePriceForPreviousYear):
                # Finds whether if each predicted value is hgiher than the average calculated
                dayCount += 1
            # Finds the difference between the weeklypredictedvalue and the average
            priceDifference = weekValue - averagePriceForPreviousYear
            temporaryPoints += (priceDifference * pointPerRupee)
        # Assigns points based on the difference which is multiplied by the points per rupee
        temporaryPoints = temporaryPoints / (len(forecastArray))
        # Points assigned is then divided by the length of the array of variables
        # To get the points for predicted 3 months for each plant
        return temporaryPoints, dayCount

    # -------------------------------------------------------------------------
    # Gets the Plant with the Highest Number of Points for Market Price
    # -------------------------------------------------------------------------
    def getBestPlantForMarketPrice(ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin):
        bestPlant = numpy.amax([ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin])
        if bestPlant == ashPlantain:
            plantResult = "Plant with Highest Number of Points for Market Price is Ash Plantain"
        elif bestPlant == brinjal:
            plantResult = "Plant with Highest Number of Points for Market Price is Brinjal"
        elif bestPlant == cucumber:
            plantResult = "Plant with Highest Number of Points for Market Price is Cucumber"
        elif bestPlant == ladiesFinger:
            plantResult = "Plant with Highest Number of Points for Market Price is Ladies Finger"
        elif bestPlant == redPumpkin:
            plantResult = "Plant with Highest Number of Points for Market Price is Red Pumpkin"
        return plantResult

    # -------------------------------------------------------------------------
    # Gets the Plant which had all weekly values above the Average
    # -------------------------------------------------------------------------
    def getOutputStringAsJsonMarketPrice(ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin):
        if (ashPlantain == len(ashPlantainMPriceArray)):
            bestMarketPricePlant = "Ash Plantain had a Market Price above the average for all 16 weeks"
        elif (brinjal == len(ashPlantainMPriceArray)):
            bestMarketPricePlant = "Brinjal had a Market Price above the average for all 16 weeks"
        elif (cucumber == len(ashPlantainMPriceArray)):
            bestMarketPricePlant = "Cucumber had a Market Price above the average for all 16 weeks"
        elif (ladiesFinger == len(ashPlantainMPriceArray)):
            bestMarketPricePlant = "Ladies Finger had a Market Price above the average for all 16 weeks"
        elif (redPumpkin == len(ashPlantainMPriceArray)):
            bestMarketPricePlant = "Red Pumpkin had a Market Price above the average for all 16 weeks"
        return bestMarketPricePlant

            # -------------------------------------------------------------------------
                                # Point Allocation for Rainfall
            # -------------------------------------------------------------------------

    # -------------------------------------------------------------------------
    # Method to Assign Points to each Plant
    # -------------------------------------------------------------------------
    def rainfallPoints(minRainfallRange, maxRainfallRange, worstHigh):
        # A Constant set of variables is assigned as a range, and the Highest Possible rainfall is also entered
        # Lowest Possible rainfall in mm is assumed as 0
        tempRainfallPoints = 0
        higherThanWorst = 0
        lowerThanWorst = 0
        dayCount = 0
        for rainfallIndex in rainfallArray:
            if float(minRainfallRange) <= float(rainfallIndex) <= float(maxRainfallRange):
                # Iterates through the array to find a value which falls within the Rainfall Range
                tempRainfallPoints += 1
            elif float(rainfallIndex) <= float(minRainfallRange):
                tempRainfallPoints -= 1
                lowerThanWorst += 1
            elif float(rainfallIndex) >= float(worstHigh):
                tempRainfallPoints -= 1
                higherThanWorst += 1
            dayCount += 1
            # Retuns the Points per each Plant, which is divided by the NumberOfDays
        return ((tempRainfallPoints / dayCount) * 100), lowerThanWorst, higherThanWorst, tempRainfallPoints

    # -------------------------------------------------------------------------
    # Gets The Plant with the Highest Number of Points for Rainfall
    # From the above found plant, the Number of days which it had exceeded the limits is also Displayed
    # -------------------------------------------------------------------------
    def getBestPlantForRainfall(ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin):
        bestPlant = numpy.amax([ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin])
        ashPlantainRainfallPoints = (rainfallPoints(0.001, 0.0032, rainfallPrevYearMaximum)[1]) + (
        rainfallPoints(0.001, 0.0032, rainfallPrevYearMaximum)[2])
        brinjalRainfallPoints = (rainfallPoints(0.001, 0.0027, rainfallPrevYearMaximum)[1]) + (
        rainfallPoints(0.001, 0.0027, rainfallPrevYearMaximum)[2])
        cucumberRainfallPoints = (rainfallPoints(0.001, 0.0082, rainfallPrevYearMaximum)[1]) + (
        rainfallPoints(0.001, 0.0082, rainfallPrevYearMaximum)[2])
        ladiesFingerRainfallPoints = (rainfallPoints(0.001, 0.003, rainfallPrevYearMaximum)[1]) + (
        rainfallPoints(0.001, 0.003, rainfallPrevYearMaximum)[2])
        redPumpkinRainfallPoints = (rainfallPoints(0.001, 0.003, rainfallPrevYearMaximum)[1]) + (
        rainfallPoints(0.001, 0.003, rainfallPrevYearMaximum)[2])
        if bestPlant == ashPlantain:
            plantResult = "Plant with Highest Number Points for Rainfall is Ash Plantain"
            errorResult = "Ash Plantain had values exceeding the limits for " + str(ashPlantainRainfallPoints) + " days"
        elif bestPlant == brinjal:
            plantResult = "Plant with Highest Number Points for Rainfall is Brinjal"
            errorResult = "Brinjal had values exceeding the limits for " + str(brinjalRainfallPoints) + " days"
        elif bestPlant == cucumber:
            plantResult = "Plant with Highest Number Points for Rainfall is Cucumber"
            errorResult = "Cucumber had values exceeding the limits for " + str(cucumberRainfallPoints) + " days"
        elif bestPlant == ladiesFinger:
            plantResult = "Plant with Highest Number Points for Rainfall is Ladies Finger"
            errorResult = "Ladies Finger had values exceeding the limits for " + str(
                ladiesFingerRainfallPoints) + " days"
        elif bestPlant == redPumpkin:
            plantResult = "Plant with Highest Number Points for Rainfall is Red Pumpkin"
            errorResult = "Red Pumpkin had values exceeding the limits for " + str(redPumpkinRainfallPoints) + " days"
        return plantResult, errorResult

            # -------------------------------------------------------------------------
                                # Point Allocation for Cultivated Area
            # -------------------------------------------------------------------------

    # -------------------------------------------------------------------------
    # Method to Assign Points to each Plant
    # -------------------------------------------------------------------------
    def cultivatedAreaPoints(ashPlantainCultivatedArea, brinjalCultivatedArea, cucumberCultivatedArea, ladiesFingerCultivatedArea, redPumpkinCultivatedArea):
        if ashPlantainCultivatedArea is None:
            ashPlantainCultivatedArea = 0
        if brinjalCultivatedArea is None:
            brinjalCultivatedArea = 0
        if cucumberCultivatedArea is None:
            cucumberCultivatedArea = 0
        if ladiesFingerCultivatedArea is None:
            ladiesFingerCultivatedArea = 0
        if redPumpkinCultivatedArea is None:
            redPumpkinCultivatedArea = 0

        print(ashPlantainCultivatedArea ," ", brinjalCultivatedArea ," ",  cucumberCultivatedArea ," ",  ladiesFingerCultivatedArea ," ",  redPumpkinCultivatedArea)
        # Sums up the cultivated area for each Plant.
        totalPoints = ashPlantainCultivatedArea + brinjalCultivatedArea + cucumberCultivatedArea + ladiesFingerCultivatedArea + redPumpkinCultivatedArea
        # Points are allocated by taken the Inverse Percentage for each Plants' Cultivated Area from the Total Cultivated Area
        ashPlantainPoints = 100 - ((ashPlantainCultivatedArea / totalPoints) * 100)
        brinjalPoints = 100 - ((brinjalCultivatedArea / totalPoints) * 100)
        cucumberPoints = 100 - ((cucumberCultivatedArea / totalPoints) * 100)
        ladiesFingerPoints = 100 - ((ladiesFingerCultivatedArea / totalPoints) * 100)
        redPumpkinPoints = 100 - ((redPumpkinCultivatedArea / totalPoints) * 100)
        return (ashPlantainPoints, brinjalPoints, cucumberPoints, ladiesFingerPoints, redPumpkinPoints)

    # -------------------------------------------------------------------------
    # Gets The Plant with the Highest Number of Points for Cultivated Area
    # -------------------------------------------------------------------------
    def getBestPlantCultivatedAreaWise(ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin):
        bestPlant = numpy.amax([ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin])
        if bestPlant == ashPlantain:
            plantResult = "Plant with Highest Number of Points for Cultivated Area is Ash Plantain"
        elif bestPlant == brinjal:
            plantResult = "Plant with Highest Number of Points for Cultivated Area is Brinjal"
        elif bestPlant == cucumber:
            plantResult = "Plant with Highest Number of Points for Cultivated Area is Cucumber"
        elif bestPlant == ladiesFinger:
            plantResult = "Plant with Highest Number of Points for Cultivated Area is Ladies Finger"
        elif bestPlant == redPumpkin:
            plantResult = "Plant with Highest Number of Points for Cultivated Area is Red Pumpkin"
        return plantResult

            # -------------------------------------------------------------------------
                                # Point Allocation for Temperature
            # -------------------------------------------------------------------------

    # -------------------------------------------------------------------------
    # Method to Assign Points to each Plant
    # -------------------------------------------------------------------------
    def temperaturePoint(minInRange, maxInRange, worstLow, worstHigh):
        # A Temperature Range is set for the optimum growth
        # A Maximum and Minimum Temperature is initialised for each Plant
        tempTeperaturePoints = 0
        higherThanWorst = 0
        lowerThanWorst = 0
        dayCount = 0
        for temperatureIndex in temperatureArray:
            if minInRange <= temperatureIndex <= maxInRange:
                # Iterates through the array to find a value which falls within the Temperature Range
                tempTeperaturePoints += 1
            elif worstLow >= temperatureIndex:
                tempTeperaturePoints -= 1
                lowerThanWorst += 1
            elif worstHigh <= temperatureIndex:
                tempTeperaturePoints -= 1
                higherThanWorst += 1
            dayCount += 1
        # Retuns the Points per each Plant, which is divided by the NumberOfDays
        return ((tempTeperaturePoints / dayCount) * 100), lowerThanWorst, higherThanWorst

    # -------------------------------------------------------------------------
    # Gets The Plant with the Highest Number of Points for Temperature
    # Also finds the number of days in which the above plant had exceeded the boundaries
    # -------------------------------------------------------------------------
    def getBestPlantForTemperature(ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin):
        bestPlant = numpy.amax([ashPlantain, brinjal, cucumber, ladiesFinger, redPumpkin])
        ashPlantainTemperaturePoints = (temperaturePoint(26, 30, 18, 36)[1]) + (temperaturePoint(26, 30, 18, 36)[2])
        brinjalTemperaturePoints = (temperaturePoint(21, 32, 16, 35)[1]) + (temperaturePoint(21, 32, 16, 35)[2])
        cucumberTemperaturePoints = (temperaturePoint(21, 28, 10, 35)[1]) + (temperaturePoint(21, 28, 10, 35)[2])
        ladiesFingerTemperaturePoints = (temperaturePoint(20, 30, 10, 35)[1]) + (temperaturePoint(20, 30, 10, 35)[2])
        redPumpkinTemperaturePoints = (temperaturePoint(24, 30, 10, 35)[1]) + (temperaturePoint(24, 30, 10, 35)[2])
        if bestPlant == ashPlantain:
            plantResult = "Plant with Highest Number Points for Temperature is Ash Plantain"
            errorResult = "Ash Plantain had values exceeding the limits for " + str(
                ashPlantainTemperaturePoints) + " days"
        elif bestPlant == brinjal:
            plantResult = "Plant with Highest Number Points for Temperature is Brinjal"
            errorResult = "Brinjal had values exceeding the limits for " + str(brinjalTemperaturePoints) + " days"
        elif bestPlant == cucumber:
            plantResult = "Plant with Highest Number Points for Temperature is Cucumber"
            errorResult = "Cucumber had values exceeding the limits for " + str(cucumberTemperaturePoints) + " days"
        elif bestPlant == ladiesFinger:
            plantResult = "Plant with Highest Number Points for Temperature is Ladies Finger"
            errorResult = "Ladies Finger had values exceeding the limits for " + str(
                ladiesFingerTemperaturePoints) + " days"
        elif bestPlant == redPumpkin:
            plantResult = "Plant with Highest Number Points for Temperature is Red Pumpkin"
            errorResult = "Red Pumpkin had values exceeding the limits for " + str(
                redPumpkinTemperaturePoints) + " days"
        return plantResult, errorResult

    print("Ash Plantain Price Points             : ", pricePoints(ashPlantainPrevYearPrices, ashPlantainMPriceArray)[0])
    ashPlantainPricePoints = pricePoints(ashPlantainPrevYearPrices, ashPlantainMPriceArray)[0]
    ashPlantainPriceWeek = pricePoints(ashPlantainPrevYearPrices, ashPlantainMPriceArray)[1]
    print("Brinjal Price Points                  : ", pricePoints(brinjalPrevYearPrices, brinjalMPriceArray)[0])
    brinjalPricePoints = pricePoints(brinjalPrevYearPrices, brinjalMPriceArray)[0]
    brinjalPriceWeek = pricePoints(brinjalPrevYearPrices, brinjalMPriceArray)[1]
    print("Cucumber Price Points                 : ", pricePoints(cucumberPrevYearPrices, cucumberMPriceArray)[0])
    cucumberPricePoints = pricePoints(cucumberPrevYearPrices, cucumberMPriceArray)[0]
    cucumberPriceWeek = pricePoints(cucumberPrevYearPrices, cucumberMPriceArray)[1]
    print("Ladies Fingers Price Points           : ",
          pricePoints(ladiesFingerPrevYearPrices, ladiesFingersMPriceArray)[0])
    ladiesFingerPricePoints = pricePoints(ladiesFingerPrevYearPrices, ladiesFingersMPriceArray)[0]
    ladiesFingerPriceWeek = pricePoints(ladiesFingerPrevYearPrices, ladiesFingersMPriceArray)[1]
    print("Red Pumpkin Price Points              : ", pricePoints(redPumpkinPrevYearPrices, redPumpkinMPriceArray)[0])
    redPumpkinPricePoints = pricePoints(redPumpkinPrevYearPrices, redPumpkinMPriceArray)[0]
    redPumpkinPriceWeek = pricePoints(redPumpkinPrevYearPrices, redPumpkinMPriceArray)[1]
    marketPriceBest = getBestPlantForMarketPrice(ashPlantainPricePoints, brinjalPricePoints, cucumberPricePoints,
                                                 ladiesFingerPricePoints, redPumpkinPricePoints)
    marketPriceBestWeekPlant = getOutputStringAsJsonMarketPrice(ashPlantainPriceWeek, brinjalPriceWeek,
                                                                cucumberPriceWeek, ladiesFingerPriceWeek,
                                                                redPumpkinPriceWeek)
    print(marketPriceBest)
    print(marketPriceBestWeekPlant)

    print("-----------------------------------------------------------")

    print("Ash Plantain Temperature Points       : ", temperaturePoint(26, 30, 18, 36)[0])
    ashPlantainTemperaturePoints = temperaturePoint(26, 30, 18, 36)[0]
    print("Brinjal Temperature Points            : ", temperaturePoint(21, 32, 16, 35)[0])
    brinjalTemperaturePoints = temperaturePoint(21, 32, 16, 35)[0]
    print("Cucumber Temperature Points           : ", temperaturePoint(21, 28, 10, 35)[0])
    cucumberTemperaturePoints = temperaturePoint(21, 28, 10, 35)[0]
    print("Ladies Fingers Temperature Points     : ", temperaturePoint(20, 30, 10, 35)[0])
    ladiesFingerTemperaturePoints = temperaturePoint(20, 30, 10, 35)[0]
    print("Red Pumpkin Temperature Points        : ", temperaturePoint(24, 30, 10, 35)[0])
    redPumpkinTemperaturePoints = temperaturePoint(24, 30, 10, 35)[0]
    temperatureBest = \
    getBestPlantForTemperature(ashPlantainTemperaturePoints, brinjalTemperaturePoints, cucumberTemperaturePoints,
                               ladiesFingerTemperaturePoints, redPumpkinTemperaturePoints)[0]
    temperatureBestDays = \
    getBestPlantForTemperature(ashPlantainTemperaturePoints, brinjalTemperaturePoints, cucumberTemperaturePoints,
                               ladiesFingerTemperaturePoints, redPumpkinTemperaturePoints)[1]

    print("-----------------------------------------------------------")

    print("Ash Plantain Rainfall Points          : ", rainfallPoints(0.001, 0.0032, rainfallPrevYearMaximum)[0])
    ashPlantainRainfallPoints = rainfallPoints(0.001, 0.0032, rainfallPrevYearMaximum)[0]
    print("Brinjal Rainfall Points               : ", rainfallPoints(0.001, 0.0027, rainfallPrevYearMaximum)[0])
    brinjalRainfallPoints = rainfallPoints(0.001, 0.0027, rainfallPrevYearMaximum)[0]
    print("Cucumber Rainfall Points              : ", rainfallPoints(0.0015, 0.0082, rainfallPrevYearMaximum)[0])
    cucumberRainfallPoints = rainfallPoints(0.001, 0.0082, rainfallPrevYearMaximum)[0]
    print("Ladies Fingers Rainfall Points        : ", rainfallPoints(0.001, 0.003, rainfallPrevYearMaximum)[0])
    ladiesFingerRainfallPoints = rainfallPoints(0.001, 0.003, rainfallPrevYearMaximum)[0]
    print("Red Pumpkin Rainfall Points           : ", rainfallPoints(0.001, 0.002, rainfallPrevYearMaximum)[0])
    redPumpkinRainfallPoints = rainfallPoints(0.001, 0.003, rainfallPrevYearMaximum)[0]
    rainfallBest = getBestPlantForRainfall(ashPlantainRainfallPoints, brinjalRainfallPoints, cucumberRainfallPoints,
                                           ladiesFingerRainfallPoints, redPumpkinRainfallPoints)[0]
    rainfallBestDays = getBestPlantForRainfall(ashPlantainRainfallPoints, brinjalRainfallPoints, cucumberRainfallPoints,
                                               ladiesFingerRainfallPoints, redPumpkinRainfallPoints)[1]

    print("-----------------------------------------------------------")

    print("Ash Plantain Cultivated Area Points   : ",
          cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                               cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[0])
    ashPlantainCultivatedAreaPoints = \
    cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                         cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[0]
    print("Brinjal Cultivated Area Points        : ",
          cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                               cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[1])
    brinjalCultivatedAreaPoints = \
    cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                         cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[1]
    print("Cucumber Cultivated Area Points       : ",
          cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                               cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[2])
    cucumberCultivatedAreaPoints = \
    cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                         cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[2]
    print("Ladies Fingers Cultivated Area Points : ",
          cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                               cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[3])
    ladiesFingerCultivatedAreaPoints = \
    cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                         cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[3]
    print("Red Pumpkin Cultivated Area Points    : ",
          cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                               cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[4])
    redPumpkinCultivatedAreaPoints = \
    cultivatedAreaPoints(cultivatedAreaAshPlantain, cultivatedAreaBrinjal, cultivatedAreaCucumber,
                         cultivatedAreaLadiesFinger, cultivatedAreaPumpkin)[4]
    bestCultivatedPlant = getBestPlantCultivatedAreaWise(ashPlantainCultivatedAreaPoints, brinjalCultivatedAreaPoints,
                                                         cucumberCultivatedAreaPoints, ladiesFingerCultivatedAreaPoints,
                                                         redPumpkinCultivatedAreaPoints)

    print("-----------------------------------------------------------")

    AshPlantainPoints = ((
                                     ashPlantainPricePoints + ashPlantainTemperaturePoints + ashPlantainRainfallPoints + ashPlantainCultivatedAreaPoints) / 400) * 100
    print("Ash Plantain Total Points             : ", AshPlantainPoints)
    BrinjalPoints = ((
                                 brinjalPricePoints + brinjalTemperaturePoints + brinjalRainfallPoints + brinjalCultivatedAreaPoints) / 400) * 100
    print("Brinjal Total Points                  : ", BrinjalPoints)
    CucumberPoints = ((
                                  cucumberPricePoints + cucumberTemperaturePoints + cucumberRainfallPoints + cucumberCultivatedAreaPoints) / 400) * 100
    print("Cucumber Total Points                 : ", CucumberPoints)
    LadiesFingerPoints = ((
                                      ladiesFingerPricePoints + ladiesFingerTemperaturePoints + ladiesFingerRainfallPoints + ladiesFingerCultivatedAreaPoints) / 400) * 100
    print("Ladies Finger Total Points            : ", LadiesFingerPoints)
    RedPumpkinPoints = ((
                                    redPumpkinPricePoints + redPumpkinTemperaturePoints + redPumpkinRainfallPoints + redPumpkinCultivatedAreaPoints) / 400) * 100
    print("Red Pumpkin Total Points              : ", RedPumpkinPoints)

    print("-----------------------------------------------------------")

    # ashPlantainDaysAboveAverage = pricePoints(ashPlantainPrevYearPrices, ashPlantainMPriceArray)[1]
    # brinjalDaysAboveAverage= pricePoints(brinjalPrevYearPrices, brinjalMPriceArray)[1]
    # cucumberDaysAboveAverage = pricePoints(cucumberPrevYearPrices, cucumberMPriceArray)[1]
    # ladiesFingerDaysAboveAverage = pricePoints(ladiesFingerPrevYearPrices, ladiesFingersMPriceArray)[1]
    # redPumpkinDaysAboveAverage = pricePoints(redPumpkinPrevYearPrices, redPumpkinMPriceArray)[1]
    pointsString = {
        'AshPlantainPoints': AshPlantainPoints,
        'BrinjalPoints': BrinjalPoints,
        'CucumberPoints': CucumberPoints,
        'LadiesFingerPoints': LadiesFingerPoints,
        'RedPumpkinPoints': RedPumpkinPoints,
        'MarketPriceHighestPoints': marketPriceBest,
        'MarketPriceBestPlant': marketPriceBestWeekPlant,
        'TemperatureHighestPoints': temperatureBest,
        'TemperatureBestPlant': temperatureBestDays,
        'RainfallHighestPoints': rainfallBest,
        'RainfallBestPlant': rainfallBestDays,
        'CultivatedAreaHighest': bestCultivatedPlant
    }

    return json.dumps(pointsString, indent=2)


print(getBestPlant())
