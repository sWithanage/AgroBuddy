import sys
import numpy
from statsmodels.tsa.arima_model import ARMA

from Models.Components import AccurancyCalculator
from Models.Components import FileDownloader
from Models.Components import CustomLogger as logger


def predict(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True):
    # try:

        if getAccuracy:
            print("Client requested for ARMA accuracy")
            logger.log("Client requested for ARMA accuracy")
        else:
            print("Client requested for ARMA Forecast")
            logger.log("Client requested for ARMA Forecast")


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

        # fit model
        if modelType == 1:
            days_in_year = 365
            differenced = difference(X, days_in_year)
            model = ARMA(differenced, order=(7, 0, 1))

        elif modelType == 2:
            days_in_year = 48
            differenced = difference(X, days_in_year)
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
        if (getAccuracy):
            accuracy = AccurancyCalculator.calculate(validationData, dataArray)
            logger.log("Accuracy Percentage : " + str(accuracy))
            return str(accuracy)
        else:
            jsonArray = AccurancyCalculator.jsonConverter(dataArray)
            logger.log("JSON Array is : " + str(jsonArray))
            return str(jsonArray)

    # except Exception as e:
    #     exc_type, exc_obj, exc_tb = sys.exc_info()
    #     exceptionDetails = str(exc_type) + " error occurred in '" + str(exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
    #     logger.log(exceptionDetails,"ERROR")
    #     return "Error occurred in the source code"

# print(predict("Temperature", "arima-model-temperature-dataset",defaultRatio = False,getAccuracy=False,sizeOfTrainingDataSet=90))
# predict("AshPlantain-ARIMA", "AshPlantain", 2, defaultRatio=False, getAccuracy=True, sizeOfTrainingDataSet=90)