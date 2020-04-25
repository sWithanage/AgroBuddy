import json
import numpy
import urllib.request
from Models.Components import CustomLogger as logger

tempAshPlantainPoints = 0
tempBrinjalPoints = 0
tempCucumberPoints = 0
tempLadiesFingerPoints = 0
tempRedPumpkinPoints = 0

downloadedData = 0
totalDownloads = 12


def getForecast(variable):
    global downloadedData
    with urllib.request.urlopen("https://agrobuddybackend.nn.r.appspot.com/" + str(variable)) as url:
        data = json.loads(url.read().decode())
        modelSelected = data["model"]
        temporaryList = []
        for x in data[modelSelected]:
            temporaryList.append(x["value"])
        downloadedData += 1
        logger.progressBar(downloadedData, totalDownloads, "Downloading Data | ")
        return temporaryList


def getPast(variable, variableName):
    global downloadedData
    with urllib.request.urlopen("https://agrobuddybackend.nn.r.appspot.com/" + str(variable)) as url:
        data = json.loads(url.read().decode())
        temporaryList = []
        for x in data:
            temporaryList.append(x[variableName])
        downloadedData += 1
        logger.progressBar(downloadedData, totalDownloads, "Downloading Data | ")
        return temporaryList


temperatureArray = getForecast("forecast/temperature")

rainfallArray = getForecast("forecast/rainfall")
ashPlantainMPriceArray = getForecast("forecast/ashPlantainMPrice")
ashPlantainPrevYearPrices = getPast("marketprice/ashplantain", "AshPlantain")
brinjalMPriceArray = getForecast("forecast/brinjalMPrice")
brinjalPrevYearPrices = getPast("marketprice/brinjal", "Brinjal")
cucumberMPriceArray = getForecast("forecast/cucumberMPrice")
cucumberPrevYearPrices = getPast("marketprice/cucumber", "Cucumber")
ladiesFingersMPriceArray = getForecast("forecast/ladiesFingersMPrice")
ladiesFingerPrevYearPrices = getPast("marketprice/ladiesFinger", "LadiesFinger")
redPumpkinMPriceArray = getForecast("forecast/redPumpkinMPrice")
redPumpkinPrevYearPrices = getPast("marketprice/redPumpkin", "RedPumpkin")

print("\nData Downloaded successfully ")


def singleDifference(previousYearPrices, forecast):
    previousYearAverage = numpy.average(previousYearPrices)
    maxOfThePlant = numpy.amax(forecast)
    return maxOfThePlant - previousYearAverage


def getMaximumDifference():
    maxDifferenceArray = [singleDifference(ashPlantainPrevYearPrices, ashPlantainMPriceArray),
                          singleDifference(brinjalPrevYearPrices, brinjalMPriceArray),
                          singleDifference(cucumberPrevYearPrices, cucumberMPriceArray),
                          singleDifference(ladiesFingerPrevYearPrices, ladiesFingersMPriceArray),
                          singleDifference(redPumpkinPrevYearPrices, redPumpkinMPriceArray)]

    return 100 / numpy.amax(maxDifferenceArray)


pointPerRupee = getMaximumDifference()


def pricePoints(previousYearValueArray, forecastArray):
    global pointPerRupee
    temporaryPoints = 0
    averagePriceForPreviousYear = numpy.average(previousYearValueArray)
    for weekValue in forecastArray:
        priceDifference = weekValue - averagePriceForPreviousYear
        temporaryPoints += (priceDifference * pointPerRupee)
    temporaryPoints = temporaryPoints / (len(forecastArray))
    return temporaryPoints


def temperaturePoint(minInRange, maxInRange, worstLow, worstHigh):
    tempTeperaturePoints = 0
    higherThanWorst = 0
    lowerThanWorst = 0
    dayCount = 0
    for temperatureIndex in temperatureArray:
        if minInRange <= temperatureIndex <= maxInRange:
            tempTeperaturePoints += 1
        elif worstLow >= temperatureIndex:
            tempTeperaturePoints -= 1
            lowerThanWorst += 1
        elif worstHigh <= temperatureIndex:
            tempTeperaturePoints -= 1
            higherThanWorst += 1
        dayCount += 1
    return ((tempTeperaturePoints / dayCount) * 100), lowerThanWorst, higherThanWorst


print("Ash Plantain Price Points            : ", pricePoints(ashPlantainPrevYearPrices, ashPlantainMPriceArray))
print("Brinjal Price Points                 : ", pricePoints(brinjalPrevYearPrices, brinjalMPriceArray))
print("Cucumber Price Points                : ", pricePoints(cucumberPrevYearPrices, cucumberMPriceArray))
print("Ladies Fingers Price Points          : ", pricePoints(ladiesFingerPrevYearPrices, ladiesFingersMPriceArray))
print("Red Pumpkin Price Points             : ", pricePoints(redPumpkinPrevYearPrices, redPumpkinMPriceArray))

print("Ash Plantain Temperature Points      : ", temperaturePoint(26, 30, 18, 36)[0])
print("Brinjal Temperature Points           : ", temperaturePoint(21, 32, 16, 35)[0])
print("Cucumber Temperature Points          : ", temperaturePoint(21, 28, 10, 35)[0])
print("Ladies Fingers Temperature Points    : ", temperaturePoint(20, 30, 10, 35)[0])
print("Red Pumpkin Temperature Points       : ", temperaturePoint(24, 30, 10, 35)[0])
