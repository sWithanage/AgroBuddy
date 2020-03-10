import os

import numpy
from pandas import read_csv
from pandas import datetime
from matplotlib import pyplot
from statsmodels.tsa.arima_model import ARIMA
from sklearn.metrics import mean_squared_error
import tensorflow as tf

downloadedFilePath = tf.keras.utils.get_file(
    origin='https://agrobuddy.tk/getData?type=time-Series',
    fname='daily-minimum-temperatures.csv',
    extract=False)

updatedCSVPath = 'Daily-Average-Temperature.csv'

# Remove first naming line and set-up the csv to use it.
with open(downloadedFilePath, 'r') as f:
    with open(updatedCSVPath, 'w') as f1:
        next(f)  # skip header line
        for line in f:
            f1.write(line)


def parser(x):
    return datetime.strptime(x, '%Y-%M')


series = read_csv(updatedCSVPath, header=0, parse_dates=[0], index_col=0, squeeze=True, date_parser=parser)
X = series.values
size = int(len(X) * 0.66)
train, test = X[0:size], X[size:len(X)]
history = [x for x in train]
predictions = list()

for t in range(len(test)):
    model = ARIMA(history, order=(5, 1, 0))
    model_fit = model.fit(disp=0)
    output = model_fit.forecast()
    yhat = output[0]
    predictions.append(yhat)
    obs = test[t]
    history.append(obs)
    print('predicted=%f, expected=%f' % (yhat, obs))
error = mean_squared_error(test, predictions)

# plot
pyplot.plot(test)
pyplot.plot(predictions, color='red')
pyplot.show()

os.remove(downloadedFilePath)
os.remove(updatedCSVPath)
print("Delete Downloaded files from the directories.")


accuracyArray = []
predictedValueArray=[]
trueValueArray=[]
def accuracyCalculator(true_future, prediction):
    for x in range(len(true_future)):
        predictedValue = prediction[x]
        trueValue = true_future[x]

        predictedValueArray.append(predictedValue)
        trueValueArray.append(trueValue)

        if predictedValue>trueValue:
            difference = predictedValue - trueValue
        else:
            difference = trueValue - predictedValue


        if true_future[x] != 0:
            accuracy = 100 - ((difference / trueValue) * 100)
        else:
            accuracy = 100 - ((difference / 1) * 100)

        if (accuracy < 0):
            accuracy = 0

        accuracyArray.append(accuracy)
        print("Difference : " + str(difference) + " | True Future : " + str(true_future[x]) + " | Predicted Future : " + str(prediction[x]) + " | Accuracy Rate : " + str(accuracy))

accuracyCalculator(test,predictions)
print("Prediction Average : ", numpy.mean(accuracyArray))
print('Test MSE: %.3f' % error)