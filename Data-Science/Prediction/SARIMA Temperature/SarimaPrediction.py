import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import statsmodels.api as sm
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from sklearn.metrics import mean_squared_error
from math import sqrt
import warnings
warnings.filterwarnings('ignore')
%matplotlib inline

# Importing the .csv file and assigning the columns
# as Date and Temperature respectively.
cities = pd.read_csv('SarimaModel.csv')
rio = cities.loc[cities['City'] == 'Monaragala', ['dt','AverageTemperature']]
rio.columns = ['Date','Temp']
rio['Date'] = pd.to_datetime(rio['Date'])
rio.reset_index(drop=True, inplace=True)
rio.set_index('Date', inplace=True)

#I'm going to consider the temperature just from 1900 until the end of 2012
rio = rio.loc['1/1/2000':'3/13/2020']
rio = rio.asfreq('M', method='bfill')
rio.head()

#Plotting a Temperature-Variation Graph for the temperatures
#obtained from Monaragala
plt.figure(figsize=(24,10))
sns.lineplot(x=rio.index, y=rio['Temp'])
plt.title('Temperature Variation in Monaragala from 2000 until 2020')
plt.show()

#Create a "pivot" table for the temperatures for each month
#Based on each year.
#ex: if dataset has 20 years, there's 20 lines starting from y-axis.
rio['month'] = rio.index.month
rio['year'] = rio.index.year
pivot = pd.pivot_table(rio, values='Temp', index='month', columns='year', aggfunc='mean')
pivot.plot(figsize=(24,10))
plt.title('Yearly Monaragala temperatures')
plt.xlabel('Months')
plt.ylabel('Temperatures')
plt.xticks([x for x in range(1,13)])
plt.legend().remove()
plt.show()

#Dispalying a Mean value as a graph for the above graph^^
monthly_seasonality = pivot.mean(axis=1)
monthly_seasonality.plot(figsize=(24,10))
plt.title('Monthly Temperatures in Monaragala')
plt.xlabel('Months')
plt.ylabel('Temperature')
plt.xticks([x for x in range(1,13)])
plt.show()

#Displaying the Yearly Average temperatures
#A mean for 10 years is displayed as well by 'year_avg['Temp'].rolling(10).mean()'
year_avg = pd.pivot_table(rio, values='Temp', index='year', aggfunc='mean')
year_avg['10 Years MA'] = year_avg['Temp'].rolling(10).mean()
year_avg[['Temp','10 Years MA']].plot(figsize=(24,10))
plt.title('Yearly AVG Temperatures in Monaragala')
plt.xlabel('Months')
plt.ylabel('Temperature')
plt.xticks([x for x in range(2000,2020,3)])
plt.show()

#Seperating the Dataset into Training, Testing and Validation.
train = rio[:-60].copy()
val = rio[-60:-12].copy()
test = rio[-12:].copy()
baseline = val['Temp'].shift()
baseline.dropna(inplace=True)
baseline.head()

def measure_rmse(y_true, y_pred):
    return sqrt(mean_squared_error(y_true,y_pred))

# Using the function with the baseline (RMS-root mean square)values
rmse_base = measure_rmse(val.iloc[1:,0],baseline)
print(f'The RMSE of the baseline that we will try to diminish is {round(rmse_base,4)} celsius degrees')

#This function does a test to check if the Statistics obtained
#is Stationary or not and get the highest critical value as %
def check_stationarity(y, lags_plots=48, figsize=(24, 10)):
    "Use Series as parameter"

    # Creating plots of the DF
    y = pd.Series(y)
    fig = plt.figure()

    ax1 = plt.subplot2grid((3, 3), (0, 0), colspan=2)
    ax2 = plt.subplot2grid((3, 3), (1, 0))
    ax3 = plt.subplot2grid((3, 3), (1, 1))
    ax4 = plt.subplot2grid((3, 3), (2, 0), colspan=2)

    y.plot(ax=ax1, figsize=figsize)
    ax1.set_title('Monaragala Temperature Variation')
    plot_acf(y, lags=lags_plots, zero=False, ax=ax2);
    plot_pacf(y, lags=lags_plots, zero=False, ax=ax3);
    sns.distplot(y, bins=int(sqrt(len(y))), ax=ax4)
    ax4.set_title('Distribution Chart')

    plt.tight_layout()

    print('Results of Dickey-Fuller Test:')
    adfinput = adfuller(y)
    adftest = pd.Series(adfinput[0:4], index=['Test Statistic', 'p-value', 'Lags Used', 'Number of Observations Used'])
    adftest = round(adftest, 4)

    for key, value in adfinput[4].items():
        adftest["Critical Value (%s)" % key] = value.round(4)

    print(adftest)

    if adftest[0].round(2) < adftest[5].round(2):
        print('\nThe Test Statistics is lower than the Critical Value of 5%.\nThe serie seems to be stationary')
    else:
        print("\nThe Test Statistics is higher than the Critical Value of 5%.\nThe serie isn't stationary")

