# =====================================================
# Title                 :   Recurrent neural network Model
# Author                :   Sasanka Withanage
# Last modified Date    :   03 May 2020
# =====================================================
import sys

import keras
import numpy
from keras.layers import Dense
from keras.layers import LSTM
from keras.models import Sequential
from pandas import DataFrame
from pandas import Series
from pandas import concat
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler
from Models.Components import AccuracyCalculator
from Models.Components import CustomLogger as logger
from Models.Components import DataRetriever


# -------------------------------------------------------------------------
# This method can provide accuracy percentages and forecast values.
# -------------------------------------------------------------------------
def predict(predictionName, datasetType, defaultRatio=True, sizeOfTrainingDataSet=2, getAccuracy=True,
            futureRequirement=90, logOnTelegram=True, ratio=0.2):
    try:
        # Printing request of user.
        if getAccuracy:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " accuracy")
        else:
            logger.log(logOnTelegram, "Client requested for " + predictionName + " forecast")

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

            logger.log(logOnTelegram, "Data structure updated to supervised leaning")

            # Return converted value.
            return tempDataFrame

        # -------------------------------------------------------------------------
        # Get rid of seasonal difference by get the difference between data points.
        # -------------------------------------------------------------------------
        def findSeasonalDifference(dataset, interval=1):
            logger.log(logOnTelegram, "Requested for seasonal difference")

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
            trainingDataToScale = trainingDataToScale.reshape(trainingDataToScale.shape[0],
                                                              trainingDataToScale.shape[1])

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

            # Return inverted value only.
            return inverted[0, -1]

        # -------------------------------------------------------------------------
        # Configuring LSTM to train past data.
        # -------------------------------------------------------------------------
        def fitToLSTMModel(currentTrainingDataSet, batchSize, numberOfEpochs, neurons):

            # Clearing previous session cache memory and data to get rid of clashing with previous data.
            keras.backend.clear_session()

            # Dividing data into input and output values.
            inputsValues, output = currentTrainingDataSet[:, 0:-1], currentTrainingDataSet[:, -1]

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
                logger.progressBar((epochCount + 1), numberOfEpochs,
                                   "Model Training | " + str(numberOfEpochs) + " Epochs ")

                # Fit the model with data set.
                LSTMModel.fit(inputsValues, output, epochs=1, batch_size=batchSize, verbose=0, shuffle=False)

                # Clears hidden status of networks.
                LSTMModel.reset_states()

            # Spare a line after progress bar.
            print("")

            logger.log(logOnTelegram, "Model fitted successfully")

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

        # -------------------------------------------------------------------------------------------------------------------------
        # -------------------------------------------- Model predictions started --------------------------------------------------
        # -------------------------------------------------------------------------------------------------------------------------

        # Read downloaded csv and add into the data series.
        series = DataRetriever.getFileData(datasetType)

        # Transform data to be stationary.
        dataInRawFormat = series.values

        # Get difference to get rid of seasonal difference.
        seasonalDifferedValues = findSeasonalDifference(dataInRawFormat, 1)

        # Convert data into supervised learning data set.
        supervisedLearningDataSet = convertToSupervisedLearningDataSet(seasonalDifferedValues, 1)

        # Get Values from supervised learning data set.
        supervisedLearningDataValue = supervisedLearningDataSet.values

        # Split data point in required ratio.
        logger.log(logOnTelegram, "Finding splitting point")
        if defaultRatio:
            # Split into 80% to 20% ratio.
            splittingPoint = int(len(series) - (len(series) * ratio))
        else:
            # Set user defined testing data set size.
            splittingPoint = len(series) - sizeOfTrainingDataSet

        # Split data into train and test-sets.
        rawTrainingDataSet, rawTestingDataSet = supervisedLearningDataValue[
                                                0:splittingPoint], supervisedLearningDataValue[
                                                                   splittingPoint:]
        logger.log(logOnTelegram, "Data splitting successful")

        # Transform data into proper scale.
        scaleConfig, trainingDataSet, testingDataSet = scaleDataSets(rawTrainingDataSet, rawTestingDataSet)

        # Fit training data into a model.
        fittedModel = fitToLSTMModel(currentTrainingDataSet=trainingDataSet, batchSize=1, numberOfEpochs=3, neurons=4)

        # Reshape training values.
        reshapedTrainingData = trainingDataSet[:, 0].reshape(len(trainingDataSet), 1, 1)

        # Initializing batch size.
        if datasetType == 'temp' or datasetType == 'precipitation':
            # Daily data has 365 rows for a year.
            sizeOfBatch = 365
        else:
            # Weekly data has 48 rows for a year.
            sizeOfBatch = 48

        # Predict using reshaped past data set. Model will train with this.
        fittedModel.predict(reshapedTrainingData, batch_size=1)
        logger.log(logOnTelegram, "Predict method successful")

        # Checking whether user required accuracy or forecast details.
        if getAccuracy:
            logger.log(logOnTelegram, "Get accuracy percentages")

            # List to hold predicted data temporarily.
            predictions = list()

            # List to hold expected data temporarily.
            expectations = list()

            # Get the first index of the testing dataset.
            inputValues, outputValues = testingDataSet[0, 0:-1], testingDataSet[0, -1]

            # Get forecast value for size of the testing dataset.
            for countInForecast in range(len(testingDataSet)):
                # Single prediction step using model and last step.
                singlePredictedOutput = forecastFutureStep(LSTMModel=fittedModel, batchSize=sizeOfBatch,
                                                           lastStepValue=inputValues)

                # Store last predicted binary value in the variable.
                lastPredictedValue = singlePredictedOutput

                # Invert binary single predicted output into true decimal value.
                invertedScaledPredictionValue = invertScaledDataSets(currentScaleConfig=scaleConfig,
                                                                     lastIndexInArray=inputValues,
                                                                     valueToInvert=singlePredictedOutput)

                # Format the last predicted value into required numpy array format.
                inputValues = numpy.array([lastPredictedValue])

                # Invert values from inverted scaled prediction value.
                finalProcessedForecastValue = invertSeasonalDifference(previousValue=dataInRawFormat,
                                                                       newDifferenceValue=invertedScaledPredictionValue,
                                                                       interval=len(testingDataSet) + 1 - countInForecast)

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
                logger.log(logOnTelegram, "Mean squared error is " + errorPercentage)
                return errorPercentage
            else:

                accuracy = str(AccuracyCalculator.calculate(expectations, predictions, "rnn"))

                logger.log(logOnTelegram, "Accuracy is " + accuracy)
                return accuracy

        else:
            logger.log(logOnTelegram, "Forecasting future steps")

            # Initializing variable.
            lastPredictedValueInBinary = 0
            futureForecastArray = []

            # Get forecast value for size of the testing dataset.
            for countInForecast in range(len(testingDataSet) + (futureRequirement + 1)):

                # Make one-step forecast.
                if countInForecast < len(testingDataSet):
                    # Get the last value of the array.
                    inputValues, outputValues = testingDataSet[countInForecast, 0:-1], testingDataSet[
                        countInForecast, -1]
                else:
                    # Get the last value of the array.
                    inputValues = lastPredictedValueInBinary
                    inputValues = numpy.array([inputValues])

                # Single prediction step using model and last step.
                singlePredictedOutput = forecastFutureStep(LSTMModel=fittedModel, batchSize=sizeOfBatch,
                                                           lastStepValue=inputValues)

                # Set single predicted output as last predicted output.
                lastPredictedValueInBinary = singlePredictedOutput

                # Invert binary single predicted output into true decimal value.
                invertedScaledPredictionValue = invertScaledDataSets(currentScaleConfig=scaleConfig,
                                                                     lastIndexInArray=inputValues,
                                                                     valueToInvert=singlePredictedOutput)

                # Invert values from inverted scaled prediction value.
                finalProcessedForecastValue = invertSeasonalDifference(previousValue=dataInRawFormat,
                                                                       newDifferenceValue=invertedScaledPredictionValue,
                                                                       interval=countInForecast + 1)

                # Append to the array if the testing data is higher than
                if countInForecast > len(testingDataSet):
                    futureForecastArray.append(finalProcessedForecastValue)

            # Generate json array with future forecast values.
            jsonForecastedArray = str(AccuracyCalculator.jsonConverter(futureForecastArray, "rnn"))

            logger.log(logOnTelegram, "Predicted forecast " + jsonForecastedArray)

            # Return json array.
            return jsonForecastedArray

    except Exception:
        # Display proper error message with error and error line.
        exc_type, exc_obj, exc_tb = sys.exc_info()
        exceptionDetails = str(exc_type) + " error occurred in '" + str(
            exc_tb.tb_frame.f_code.co_filename) + "' Line : " + str(exc_tb.tb_lineno)
        logger.log(logOnTelegram, exceptionDetails, "ERROR")
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
