# https://machinelearningmastery.com/make-sample-forecasts-arima-python/
# line plot of time series
import os

import numpy
import tensorflow as tf
from pandas import read_csv
from statsmodels.tsa.arima_model import ARIMA


# # Checking whether data is loading or not.
# series = read_csv('daily-minimum-temperatures.csv', header=0, index_col=0)
# # display first few rows
# print(series.head(20))
# # line plot of dataset
# series.plot()
# pyplot.show()

def getAccuracy():
    # Downloading file from the dedicated link & extracting in allocated location.
    # This will help to keep update dataset properly.
    downloadedFilePath = tf.keras.utils.get_file(
        origin='https://agrobuddy.tk/getData?type=ash-plantain',
        fname='daily-minimum-temperatures.csv',
        extract=False)

    updatedCSVPath = 'Weekly-Market-Price.csv'
    path = os.path.splitext(downloadedFilePath)[0]
    if not os.path.exists(path):
        os.makedirs(path, 0o755)
    # Remove first naming line and set-up the csv to use it.
    fName = path + "/" + updatedCSVPath;
    # Remove first naming line and set-up the csv to use it.
    with open(downloadedFilePath, 'r') as f:
        with open(fName, 'w') as f1:
            next(f)  # skip header line
            for line in f:
                f1.write(line)

    # Divide data set in 80:20 (training data set: testing data set)
    # split the dataset in to training data and validation data.
    # getting 7 days of data for the testing purposes.

    series = read_csv(fName, header=0, index_col=0)

    # Removing downloaded and converted file from the storage.
    os.remove(downloadedFilePath)
    os.remove(fName)
    print("\n\nDownloaded Dataset Deleted Successfully.")

    split_point = len(series) - 30
    # split_point = int(len(series) - (len(series) * 0.2))

    dataset, validation = series[0:split_point], series[split_point:]

    trainingDataSetSize = len(dataset)
    testingDataSetSize = len(validation)

    print('\n\n\nTraining Data Set Size : ', trainingDataSetSize, " ( 80% of dataset)")
    print('Testing  Data Set Size : ', testingDataSetSize, " ( 20% of dataset)")

    datasetLocation = path + "/" + 'dataset.csv';
    validationLocation = path + "/" + 'validation.csv';
    dataset.to_csv(datasetLocation, index=False)
    validation.to_csv(validationLocation, index=False)

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

    # load dataset
    series = read_csv(datasetLocation, header=None)
    # seasonal difference
    X = series.values
    days_in_year = 365
    differenced = difference(X, days_in_year)
    # fit model
    model = ARIMA(differenced, order=(2, 0, 0))
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
        # print('Day %d: %f' % (day, inverted))
        dataArray.append(inverted)
        history.append(inverted)
        day += 1

    accuracyArray = []
    trueFutureData = []
    predictionData = []

    def accuracyCalculator(true_future, prediction):
        for x in range(len(true_future)):
            predictedValue = prediction[x][0]
            trueValue = true_future[x][0]

            trueFutureData.append(trueValue)
            predictionData.append(predictedValue)

            if predictedValue > trueValue:
                difference = predictedValue - trueValue
            else:
                difference = trueValue - predictedValue

            if true_future[x] != 0:
                accuracy = 100 - ((difference / trueValue) * 100)
            else:
                accuracy = 100 - ((difference / 1) * 100)

            if (accuracy < 0):
                accuracy = 0

            accuracyArray.append(accuracy)
            print("Difference : " + str(difference) + " | True Future : " + str(
                true_future[x]) + " | Predicted Future : " + str(prediction[x]) + " | Accuracy Rate : " + str(accuracy))

    series = read_csv(validationLocation, header=None)
    # seasonal difference
    validationData = series.values
    accuracyCalculator(dataArray, validationData)

    print("Prediction Average : ", numpy.mean(accuracyArray))
    print(trueFutureData)
    print(predictionData)

    # Remove dataset file and the validation data from the downloaded location.
    os.remove(datasetLocation)
    os.remove(validationLocation)
    print("Dataset Deleted Successfully.")

    return str(numpy.mean(accuracyArray))
