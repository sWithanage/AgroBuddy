# =====================================================
# Title                 :   Auto_Regression Model
# Author                :   Sasanka Withanage
# Last modified Date    :   22 April 2020
# =====================================================

import sys
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.ar_model import AR
from Models.Components import FileDownloader
from Models.Components import AccuracyCalculator
from Models.Components import CustomLogger as logger


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True):
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log("Client requested for " + predictionName + " accuracy")
        else:
            logger.log("Client requested for " + predictionName + " forecast")

        # Import relevant file from the server.
        series = FileDownloader.getFileData(datasetType)
        logger.log("Dataset retrieved successfully")

        # Get values from the series.
        importedDataValues = series.values
        logger.log("Imported values from series")

        # Set splitting point of the dataset.
        logger.log("Finding splitting point")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * 0.2))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        # Splitting data set according to the splitting point.
        trainingDataSet, validationData = importedDataValues[1:split_point], importedDataValues[split_point:]
        logger.log("Data splitting successful")

        # Set length into variables.
        trainingDataSetSize = len(trainingDataSet)
        testingDataSetSize = len(validationData)

        trainingDataSetSizeString = 'Training Data Set Size : ' + str(trainingDataSetSize)
        testingDataSetSizeString = 'Testing  Data Set Size : ' + str(testingDataSetSize)

        logger.log(trainingDataSetSizeString)
        logger.log(testingDataSetSizeString)

        # If user required for forecast, testing data size will set to future requirement.
        if not getAccuracy:
            testingDataSetSize = sizeOfTrainingDataSet
            logger.log("Testing data set updated with new value. It's " + str(testingDataSetSize))

        # Initializing AR model with data set.
        model = AR(trainingDataSet)
        logger.log("Model initialized")

        # Fit data to model.
        fittedModel = model.fit()
        logger.log("Model fitted")

        # Print model summery.
        logger.log(fittedModel.summary())

        # Make prediction with fitted model.
        forecastResult = fittedModel.predict(start=trainingDataSetSize,
                                             end=trainingDataSetSize + testingDataSetSize - 1, dynamic=True)
        logger.log("Prediction done")

        # Check for the user requirement whether accuracy or forecast details.
        if getAccuracy:
            logger.log("User requested for accuracy")

            # If rain fall return mean squared error.
            if datasetType == "precipitation":

                # Calculate mean squared error value.
                meanSquaredError = mean_squared_error(validationData, forecastResult, squared=False)

                # Log and return accuracy.
                logger.log("Mean squared error is " + str(meanSquaredError))
                return str(meanSquaredError)
            else:
                # Calculate accuracy with predicted and testing data.
                accuracy = AccuracyCalculator.calculate(validationData, forecastResult, "ar")
                logger.log("Accuracy Percentage : " + str(accuracy))
                return str(accuracy)
        else:
            # Return json array after calculation.
            jsonArray = AccuracyCalculator.jsonConverter(forecastResult, "ar")
            logger.log("JSON Array is : " + str(jsonArray))
            return str(jsonArray)
    except Exception:
        # Display proper error message with error and error line.
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(
            exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(exceptionDetails, "ERROR")
        return "Error occurred in the source code"


# Model Training callers with out Api

# --------------------------------------------------- Accuracy ---------------------------------------------------
# predict("Temperature", "temp")
# predict("Precipitation", "precipitation")
# predict("AshPlantain-AR", "AshPlantain")
# predict("Brinjal-AR", "Brinjal")
# predict("Cucumber-AR", "Cucumber")
# predict("LadiesFinger-AR", "LadiesFinger")
# predict("RedPumpkin-AR", "RedPumpkin")

# ------------------------------------------------- Forecasting -------------------------------------------------
# predict("Temperature", "temp", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("AshPlantain-ARIMA", "AshPlantain", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("Brinjal-ARIMA", "Brinjal", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("Cucumber-ARIMA", "Cucumber", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("LadiesFinger-ARIMA", "LadiesFinger", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("RedPumpkin-ARIMA", "RedPumpkin", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
