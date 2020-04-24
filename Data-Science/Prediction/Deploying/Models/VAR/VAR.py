# =====================================================
# Title                 :   Flask Application
# Author                :   Sasanka Withanage
# Last modified Date    :   22 April 2020
# =====================================================

import sys
from Models.Components import FileDownloader
from sklearn.metrics import mean_squared_error
from Models.Components import AccuracyCalculator
from statsmodels.tsa.vector_ar.var_model import VAR
from Models.Components import CustomLogger as logger

# Considering for feature.
features_considered, validationDatasetSize = "", ""


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, defaultRatio=True, sizeOfTrainingDataSet=7, getAccuracy=True):
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log("Client requested for " + predictionName + " accuracy")
        else:
            logger.log("Client requested for " + predictionName + " forecast")

        # Download proper dataset according to requirement.
        if datasetType == "temp" or datasetType == "precipitation":
            series = FileDownloader.getFileData("rnn")
            logger.log("Dataset retrieved successfully")
        else:
            series = FileDownloader.getFileData("market")
            logger.log("Dataset retrieved successfully")

        # Set split data point.
        logger.log("Finding splitting point")
        if defaultRatio:
            split_point = int(len(series) - (len(series) * 0.2))
        elif not getAccuracy:
            split_point = int(len(series))
        else:
            split_point = len(series) - sizeOfTrainingDataSet

        # Retrieve data from the proper column.
        global features_considered, validationDatasetSize
        if datasetType == "temp":
            features_considered = ['T (degC)', 'T (degC)']
        elif datasetType == "precipitation":
            features_considered = ['rainFall', 'rainFall']
        elif datasetType == "AshPlantain":
            features_considered = ['AshPlantain', 'AshPlantain']
        elif datasetType == "Brinjal":
            features_considered = ['Brinjal', 'Brinjal']
        elif datasetType == "Cucumber":
            features_considered = ['Cucumber', 'Cucumber']
        elif datasetType == "LadiesFinger":
            features_considered = ['LadiesFinger', 'LadiesFinger']
        elif datasetType == "RedPumpkin":
            features_considered = ['RedPumpkin', 'RedPumpkin']

        # Retrieve data from the series.
        featureValues = series[features_considered]
        logger.log("Retrieved featured columns from the series successfully")

        # Get values from required features.
        dataset = featureValues.values
        logger.log("Values separated from featured columns")

        # Split data into two parts.
        dataset, validationData = dataset[0:split_point], dataset[split_point:]
        logger.log("Data splitting successful")

        # Set length into variables.
        trainingDataSetSize = len(dataset)
        testingDataSetSize = len(validationData)

        trainingDataSetSizeString = 'Training Data Set Size : ' + str(trainingDataSetSize)
        testingDataSetSizeString = 'Testing  Data Set Size : ' + str(testingDataSetSize)

        logger.log(trainingDataSetSizeString)
        logger.log(testingDataSetSizeString)

        # Set user defined training set size if user requested for future prediction.
        if not getAccuracy:
            validationDatasetSize = sizeOfTrainingDataSet
            logger.log("Testing data set is updated with new value. New value is " + str(testingDataSetSize))

        # Initializing var model.
        model = VAR(dataset)
        logger.log("VAR model initialized successfully")

        # Fit past data set to the model.
        fittedModel = model.fit()
        logger.log("Model fitted successfully")

        # Forecast for future step.
        forecastResult = fittedModel.forecast(fittedModel.y, steps=validationDatasetSize)
        logger.log("Forecasting successful")

        # Check for the user requirement whether accuracy or forecast details.
        if getAccuracy:

            # If rain fall return mean squared error.
            if datasetType == "precipitation":

                # Calculate mean squared error value.
                meanSquaredError = mean_squared_error(validationData, forecastResult, squared=False)

                # Log and return accuracy.
                logger.log("Mean squared error is " + str(meanSquaredError))
                return str(meanSquaredError)
            else:
                # Calculate accuracy with predicted and testing data.
                accuracy = AccuracyCalculator.calculate(validationData, forecastResult, "var")
                logger.log("Accuracy Percentage : " + str(accuracy))
                return str(accuracy)
        else:
            # Return json array after calculation.
            jsonArray = AccuracyCalculator.jsonConverter(forecastResult, "var")
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
