import numpy


def calculate(true_future, prediction, arrayType="normal"):
    iterationTime = min(len(true_future), len(prediction))
    accuracyArray = []
    trueArray = []
    predictedArray = []
    print("Accuracy is calculating")
    for x in range(iterationTime):
        if arrayType == "normal":
            predictionValue = prediction[x][0]
            trueFutureValue = true_future[x][0]
        elif arrayType == "sarima":
            predictionValue = prediction[x]
            trueFutureValue = true_future[x][0]
        elif arrayType == "rnn":
            predictionValue = float(prediction[x])
            trueFutureValue = float(true_future[x])

        difference = predictionValue - trueFutureValue

        if difference < 0:
            difference = difference * -1

        if true_future[x] != 0:
            accuracy = 100 - ((difference / trueFutureValue) * 100)
        else:
            accuracy = 100 - ((difference / 1) * 100)

        if accuracy < 0:
            accuracy = 0

        if difference < trueFutureValue:
            accuracyArray.append(accuracy)

        trueArray.append(round(trueFutureValue))
        predictedArray.append(round(predictionValue))

        print(x, ": True Future - " + setSpace(trueFutureValue) + " | Predicted Future : " + setSpace(
            predictionValue) + " | Difference : " + setSpace(difference) + " | Accuracy : " + setSpace(accuracy))

    accuracyPercentage = numpy.mean(accuracyArray)
    print("Accuracy Percentage : ", accuracyPercentage)
    return accuracyPercentage


def setSpace(value, spaceSize=6):
    value = str(round(value, 2))
    valueSize = len(value)
    if valueSize < spaceSize:
        value = value + (" " * (spaceSize - valueSize))
    return value
