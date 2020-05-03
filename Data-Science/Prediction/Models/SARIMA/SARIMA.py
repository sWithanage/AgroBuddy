# =====================================================
# Title                 :   SARIMA Model
# Author                :   Sasanka Withanage
# Last modified Date    :   03 May 2020
# =====================================================

import sys
from Models.Components import DataRetriever
from sklearn.metrics import mean_squared_error
from Models.Components import AccuracyCalculator
from Models.Components import CustomLogger as logger
from statsmodels.tsa.statespace.sarimax import SARIMAX


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True,
            logOnTelegram=True, ratio=0.2):
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " accuracy")
        else:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " forecast")

        # Import relevant file from the server.
        series = DataRetriever.getFileData(datasetType)

        # Imported series data values.
        importedDataValues = series.values

        # Set splitting point of the dataset.
        logger.log(logOnTelegram, "Finding splitting point")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * ratio))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        # Splitting data set according to the splitting point.
        trainingDataSet, validationDataSet = importedDataValues[1:split_point], importedDataValues[split_point:]
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

        # Initializing model with SARIMAX.
        model = SARIMAX(trainingDataSet)
        logger.log(logOnTelegram, "Model initialized successfully")

        # Training model.
        fittedModel = model.fit()
        logger.log(logOnTelegram, "Model fitted successfully")

        # Log summery details.
        logger.log(logOnTelegram, fittedModel.summary())

        # Future forecast value.
        forecast = fittedModel.predict(start=trainingDataSetSize, end=trainingDataSetSize + testingDataSetSize - 1,
                                       dynamic=True)
        logger.log(logOnTelegram, "Model predicting successful")

        # Check for the user requirement whether accuracy or forecast details.
        if getAccuracy:

            # If rain fall return mean squared error.
            if datasetType == "precipitation":

                # Calculate mean squared error value.
                meanSquaredError = mean_squared_error(validationDataSet, forecast, squared=False)

                # Log and return accuracy.
                logger.log(logOnTelegram, "Mean squared error is " + str(meanSquaredError))
                return str(meanSquaredError)
            else:
                # Calculate mean squared error value.
                accuracy = AccuracyCalculator.calculate(validationDataSet, forecast, "sarima")

                # Log and return accuracy.
                logger.log(logOnTelegram, "Accuracy Percentage : " + str(accuracy))
                return str(accuracy)
        else:
            # Return json array after calculation.
            jsonArray = AccuracyCalculator.jsonConverter(forecast, "sarima")
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
# predict("AshPlantain-ARIMA", "AshPlantain")
# predict("Brinjal-ARIMA", "Brinjal")
# predict("Cucumber-ARIMA", "Cucumber")
# predict("LadiesFinger-ARIMA", "LadiesFinger")
# predict("RedPumpkin-ARIMA", "RedPumpkin")

# ------------------------------------------------- Forecasting -------------------------------------------------
# predict("Temperature", "temp", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("SARIMA_AshPlantain", "AshPlantain", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("SARIMA_Brinjal", "Brinjal", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("SARIMA_Cucumber", "Cucumber", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("SARIMA_LadiesFinger", "LadiesFinger", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("SARIMA_RedPumpkin", "RedPumpkin", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
