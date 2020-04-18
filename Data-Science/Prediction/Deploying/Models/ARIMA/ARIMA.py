import os
import sys
import numpy
from statsmodels.tsa.arima_model import ARIMA
from Models.Components import AccurancyCalculator
from Models.Components import FileDownloader
from Models.Components import CustomLogger as logger


def predict(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True):
    try:
        if getAccuracy:
            print("Client requested for ARIMA accuracy")
            logger.log("Client requested for ARIMA accuracy")
        else:
            print("Client requested for ARIMA Forecast")
            logger.log("Client requested for ARIMA Forecast")

        series = FileDownloader.getFileData(datasetType)
        logger.log("Dataset retrieved successfully")

        logger.log("Splitting dataset into training and testing")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * 0.2))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        dataset, validation = series[0:split_point], series[split_point:]

        trainingDataSetSize = len(dataset)
        testingDataSetSize = len(validation)

        if not getAccuracy:
            testingDataSetSize = sizeOfTrainingDataSet

        trainingDataSetSizeString = 'Training Data Set Size : ' + str(len(dataset))
        testingDataSetSizeString = 'Testing  Data Set Size : ' + str(len(validation))

        logger.log(trainingDataSetSizeString)
        logger.log(testingDataSetSizeString)

        def difference(dataset, interval=1):
            diff = list()
            for i in range(interval, len(dataset)):
                value = dataset[i] - dataset[i - interval]
                diff.append(value)
            return numpy.array(diff)

        def inverse_difference(history, yhat, interval=1):
            return yhat + history[-interval]

        datasetValues = dataset.values

        # fit model
        if modelType == 1:
            days_in_year = 365
            differenced = difference(datasetValues, days_in_year)
            model = ARIMA(differenced, order=(7, 0, 1))

        elif modelType == 2:
            days_in_year = 48
            differenced = difference(datasetValues, days_in_year)
            model = ARIMA(differenced, order=(2, 0, 0))

        logger.log("Training model")

        model_fit = model.fit(disp=0)

        logger.log(model_fit.summary())

        forecast = model_fit.forecast(steps=testingDataSetSize)[0]
        history = [x for x in datasetValues]
        day = 1

        dataArray = []
        for yhat in forecast:
            inverted = inverse_difference(history, yhat, days_in_year)
            dataArray.append(inverted)
            history.append(inverted)
            day += 1

        validationData = validation.values

        if(getAccuracy):
            accuracy = AccurancyCalculator.calculate(validationData, dataArray)
            logger.log("Accuracy Percentage : " + str(accuracy))
            return str(accuracy)
        else:
            jsonArray = AccurancyCalculator.jsonConverter(dataArray)
            logger.log("JSON Array is : " + str(jsonArray))
            return str(jsonArray)
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(
            exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(exceptionDetails, "ERROR")
        return "Error occurred in the source code"


# print(predict("Temperature", "arima-model-temperature-dataset",defaultRatio = False,getAccuracy=False,sizeOfTrainingDataSet=90))
