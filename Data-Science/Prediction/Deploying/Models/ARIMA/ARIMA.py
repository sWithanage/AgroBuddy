import numpy
from statsmodels.tsa.arima_model import ARIMA

from Models.Components import AccurancyCalculator
from Models.Components import FileDownloader


def getAccuracy(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=7):
    series = FileDownloader.getFileData(datasetType)

    if defaultRatio:
        split_point = int(len(series) - (len(series) * 0.2))
    else:
        split_point = len(series) - sizeOfTrainingDataSet

    dataset, validation = series[0:split_point], series[split_point:]

    trainingDataSetSize = len(dataset)
    testingDataSetSize = len(validation)

    print('\n\n\nTraining Data Set Size : ', trainingDataSetSize, " ( 80% of dataset)")
    print('Testing  Data Set Size : ', testingDataSetSize, " ( 20% of dataset)")

    def difference(dataset, interval=1):
        diff = list()
        for i in range(interval, len(dataset)):
            value = dataset[i] - dataset[i - interval]
            diff.append(value)
        return numpy.array(diff)

    def inverse_difference(history, yhat, interval=1):
        return yhat + history[-interval]

    X = dataset.values
    days_in_year = 365
    differenced = difference(X, days_in_year)

    if modelType == 1:
        model = ARIMA(differenced, order=(7, 0, 1))

    elif modelType == 2:
        model = ARIMA(differenced, order=(2, 0, 0))

    model_fit = model.fit(disp=0)

    print(model_fit.summary())

    forecast = model_fit.forecast(steps=testingDataSetSize)[0]

    history = [x for x in X]
    day = 1

    dataArray = []
    for yhat in forecast:
        inverted = inverse_difference(history, yhat, days_in_year)
        dataArray.append(inverted)
        history.append(inverted)
        day += 1

    validationData = validation.values

    accuracy = AccurancyCalculator.calculate(validationData, dataArray)

    print("Accuracy : ",accuracy)
    return str(accuracy)
