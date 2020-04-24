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
        return temporaryList


def getPast(variable, variableName):
    global downloadedData
    with urllib.request.urlopen("https://agrobuddybackend.nn.r.appspot.com/" + str(variable)) as url:
        data = json.loads(url.read().decode())
        temporaryList = []
        for x in data:
            temporaryList.append(x[variableName])
        downloadedData += 1
        return temporaryList



temperatureArray = getForecast("forecast/temperature")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
rainfallArray = getForecast("forecast/rainfall")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
ashPlantainMPriceArray = getForecast("forecast/ashPlantainMPrice")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
ashPlantainPrevYearPrices = getPast("marketprice/ashplantain", "AshPlantain")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
brinjalMPriceArray = getForecast("forecast/brinjalMPrice")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
brinjalPrevYearPrices = getPast("marketprice/brinjal", "Brinjal")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
cucumberMPriceArray = getForecast("forecast/cucumberMPrice")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
cucumberPrevYearPrices = getPast("marketprice/cucumber", "Cucumber")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
ladiesFingersMPriceArray = getForecast("forecast/ladiesFingersMPrice")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
ladiesFingerPrevYearPrices = getPast("marketprice/ladiesFinger", "LadiesFinger")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
redPumpkinMPriceArray = getForecast("forecast/redPumpkinMPrice")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")
redPumpkinPrevYearPrices = getPast("marketprice/redPumpkin", "RedPumpkin")
logger.progressBar((downloadedData), totalDownloads, "Downloading Data | ")

print("\nData Downloaded successfully ")

def singleDifference(previousYearPrices, forecast):
    previousYearAverage = numpy.average(previousYearPrices)
    maxOfThePlant = numpy.amax(forecast)
    return (maxOfThePlant - previousYearAverage)

def getMaximumDifference():
    maxDifferenceArray = []

    maxDifferenceArray.append(singleDifference(ashPlantainPrevYearPrices,ashPlantainMPriceArray))
    maxDifferenceArray.append(singleDifference(brinjalPrevYearPrices,brinjalMPriceArray))
    maxDifferenceArray.append(singleDifference(cucumberPrevYearPrices,cucumberMPriceArray))
    maxDifferenceArray.append(singleDifference(ladiesFingerPrevYearPrices,ladiesFingersMPriceArray))
    maxDifferenceArray.append(singleDifference(redPumpkinPrevYearPrices,redPumpkinMPriceArray))

    return  (100 / numpy.amax(maxDifferenceArray))


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
    return ((tempTeperaturePoints / dayCount)*100), lowerThanWorst, higherThanWorst

print("Ash Plantain Price Points            : ", pricePoints(ashPlantainPrevYearPrices, ashPlantainMPriceArray))
print("Brinjal Price Points                 : ", pricePoints(brinjalPrevYearPrices, brinjalMPriceArray))
print("Cucumber Price Points                : ", pricePoints(cucumberPrevYearPrices, cucumberMPriceArray))
print("Ladies Fingers Price Points          : ", pricePoints(ladiesFingerPrevYearPrices, ladiesFingersMPriceArray))
print("Red Pumpkin Price Points             : ", pricePoints(redPumpkinPrevYearPrices, redPumpkinMPriceArray))

print("Ash Plantain Temperature Points      : ", temperaturePoint(26,30,18,36)[0])
print("Brinjal Temperature Points           : ", temperaturePoint(21,32,16,35)[0])
print("Cucumber Temperature Points          : ", temperaturePoint(21,28,10,35)[0])
print("Ladies Fingers Temperature Points    : ", temperaturePoint(20,30,10,35)[0])
print("Red Pumpkin Temperature Points       : ", temperaturePoint(24,30,10,35)[0])

