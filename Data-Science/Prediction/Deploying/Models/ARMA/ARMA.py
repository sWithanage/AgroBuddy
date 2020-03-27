import numpy
from statsmodels.tsa.arima_model import ARMA

from Models.Components import AccurancyCalculator
from Models.Components import FileDownloader


def getAccuracy(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=7):
    series = FileDownloader.getFileData(datasetType)
    print("\n\nDownloaded Dataset Deleted Successfully.")

    if (defaultRatio):
        split_point = int(len(series) - 30)
    else:
        split_point = len(series) - sizeOfTrainingDataSet

    dataset, validation = series[0:split_point], series[split_point:]

    trainingDataSetSize = len(dataset)
    testingDataSetSize = len(validation)

    print('\n\n\nTraining Data Set Size : ', trainingDataSetSize, " ( 80% of dataset)")
    print('Testing  Data Set Size : ', testingDataSetSize, " ( 20% of dataset)")

    # There is a difference in weather changing.
    # To find out that properly we are going to  take seasonal difference.
    # That is, we can take the observation for a day and subtract the observation from the same day one year ago.

    # create a difference series
    def difference(dataset, interval=1):
        diff = list()
        for i in range(interval, len(dataset)):
            value = dataset[i] - dataset[i - interval]
            # value = dataset[i]
            diff.append(value)
        return numpy.array(diff)

    # invert difference value
    # Only for data which changed and wanted to make it back as previous.
    def inverse_difference(history, yhat, interval=1):
        return yhat + history[-interval]

    # seasonal difference
    X = dataset.values
    days_in_year = 365
    differenced = difference(X, days_in_year)

    # fit model
    if modelType == 1:
        model = ARMA(differenced, order=(7, 0, 1))

    elif modelType == 2:
        model = ARMA(differenced, order=(2, 0, 0))

    model_fit = model.fit(disp=0)

    # print summary of fit model
    print(model_fit.summary())

    # multi-step out-of-sample forecast
    forecast = model_fit.forecast(steps=testingDataSetSize)[0]

    # invert the differenced forecast to something usable
    history = [x for x in X]
    day = 1

    dataArray = []
    for yhat in forecast:
        inverted = inverse_difference(history, yhat, days_in_year)
        dataArray.append(inverted)
        history.append(inverted)
        day += 1

    # seasonal difference
    validationData = validation.values

    accuracy = AccurancyCalculator.calculate(validationData, dataArray)
    print("Prediction Average : ", accuracy)

    print("Accuracy : ", accuracy)
    return str(accuracy)