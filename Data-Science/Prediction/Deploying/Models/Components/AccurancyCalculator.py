import numpy
import json
from Models.Components import CustomLogger as logger


def calculate(true_future, prediction, arrayType="normal"):
    logger.log("Accuracy calculating")
    iterationTime = min(len(true_future), len(prediction))
    accuracyArray = []
    trueArray = []
    predictedArray = []

    for x in range(iterationTime):
        if arrayType == "normal":
            predictionValue = prediction[x][0]
            trueFutureValue = true_future[x][0]
        elif arrayType == "sarima":
            predictionValue = prediction[x]
            trueFutureValue = true_future[x][0]
        elif arrayType == "rnn" or arrayType == "ar" or arrayType == "sarima":
            predictionValue = float(prediction[x])
            trueFutureValue = float(true_future[x])
        elif arrayType == "var":
            predictionValue = float(prediction[x][0])
            trueFutureValue = float(true_future[x][0])

        difference = predictionValue - trueFutureValue

        if difference < 0:
            difference = difference * -1

        if trueFutureValue != 0:
            accuracy = 100 - ((difference / trueFutureValue) * 100)
        else:
            accuracy = 100 - ((difference / 1) * 100)

        if accuracy < 0:
            accuracy = 0

        if difference < trueFutureValue:
            accuracyArray.append(accuracy)

        trueArray.append(round(trueFutureValue))
        predictedArray.append(round(predictionValue))

        print(x, ": True Future - " + setSpace(trueFutureValue) + " | Predicted Future : " + setSpace(predictionValue) +
              " | Difference : " + setSpace(difference) + " | Accuracy : " + setSpace(accuracy))

    accuracyPercentage = numpy.mean(accuracyArray)
    print("Accuracy Percentage : " + str(accuracyPercentage))
    logger.log("Accuracy Percentage : " + str(accuracyPercentage))
    return accuracyPercentage


def jsonConverter(predictedData, arrayType="normal"):
    global predictionValue
    predictedValues = []
    for x in range(len(predictedData)):
        if arrayType == "normal":
            predictionValue = predictedData[x][0]
        elif arrayType == "sarima":
            predictionValue = predictedData[x]
        elif arrayType == "rnn" or arrayType == "ar" or arrayType == "sarima":
            predictionValue = float(predictedData[x])
        elif arrayType == "var":
            predictionValue = float(predictedData[x][0])

        if predictionValue < 0:
            tempJsonPart = {'dateNumber': x, 'value': '0'}
        else:
            tempJsonPart = {'dateNumber': x, 'value': round(predictionValue, 3)}
        predictedValues.append(tempJsonPart)
    json_str = json.dumps(predictedValues)
    return json_str


def setSpace(value, spaceSize=6):
    value = str(round(value, 2))
    valueSize = len(value)
    if valueSize < spaceSize:
        value = value + (" " * (spaceSize - valueSize))
    return value
