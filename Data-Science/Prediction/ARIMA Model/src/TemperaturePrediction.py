# https://machinelearningmastery.com/make-sample-forecasts-arima-python/
# line plot of time series
from pandas import read_csv
from matplotlib import pyplot
from pandas import read_csv
from statsmodels.tsa.arima_model import ARIMA
import numpy

# # Checking whether data is loading or not.
# series = read_csv('daily-minimum-temperatures.csv', header=0, index_col=0)
# # display first few rows
# print(series.head(20))
# # line plot of dataset
# series.plot()
# pyplot.show()


# Divide data set in 80:20 (training data set: testing data set)
# split the dataset in to training data and validation data.
# getting 7 days of data for the testing purposes.

series = read_csv('daily-minimum-temperatures.csv', header=0, index_col=0)

# split_point = len(series) - 7
split_point = int(len(series) - (len(series) * 0.2))

dataset, validation = series[0:split_point], series[split_point:]

trainingDataSetSize = len(dataset)
testingDataSetSize = len(validation)

print('Training Data Set Size : ', trainingDataSetSize, " ( 80% of dataset)")
print('Testing  Data Set Size : ', testingDataSetSize, " ( 20% of dataset)")

dataset.to_csv('dataset.csv', index=False)
validation.to_csv('validation.csv', index=False)


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


# load dataset
series = read_csv('dataset.csv', header=None)
# seasonal difference
X = series.values
days_in_year = 365
differenced = difference(X, days_in_year)
# fit model
model = ARIMA(differenced, order=(7, 0, 1))
model_fit = model.fit(disp=0)

# print summary of fit model
print(model_fit.summary())

# one-step out-of sample forecast
forecast = model_fit.forecast()[0]

# invert the differenced forecast to something usable
forecast = inverse_difference(X, forecast, days_in_year)
print('Forecast for next day : %f' % forecast)

# multi-step out-of-sample forecast
forecast = model_fit.forecast(steps=testingDataSetSize)[0]

# invert the differenced forecast to something usable
history = [x for x in X]
day = 1

dataArray=[]
for yhat in forecast:
    inverted = inverse_difference(history, yhat, days_in_year)
    print('Day %d: %f' % (day, inverted))
    dataArray.append(inverted)
    history.append(inverted)
    day += 1


accuracyArray =[]
def accuracyCalculator(true_future,prediction):
    print("Accuracy is calculating")
    for x in range(len(true_future)):
        difference = prediction[x]-true_future[x]
        if difference<0:
            difference = difference * -1;

        if true_future[x] != 0:
            accuracy = 100 - ((difference / true_future[x] ) * 100)
        else:
            accuracy = 100 - ((difference / 1) * 100)

        accuracyArray.append(accuracy)
        print("Difference : "+str(difference)+" | True Future : "+str(true_future[x])+" | Predicted Future : "+str(prediction[x])+" | Accuracy Rate : " + str(accuracy))

series = read_csv('validation.csv', header=None)
# seasonal difference
validationData = series.values
accuracyCalculator(dataArray,validationData)
print("Prediction Average : ",numpy.mean(accuracyArray))
