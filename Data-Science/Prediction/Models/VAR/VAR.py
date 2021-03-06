# =====================================================
# Title                 :   VAR Model
# Author                :   Sasanka Withanage
# Last modified Date    :   03 May 2020
# =====================================================

import sys
from Models.Components import DataRetriever
from sklearn.metrics import mean_squared_error
from Models.Components import AccuracyCalculator
from statsmodels.tsa.vector_ar.var_model import VAR
from Models.Components import CustomLogger as logger

# Considering for feature.
features_considered, testingDataSetSize = "", ""


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True,
            logOnTelegram=True, ratio=0.2):
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " accuracy")
        else:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " forecast")

        # Download proper dataset according to requirement.
        series = DataRetriever.getFileData(datasetType, True)

        # Set split data point.
        logger.log(logOnTelegram, "Finding splitting point")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * ratio))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        # Retrieve data from the proper column.
        global features_considered, testingDataSetSize

        # Retrieve data from the series.
        featureValues = series[['column1', 'column2']]
        logger.log(logOnTelegram, "Retrieved featured columns from the series successfully")

        # Get values from required features.
        dataset = featureValues.values
        logger.log(logOnTelegram, "Values separated from featured columns")

        # Split data into two parts.
        dataset, validationData = dataset[0:split_point], dataset[split_point:]
        logger.log(logOnTelegram, "Data splitting successful")

        # Set length into variables.
        trainingDataSetSize = len(dataset)
        testingDataSetSize = len(validationData)

        trainingDataSetSizeString = 'Training Data Set Size : ' + str(trainingDataSetSize)
        testingDataSetSizeString = 'Testing  Data Set Size : ' + str(testingDataSetSize)

        logger.log(logOnTelegram, trainingDataSetSizeString)
        logger.log(logOnTelegram, testingDataSetSizeString)

        # Set user defined training set size if user requested for future prediction.
        if not getAccuracy:
            testingDataSetSize = sizeOfTrainingDataSet
            logger.log(logOnTelegram,
                       "Testing data set is updated with new value. New value is " + str(testingDataSetSize))

        # Initializing var model.
        model = VAR(dataset)
        logger.log(logOnTelegram, "VAR model initialized successfully")

        # Fit past data set to the model.
        fittedModel = model.fit()
        logger.log(logOnTelegram, "Model fitted successfully")

        # Forecast for future step.
        forecastResult = fittedModel.forecast(fittedModel.y, steps=testingDataSetSize)
        logger.log(logOnTelegram, "Forecasting successful")

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
                accuracy = AccuracyCalculator.calculate(validationData, forecastResult, "var")
                logger.log(logOnTelegram, "Accuracy Percentage : " + str(accuracy))
                return str(accuracy)
        else:
            # Return json array after calculation.
            jsonArray = AccuracyCalculator.jsonConverter(forecastResult, "var")
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

# ------------------------------------------------- Accuracy ---------------------------------------------------
# predict("Temperature", "temp")
# predict("Precipitation", "precipitation")
# predict("VARAshPlantain", "AshPlantain")
# predict("VARBrinjal", "Brinjal")
# predict("VARCucumber", "Cucumber")
# predict("VARLadiesFinger", "LadiesFinger")
# predict("VARRedPumpkin", "RedPumpkin")

# ------------------------------------------------- Forecasting -------------------------------------------------
# predict("Temperature", "temp", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=90)
# predict("VAR_AshPlantain", "AshPlantain", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("VAR_Brinjal", "Brinjal", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("VAR_Cucumber", "Cucumber", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("VAR_LadiesFinger", "LadiesFinger", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
# predict("VAR_RedPumpkin", "RedPumpkin", defaultRatio=False, getAccuracy=False, sizeOfTrainingDataSet=16)
