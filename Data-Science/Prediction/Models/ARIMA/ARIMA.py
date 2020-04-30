# =====================================================
# Title                 :   ARIMA Model
# Author                :   Sasanka Withanage
# Last modified Date    :   22 April 2020
# =====================================================

import sys
import numpy
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.arima_model import ARIMA
from Models.Components import AccuracyCalculator
from Models.Components import FileDownloader
from Models.Components import CustomLogger as logger

ARIMAModel, periodOfTime = "", ""


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True,
            logOnTelegram=True):
    global ARIMAModel, periodOfTime
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " accuracy")
        else:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " forecast")

        # Import relevant file from the server.
        series = FileDownloader.getFileData(datasetType)
        logger.log(logOnTelegram, "Dataset retrieved successfully")

        # Set splitting point of the dataset.
        logger.log(logOnTelegram, "Finding splitting point")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * 0.2))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        # Splitting data set according to the splitting point.
        trainingDataSet, validationDataSet = series[0:split_point], series[split_point:]
        logger.log(logOnTelegram, "Data Splitting successful")

        # Set length into variables.
        trainingDataSetSize = len(trainingDataSet)
        testingDataSetSize = len(validationDataSet)

        trainingDataSetSizeString = 'Training Data Set Size : ' + str(trainingDataSetSize)
        testingDataSetSizeString = 'Testing  Data Set Size : ' + str(testingDataSetSize)

        logger.log(logOnTelegram, trainingDataSetSizeString)
        logger.log(logOnTelegram, testingDataSetSizeString)

        # If user required for forecast, testing data size will set to future requirement.
        if not getAccuracy:
            testingDataSetSize = sizeOfTrainingDataSet
            logger.log(logOnTelegram, "Testing data set updated with new value. It's " + str(testingDataSetSize))

        # Remove seasonal difference.
        def findSeasonalDifference(dataset, interval=1):
            logger.log(logOnTelegram, "Removing seasonal difference")

            # Initialize list as difference.
            listOfDifference = list()

            # Iterate through whole array.
            for datasetIndex in range(interval, len(dataset)):
                value = dataset[datasetIndex] - dataset[datasetIndex - interval]
                listOfDifference.append(value)

            # return difference array.
            return numpy.array(listOfDifference)

        # Invert difference values.
        def invertSeasonalDifference(lastIndexValue, differenceValue, interval=1):
            return differenceValue + lastIndexValue[-interval]

        # Get training dataset values.
        trainingDatasetValues = trainingDataSet.values

        # Train proper model according to user requirement.
        if modelType == 1:
            periodOfTime = 365
            seasonalDifferenceArray = findSeasonalDifference(trainingDatasetValues, periodOfTime)

            # Suitable seasonal order for the rainfall and temperature.
            ARIMAModel = ARIMA(seasonalDifferenceArray, order=(7, 0, 1))

            logger.log(logOnTelegram, "ARIMA model set. Order of arima model is 7,0,1 and period is 365")

        elif modelType == 2:
            periodOfTime = 48
            seasonalDifferenceArray = findSeasonalDifference(trainingDatasetValues, periodOfTime)

            # Suitable seasonal order for the plant price prediction.
            ARIMAModel = ARIMA(seasonalDifferenceArray, order=(2, 0, 0))

            logger.log(logOnTelegram,
                       "ARIMA model set. Order of arima model is 2,0,0 and period is 48. Weekly data sets")

        # Training model.
        logger.log(logOnTelegram, "Training model")
        fittedModel = ARIMAModel.fit(disp=0)
        logger.log(logOnTelegram, "Model fitted successfully")

        # Log summery details.
        logger.log(logOnTelegram, fittedModel.summary())

        # Future forecast value.
        forecast = fittedModel.forecast(steps=testingDataSetSize)[0]
        logger.log(logOnTelegram, "Future values forecasted")

        # Reshape history array.
        history = [x for x in trainingDatasetValues]

        # Initializing forecast data.
        forecastResult = []

        # Iterate through forecasted array.
        for singleForecastedElement in forecast:
            # Invert each value from forecasted values.
            invertedValue = invertSeasonalDifference(history, singleForecastedElement, periodOfTime)

            # Append to forecasted result.
            forecastResult.append(invertedValue)

            # Append values to history.
            history.append(invertedValue)

        # Get values from the validation data.
        validationDataSet = validationDataSet.values
        logger.log(logOnTelegram, "Validation values separated")

        # Check for the user requirement whether accuracy or forecast details.
        if getAccuracy:

            # If rain fall return mean squared error.
            if datasetType == "precipitation":
                # Calculate mean squared error value.
                meanSquaredError = mean_squared_error(validationDataSet, forecastResult, squared=False)

                # Log and return accuracy.
                logger.log(logOnTelegram, "Mean squared error for precipitation is " + str(meanSquaredError))
                return str(meanSquaredError)
            else:
                # Calculate accuracy with predicted and testing data.
                accuracy = AccuracyCalculator.calculate(validationDataSet, forecastResult)

                # Log and return accuracy.
                logger.log(logOnTelegram, "Accuracy Percentage : " + str(accuracy))
                return str(accuracy)
        else:
            # Return json array after calculation.
            jsonArray = AccuracyCalculator.jsonConverter(forecastResult)
            logger.log(logOnTelegram, "JSON Array is : " + str(jsonArray))
            return str(jsonArray)

    except Exception:
        # Display proper error message with error and error line.
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(
            exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(logOnTelegram, exceptionDetails, "ERROR")
        return "Error occurred in the source code"

# Model Training callers with out Api

# --------------------------------------------------- Accuracy ---------------------------------------------------
# predict("Temperature", "temp")
# predict("Precipitation", "precipitation")
# predict("AshPlantain-ARIMA", "AshPlantain", 2)
# predict("Brinjal-ARIMA", "Brinjal", 2)
# predict("Cucumber-ARIMA", "Cucumber", 2)
# predict("LadiesFinger-ARIMA", "LadiesFinger", 2)
# predict("RedPumpkin-ARIMA", "RedPumpkin", 2)

# ------------------------------------------------- Forecasting -------------------------------------------------
# predict("Temperature", "temp", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("AshPlantain-ARIMA", "AshPlantain", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("Brinjal-ARIMA", "Brinjal", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("Cucumber-ARIMA", "Cucumber", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("LadiesFinger-ARIMA", "LadiesFinger", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("RedPumpkin-ARIMA", "RedPumpkin", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