#Checking without the Transformation
check_stationarity(train['Temp'])

#Checking with the Transoformation
check_stationarity(train['Temp'].diff(12).dropna())


def walk_forward(training_set, validation_set, params):
    '''
    Params: it's a tuple where you put together the following SARIMA parameters: ((pdq), (PDQS), trend)
    '''
    history = [x for x in training_set.values]
    prediction = list()

    # Using the SARIMA parameters and fitting the data
    pdq, PDQS, trend = params

    # Forecasting one period ahead in the validation set
    for week in range(len(validation_set)):
        model = sm.tsa.statespace.SARIMAX(history, order=pdq, seasonal_order=PDQS, trend=trend)
        result = model.fit(disp=False)
        yhat = result.predict(start=len(history), end=len(history))
        prediction.append(yhat[0])
        history.append(validation_set[week])

    return prediction
#Testing the above function in the Validation Data Set
val['Pred'] = walk_forward(train['Temp'], val['Temp'], ((3,0,0),(0,1,1,12),'c'))

#Testing the Error of the Prediction
rmse_pred = measure_rmse(val['Temp'], val['Pred'])

print(f"The RMSE of the SARIMA(3,0,0),(0,1,1,12),'c' model was {round(rmse_pred,4)} celsius degrees")
print(f"It's a decrease of {round((rmse_pred/rmse_base-1)*100,2)}% in the RMSE")
#Creating a seperate column as the Error column
val['Error'] = val['Temp'] - val['Pred']

#Plotting the Predicted data vs error graph
def plot_error(data, figsize=(24, 10)):
    '''
    There must have 3 columns following this order: Temperature, Prediction, Error
    '''
    plt.figure(figsize=figsize)
    ax1 = plt.subplot2grid((2, 2), (0, 0))
    ax2 = plt.subplot2grid((2, 2), (0, 1))
    ax3 = plt.subplot2grid((2, 2), (1, 0))
    ax4 = plt.subplot2grid((2, 2), (1, 1))

    # Plotting the Current and Predicted values
    ax1.plot(data.iloc[:, 0:2])
    ax1.legend(['Real', 'Pred'])
    ax1.set_title('Current and Predicted Values')

    # Residual vs Predicted values
    ax2.scatter(data.iloc[:, 1], data.iloc[:, 2])
    ax2.set_xlabel('Predicted Values')
    ax2.set_ylabel('Errors')
    ax2.set_title('Errors versus Predicted Values')

    ## QQ Plot of the residual
    sm.graphics.qqplot(data.iloc[:, 2], line='r', ax=ax3)

    # Autocorrelation plot of the residual
    plot_acf(data.iloc[:, 2], lags=(len(data.iloc[:, 2]) - 1), zero=False, ax=ax4)
    plt.tight_layout()
    plt.show()
#Assigning the variables for the graph
val.drop(['month','year'], axis=1, inplace=True)
val.head()
#Output.
plot_error(val)

#Creates the new training and validation data sets.
future = pd.concat([train['Temp'], val['Temp']])
future.head()
model = sm.tsa.statespace.SARIMAX(future, order=(3,0,0), seasonal_order=(0,1,1,12), trend='c')
result = model.fit(disp=False)
test['Pred'] = result.predict(start=(len(future)), end=(len(future)+13))
test[['Temp', 'Pred']].plot(figsize=(24,10))

#Plotting the Obtained Temperature vs Predicted Temperature Graph
plt.title('Current Values compared to the Extrapolated Ones')
plt.show()

#Calculation of the RMS values.
#Calculation of the accuracy of the prediction
#Obtained from tested, trained and validated dataset.
test_baseline = test['Temp'].shift()
test_baseline[0] = test['Temp'][0]
rmse_test_base = measure_rmse(test['Temp'],test_baseline)
rmse_test_base1 = measure_rmse(test['Pred'],test_baseline)
rmse_test_extrap = measure_rmse(test['Temp'], test['Pred'])

print(f'The baseline RMSE for the test baseline was {round(rmse_test_base,2)} celsius degrees')
print(f'The baseline RMSE for the test extrapolation was {round(rmse_test_extrap,2)} celsius degrees')
print(f'That is an improvement of {-round((rmse_test_extrap/rmse_test_base-1)*100,2)}%')
print(f'The RMSE for the PREDICTED Baseline is {round(rmse_test_base1,2)}')
print(f'The RMSE for the TEST Baseline was {round(rmse_test_base,2)}')
print(f'The final accuracy of this model was {round((rmse_test_base1/rmse_test_base)*100,2)}%')