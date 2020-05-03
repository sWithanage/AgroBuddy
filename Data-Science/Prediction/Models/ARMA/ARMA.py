# =====================================================
# Title                 :   ARMA Model
# Author                :   Sasanka Withanage
# Last modified Date    :   03 May 2020
# =====================================================

import sys
import numpy
from typing import List, Any
from Models.Components import DataRetriever
from statsmodels.tsa.arima_model import ARMA
from sklearn.metrics import mean_squared_error
from Models.Components import AccuracyCalculator
from Models.Components import CustomLogger as logger

periodOfTime, model = "", ""


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, modelType=1, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True,
            logOnTelegram=True, ratio=0.2):
    global periodOfTime, model
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " accuracy")
        else:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " forecast")

        # Import relevant file from the server.
        series = DataRetriever.getFileData(datasetType)
        logger.log(logOnTelegram, "Dataset retrieved successfully")

        # Set splitting point of the dataset.
        logger.log(logOnTelegram, "Finding splitting point")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * ratio))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        # Splitting data set according to the splitting point.
        trainingDataSet, validationDataSet = series[0:split_point], series[split_point:]
        logger.log(logOnTelegram, "Data splitting successful")

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
            logger.log(logOnTelegram,
                       "Testing data set is updated with new value. New value is " + str(testingDataSetSize))

        # There is a difference in weather changing.
        # To find out that properly we are going to  take seasonal difference.
        # That is, we can take the observation for a day and subtract the observation from the same day one year ago.
        # Remove seasonal difference.
        def findSeasonalDifference(dataset, interval=1):
            logger.log(logOnTelegram, "Requested for seasonal difference")

            # Initialize list as difference.
            listOfDifference = list()

            # Iterate through whole array.
            for datasetIndex in range(interval, len(dataset)):
                value = dataset[datasetIndex] - dataset[datasetIndex - interval]
                listOfDifference.append(value)

            # return difference array.
            return numpy.array(listOfDifference)

        # Invert difference values.
        # Only for data which changed and wanted to make it back as previous.
        def invertSeasonalDifference(lastIndexValue, differenceValue, interval=1):
            return differenceValue + lastIndexValue[-interval]

        # Retrieve values from training dataset.
        trainingDatasetValues = trainingDataSet.values

        # Train proper model according to user requirement.
        if modelType == 1:
            periodOfTime = 365
            seasonalDifferenceArray = findSeasonalDifference(trainingDatasetValues, periodOfTime)

            # Suitable seasonal order for the rainfall and temperature.
            model = ARMA(seasonalDifferenceArray, order=(7, 0))

            logger.log(logOnTelegram, "ARMA model set. Order of arma model is 7,0 and period is 365")

        elif modelType == 2:
            periodOfTime = 48
            seasonalDifferenceArray = findSeasonalDifference(trainingDatasetValues, periodOfTime)

            # Suitable seasonal order for the plant price prediction.
            model = ARMA(seasonalDifferenceArray, order=(2, 0))

            logger.log(logOnTelegram,
                       "ARIMA model set. Order of arima model is 2,0 and period is 48. Weekly data sets")

        # Training model.
        logger.log(logOnTelegram, "Training model")
        fittedModel = model.fit(disp=0)
        logger.log(logOnTelegram, "Model fitted")

        # Log summery details.
        logger.log(logOnTelegram, fittedModel.summary())

        # Future forecast value.
        forecast = fittedModel.forecast(steps=testingDataSetSize)[0]
        logger.log(logOnTelegram, "Future values forecasted")

        # Reshape history array.
        history = [x for x in trainingDatasetValues]

        forecastResult: List[Any] = []
        for singleForecastedElement in forecast:
            # Invert each value from forecasted values.
            inverted = invertSeasonalDifference(history, singleForecastedElement, periodOfTime)

            # Append to forecasted result.
            forecastResult.append(inverted)

            # Append values to history.
            history.append(inverted)

        logger.log(logOnTelegram, "Multi step forecasted")

        # Get values from the validation data.
        validationData = validationDataSet.values

        # Check for the user requirement whether accuracy or forecast details.
        if getAccuracy:

            # If rain fall return mean squared error.
            if datasetType == "precipitation":
                # Calculate mean squared error value.
                meanSquaredError = mean_squared_error(validationData, forecastResult, squared=False)

                # Log and return accuracy.
                logger.log(logOnTelegram, "Mean squared error is " + str(meanSquaredError))
                return str(meanSquaredError)
            else:
                # Calculate accuracy with predicted and testing data.
                accuracy = AccuracyCalculator.calculate(validationData, forecastResult)

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
# predict("AshPlantain-ARMA", "AshPlantain", 2)
# predict("Brinjal-ARMA", "Brinjal", 2)
# predict("Cucumber-ARMA", "Cucumber", 2)
# predict("LadiesFinger-ARMA", "LadiesFinger", 2)
# predict("RedPumpkin-ARMA", "RedPumpkin", 2)

# ------------------------------------------------- Forecasting -------------------------------------------------
# predict("Temperature", "temp", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("ARMA_AshPlantain", "AshPlantain", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("ARMA_Brinjal", "Brinjal", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("ARMA_Cucumber", "Cucumber", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("ARMA_LadiesFinger", "LadiesFinger", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("ARMA_RedPumpkin", "RedPumpkin", 2, defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
