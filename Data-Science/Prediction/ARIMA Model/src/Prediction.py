# https://machinelearningmastery.com/make-sample-forecasts-arima-python/
# line plot of time series
from pandas import read_csv
from matplotlib import pyplot


# load dataset
series = read_csv('daily-minimum-temperatures.csv', header=0, index_col=0)
# display first few rows
print(series.head(20))
# line plot of dataset
series.plot()
pyplot.show()

# split the dataset in to training data and validation data.
# getting 7 days of data for the testing purposes.
from pandas import read_csv
series = read_csv('daily-minimum-temperatures.csv', header=0, index_col=0)
split_point = len(series) - 7
dataset, validation = series[0:split_point], series[split_point:]
print('Dataset %d, Validation %d' % (len(dataset), len(validation)))
dataset.to_csv('dataset.csv', index=False)
validation.to_csv('validation.csv', index=False)


# There is a difference in weather changing.
# To find out that properly we are going to  take seasonal difference.
# That is, we can take the observation for a day and subtract the observation from the same day one year ago.

from pandas import read_csv
from statsmodels.tsa.arima_model import ARIMA
import numpy

# create a differenced series
def difference(dataset, interval=1):
	diff = list()
	for i in range(interval, len(dataset)):
		value = dataset[i] - dataset[i - interval]
		# value = dataset[i]
		diff.append(value)
	return numpy.array(diff)


# invert differenced value
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
model = ARIMA(differenced, order=(7,0,1))
model_fit = model.fit(disp=0)

# print summary of fit model
print(model_fit.summary())

# one-step out-of sample forecast
forecast = model_fit.forecast()[0]

# invert the differenced forecast to something usable
forecast = inverse_difference(X, forecast, days_in_year)
print('Forecast for next day : %f' % forecast)

# multi-step out-of-sample forecast
forecast = model_fit.forecast(steps=7)[0]

# invert the differenced forecast to something usable
history = [x for x in X]
day = 1
for yhat in forecast:
	inverted = inverse_difference(history, yhat, days_in_year)
	print('Day %d: %f' % (day, inverted))
	history.append(inverted)
	day += 1

# Add 7 days and start forecasting.
# multi-step out-of-sample forecast
start_index = len(differenced)
end_index = start_index + 6
forecast = model_fit.predict(start=start_index, end=end_index)
# invert the difference forecast to something usable
history = [x for x in X]
day = 1
for yhat in forecast:
	inverted = inverse_difference(history, yhat, days_in_year)
	print('Day %d: %f' % (day, inverted))
	history.append(inverted)
	day += 1

