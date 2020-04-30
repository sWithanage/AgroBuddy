# =====================================================
# Title                 :   Accuracy calculation component
# Author                :   Sasanka Withanage
# Last modified Date    :   22 April 2020
# =====================================================

import json
import numpy
from Models.Components import CustomLogger as logger

# Initializing variables.
importedPredictionValue, importedTrueFutureValue, predictionValue = 0, 0, 0


# -------------------------------------------------------------------------
# Calculate accuracy with several type of arrays.
# -------------------------------------------------------------------------
def calculate(true_future, prediction, arrayType="normal", logOnTelegram=True):
    global importedPredictionValue, importedTrueFutureValue
    logger.log(logOnTelegram, "Accuracy calculating")
    sizeOfDatasetToRetrieve = min(len(true_future), len(prediction))
    accuracyArray = []
    trueArray = []
    predictedArray = []

    # Iterate through whole array.
    for iterationIndex in range(sizeOfDatasetToRetrieve):

        # Configure data type to retrieve data from array.
        if arrayType == "normal":
            importedPredictionValue = prediction[iterationIndex][0]
            importedTrueFutureValue = true_future[iterationIndex][0]
        elif arrayType == "sarima":
            importedPredictionValue = prediction[iterationIndex]
            importedTrueFutureValue = true_future[iterationIndex][0]
        elif arrayType == "rnn" or arrayType == "ar" or arrayType == "sarima":
            importedPredictionValue = float(prediction[iterationIndex])
            importedTrueFutureValue = float(true_future[iterationIndex])
        elif arrayType == "var":
            importedPredictionValue = float(prediction[iterationIndex][0])
            importedTrueFutureValue = float(true_future[iterationIndex][0])

        # Get difference of the prediction and the actual value.
        difference = abs(importedPredictionValue - importedTrueFutureValue)

        # Calculate accuracy.
        accuracy = 100 - ((difference / importedTrueFutureValue) * 100)

        # Append to accuracy array.
        accuracyArray.append(accuracy)

        # Append to list.
        trueArray.append(round(importedTrueFutureValue))
        predictedArray.append(round(importedPredictionValue))

        # Print log details.
        print(iterationIndex,
              ": True Future - " + setSpace(importedTrueFutureValue) + " | Predicted Future : " + setSpace(
                  importedPredictionValue) +
              " | Difference : " + setSpace(difference) + " | Accuracy : " + setSpace(accuracy))

    # Get mean of the accuracy array.
    accuracyPercentage = numpy.mean(accuracyArray)

    # Return accuracy.
    return accuracyPercentage


# -------------------------------------------------------------------------
# Convert data into json array from several types of arrays.
# -------------------------------------------------------------------------
def jsonConverter(predictedData, arrayType="normal"):
    global predictionValue
    predictedValues = []

    # Iterate through whole array.
    for iterationIndex in range(len(predictedData)):
        if arrayType == "normal":
            predictionValue = predictedData[iterationIndex][0]
        elif arrayType == "sarima":
            predictionValue = predictedData[iterationIndex]
        elif arrayType == "rnn" or arrayType == "ar" or arrayType == "sarima":
            predictionValue = float(predictedData[iterationIndex])
        elif arrayType == "var":
            predictionValue = float(predictedData[iterationIndex][0])

        # Append values to json array.
        if predictionValue < 0:
            tempJsonPart = {'dateNumber': iterationIndex, 'value': '0'}
        else:
            tempJsonPart = {'dateNumber': iterationIndex, 'value': round(predictionValue, 3)}

        # Add json part to main array.
        predictedValues.append(tempJsonPart)

    # Return converted array as json file.
    return json.dumps(predictedValues)


# -------------------------------------------------------------------------
# Line space maker. This will keep balance in both sides of the values in accuracy array.
# -------------------------------------------------------------------------
def setSpace(value, spaceSize=6):
    value = str(round(value, 2))
    valueSize = len(value)
    if valueSize < spaceSize:
        value = value + (" " * (spaceSize - valueSize))
    return value
