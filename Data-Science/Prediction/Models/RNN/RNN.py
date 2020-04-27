# =====================================================
# Title                 :   Recurrent neural network Model
# Author                :   Sasanka Withanage
# Last modified Date    :   22 April 2020
# =====================================================

import os
import sys

from pandas import DataFrame
from pandas import Series
from pandas import concat
from pandas import read_csv
from pandas import datetime
from Models.Components import CustomLogger as logger
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler
from Models.Components import FileDownloader
from Models.Components import AccuracyCalculator
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
import keras
import numpy


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, defaultRatio=True, sizeOfTrainingDataSet=2, getAccuracy=True,
            futureRequirement=90):
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log("Client requested for " + predictionName + " accuracy")
        else:
            logger.log("Client requested for " + predictionName + " forecast")

        # -------------------------------------------------------------------------
        # frame a sequence as a supervised learning problem.
        # -------------------------------------------------------------------------
        def convertToSupervisedLearningDataSet(data, lag=1):

            # Convert data into data frame.
            tempDataFrame = DataFrame(data)

            # Remove first value in the data frame (NaN).
            columns = [tempDataFrame.shift(newDataFrameIndex) for newDataFrameIndex in range(1, lag + 1)]

            # Append data frame to newly created data frame as column.
            columns.append(tempDataFrame)

            # Concatenate columns to 1st column.
            tempDataFrame = concat(columns, axis=1)

            # Replace NAN with 0.
            tempDataFrame.fillna(0, inplace=True)

            logger.log("Data structure updated to supervised leaning")

            # Return converted value.
            return tempDataFrame

        # -------------------------------------------------------------------------
        # Get rid of seasonal difference by get the difference between data points.
        # -------------------------------------------------------------------------
        def findSeasonalDifference(dataset, interval=1):
            logger.log("Requested for seasonal difference")

            # Initializing the temporary list to hold values.
            temporarySeasonalDifferenceList = list()

            # Iterate through the whole dataset and get the difference into separate array.
            for countInDataSet in range(interval, len(dataset)):
                differentiatedValueBetweenCurrentIndexes = dataset[countInDataSet] - dataset[countInDataSet - interval]
                temporarySeasonalDifferenceList.append(differentiatedValueBetweenCurrentIndexes)

            return Series(temporarySeasonalDifferenceList)

        # -------------------------------------------------------------------------
        # Invert differentiated values into proper format.
        # -------------------------------------------------------------------------
        def invertSeasonalDifference(previousValue, newDifferenceValue, interval=1):

            # Add history value to new differenceValue and get inverted value.
            invertedValue = newDifferenceValue + previousValue[-interval]

            # Return positive values only.
            if invertedValue < 0:
                return -1 * invertedValue
            else:
                return invertedValue

        # -------------------------------------------------------------------------
        # Scale data into between -1 to 1. With this transformation processing speed
        # in keras will increase.
        # -------------------------------------------------------------------------
        def scaleDataSets(trainingDataToScale, testingDataToScale):

            # Fit values to scale before transform. Save that fitted scale to invert values in requirement.
            currentScaleConfig = MinMaxScaler(feature_range=(-1, 1))
            currentScaleConfig = currentScaleConfig.fit(trainingDataToScale)

            # Reshape the training data array.
            trainingDataToScale = trainingDataToScale.reshape(trainingDataToScale.shape[0], trainingDataToScale.shape[1])

            # Transform training data according to the scale value.
            scaledTrainingValues = currentScaleConfig.transform(trainingDataToScale)

            # Reshape the testing data array.
            testingDataToScale = testingDataToScale.reshape(testingDataToScale.shape[0], testingDataToScale.shape[1])

            # Transform testing data according to the scale value.
            scaledTestingValues = currentScaleConfig.transform(testingDataToScale)

            # Return scaling value for after usage, converted training and testing data-sets.
            return currentScaleConfig, scaledTrainingValues, scaledTestingValues

        # -------------------------------------------------------------------------
        # Convert scaled values in to real values.
        # -------------------------------------------------------------------------
        def invertScaledDataSets(currentScaleConfig, lastIndexInArray, valueToInvert):

            # Creating new row in proper format with values.
            new_row = [x for x in lastIndexInArray] + [valueToInvert]

            # Convert array into numpy array.
            array = numpy.array(new_row)

            # Reshape the array in to 2d Array. X and Y. X is Input, Y is Output.
            array = array.reshape(1, len(array))

            # Inverting values in to true form.
            inverted = currentScaleConfig.inverse_transform(array)

            logger.log("Data set scaled successfully")

            # Return inverted value only.
            return inverted[0, -1]

        # -------------------------------------------------------------------------
        # Configuring LSTM to train past data.
        # -------------------------------------------------------------------------
        def fitToLSTMModel(currentTrainingDataSet, batchSize, numberOfEpochs, neurons):

            # Clearing previous session cache memory and data to get rid of clashing with previous data.
            keras.backend.clear_session()

            # Dividing data into input and output values.
            inputsValues, outputValues = currentTrainingDataSet[:, 0:-1], currentTrainingDataSet[:, -1]

            # Reshape the input values.
            inputsValues = inputsValues.reshape(inputsValues.shape[0], 1, inputsValues.shape[1])

            #  Initializing models.
            LSTMModel = Sequential()

            # Adding LSTM to the model.
            LSTMModel.add(LSTM(
                neurons,  # Number of memory units.
                batch_input_shape=(batchSize, inputsValues.shape[1], inputsValues.shape[2]),
                # Batch input shape (1,1,1) in here.
                stateful=True))  # Maintains state between batches.

            # Regular densely connecting neural network layers.
            LSTMModel.add(Dense(1))

            # Compiling the model with configuration.
            LSTMModel.compile(loss='mean_squared_error', optimizer='adam')

            # Iterate for total number of epochs.
            for epochCount in range(numberOfEpochs):
                # Showing progress bar for epochs.
                logger.progressBar((epochCount + 1), numberOfEpochs, "Model Training | " + str(numberOfEpochs) + " Epochs ")

                # Fit the model with data set.
                LSTMModel.fit(inputsValues, outputValues, epochs=1, batch_size=batchSize, verbose=0, shuffle=False)

                # Clears hidden status of networks.
                LSTMModel.reset_states()

            # Spare a line after progress bar.
            print("")

            logger.log("Model fitted successfully")

            # Return created model.
            return LSTMModel

        # -------------------------------------------------------------------------
        # Forecast for future.
        # -------------------------------------------------------------------------
        def forecastFutureStep(LSTMModel, batchSize, lastStepValue):

            # Reshape last value.
            lastStepValue = lastStepValue.reshape(1, 1, len(lastStepValue))

            # Predict one future step.
            futureStepValue = LSTMModel.predict(lastStepValue, batch_size=batchSize)

            # Return forecast value.
            return futureStepValue[0, 0]

        # -------------------------------------------------------------------------
        # Parse the date from the dataset.
        # -------------------------------------------------------------------------
        def parseDate(x):

            # Convert temperature dataset and the precipitation data set in %Y-%m-%d to proper date format.
            if datasetType == "temp" or datasetType == "precipitation":
                return datetime.strptime(x, '%Y-%m-%d')

            # Convert all other dataset in %Y-%W to proper date format.
            else:
                return datetime.strptime(x, '%Y-%W')

        # -------------------------------------------------------------------------------------------------------------------------
        # -------------------------------------------- Model predictions started --------------------------------------------------
        # -------------------------------------------------------------------------------------------------------------------------

        # Load data from the csv and delete the file from that path.
        path = FileDownloader.getFileData(datasetType, True)
        logger.log("Data set file downloaded successfully")

        # Read downloaded csv and add into the data series.
        series = read_csv(path, header=0, parse_dates=[0], index_col=0, squeeze=True, date_parser=parseDate)

        # Remove downloaded file after reading.
        os.remove(path)
        logger.log("Data set file deleted successfully")

        # Transform data to be stationary.
        dataInRawFormat = series.values

        # Get difference to get rid of seasonal difference.
        seasonalDifferedValues = findSeasonalDifference(dataInRawFormat, 1)

        # Convert data into supervised learning data set.
        supervisedLearningDataSet = convertToSupervisedLearningDataSet(seasonalDifferedValues, 1)

        # Get Values from supervised learning data set.
        supervisedLearningDataValue = supervisedLearningDataSet.values

        # Split data point in required ratio.
        logger.log("Finding splitting point")
        if defaultRatio:
            # Split into 80% to 20% ratio.
            splittingPoint = int(len(series) - (len(series) * 0.2))
        else:
            # Set user defined testing data set size.
            splittingPoint = len(series) - sizeOfTrainingDataSet

        # Split data into train and test-sets.
        rawTrainingDataSet, rawTestingDataSet = supervisedLearningDataValue[0:splittingPoint], supervisedLearningDataValue[
                                                                                               splittingPoint:]
        logger.log("Data splitting successful")

        # Transform data into proper scale.
        scaleConfig, trainingDataSet, testingDataSet = scaleDataSets(rawTrainingDataSet, rawTestingDataSet)

        # Fit training data into a model.
        fittedModel = fitToLSTMModel(currentTrainingDataSet=trainingDataSet, batchSize=1, numberOfEpochs=3, neurons=4)

        # Reshape training values.
        reshapedTrainingData = trainingDataSet[:, 0].reshape(len(trainingDataSet), 1, 1)

        # Predict using reshaped past data set. Model will train with this.
        fittedModel.predict(reshapedTrainingData, batch_size=1)
        logger.log("Predict method successful")

        # Checking whether user required accuracy or forecast details.
        if getAccuracy:
            logger.log("Get accuracy percentages")

            # List to hold predicted data temporarily.
            predictions = list()

            # List to hold expected data temporarily.
            expectations = list()

            # Get forecast value for size of the testing dataset.
            for countInForecast in range(len(testingDataSet)):
                # Get the last index of the testing dataset.
                xInputValues, yInputValues = testingDataSet[countInForecast, 0:-1], testingDataSet[countInForecast, -1]

                # Single prediction step using model and last step.
                singlePredictedOutput = forecastFutureStep(fittedModel, 1, xInputValues)

                # Invert binary single predicted output into true decimal value.
                invertedScaledPredictionValue = invertScaledDataSets(scaleConfig, xInputValues, singlePredictedOutput)

                # Invert values from inverted scaled prediction value.
                finalProcessedForecastValue = invertSeasonalDifference(dataInRawFormat, invertedScaledPredictionValue,
                                                                       len(testingDataSet) + 1 - countInForecast)

                # Append predicted data into list.
                predictions.append(finalProcessedForecastValue)

                # Get expected value from the testing dataset.
                expected = dataInRawFormat[len(rawTrainingDataSet) + countInForecast + 1]

                # Append expected data into array list.
                expectations.append(expected)

            # Check whether precipitation or not. If precipitation return mean squared error.
            if datasetType == "precipitation":

                # Calculate mean squared error.
                errorPercentage = str(mean_squared_error(dataInRawFormat[splittingPoint + 1:], predictions))

                # Return mean squared error and log.
                logger.log("Mean squared error is " + errorPercentage)
                return errorPercentage
            else:

                accuracy = str(AccuracyCalculator.calculate(expectations, predictions, "rnn"))

                logger.log("Accuracy is " + accuracy)
                return accuracy

        else:
            logger.log("Forecasting future steps")

            # Initializing variable.
            lastPredictedValueInBinary = 0
            futureForecastArray = []

            # Get forecast value for size of the testing dataset.
            for countInForecast in range(len(testingDataSet) + (futureRequirement + 1)):

                # Make one-step forecast.
                if countInForecast < len(testingDataSet):
                    # Get the last value of the array.
                    xInputValues, yInputValues = testingDataSet[countInForecast, 0:-1], testingDataSet[countInForecast, -1]
                else:
                    # Get the last value of the array.
                    xInputValues = lastPredictedValueInBinary
                    xInputValues = numpy.array([xInputValues])

                # Single prediction step using model and last step.
                singlePredictedOutput = forecastFutureStep(fittedModel, 1, xInputValues)

                # Set single predicted output as last predicted output.
                lastPredictedValueInBinary = singlePredictedOutput

                # Invert binary single predicted output into true decimal value.
                invertedScaledPredictionValue = invertScaledDataSets(scaleConfig, xInputValues, singlePredictedOutput)

                # Invert values from inverted scaled prediction value.
                finalProcessedForecastValue = invertSeasonalDifference(dataInRawFormat, invertedScaledPredictionValue,
                                                                       countInForecast + 1)

                # Append to the array if the testing data is higher than
                if countInForecast > len(testingDataSet):
                    futureForecastArray.append(finalProcessedForecastValue)

            # Generate json array with future forecasted values.
            jsonForecastedArray = str(AccuracyCalculator.jsonConverter(futureForecastArray, "rnn"))

            logger.log("Predicted forecast " + jsonForecastedArray)

            # Return json array.
            return jsonForecastedArray

    except Exception:
        # Display proper error message with error and error line.
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(
            exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(exceptionDetails, "ERROR")
        return "Error occurred in the source code"


# Model Training callers with out Api

# --------------------------------------------------- Accuracy ---------------------------------------------------
# predict("Temperature", "temp", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True)
# predict("Precipitation", "precipitation", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True)
# predict("RNNAshPlantain", "AshPlantain", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True)
# predict("RNNBrinjal", "Brinjal", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True)
# predict("RNNCucumber", "Cucumber", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True)
# predict("RNNLadiesFinger", "LadiesFinger", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True)
# predict("RNNRedPumpkin", "RedPumpkin", defaultRatio=True, sizeOfTrainingDataSet=90, getAccuracy=True)

# ------------------------------------------------- Forecasting -------------------------------------------------
# predict("Temperature", "temp", defaultRatio=False, getAccuracy=False, futureRequirement=90)
# predict("Precipitation", "precipitation", defaultRatio=False, getAccuracy=False, futureRequirement=90)
# predict("RNN_AshPlantain", "AshPlantain", defaultRatio=False, getAccuracy=False, futureRequirement=16)
# predict("RNN_Brinjal", "Brinjal", defaultRatio=False, getAccuracy=False, futureRequirement=16)
# predict("RNN_Cucumber", "Cucumber", defaultRatio=False, getAccuracy=False, futureRequirement=16)
# predict("RNN_LadiesFinger", "LadiesFinger", defaultRatio=False, getAccuracy=False, futureRequirement=16)
# predict("RNN_RedPumpkin", "RedPumpkin", defaultRatio=False, getAccuracy=False, futureRequirement=16)
