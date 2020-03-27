import pmdarima as pm

from Models.Components import AccurancyCalculator
from Models.Components import FileDownloader


def getAccuracy():
    # Import data
    series = FileDownloader.getFileData("arima-model-temperature-dataset")
    # series = pd.read_csv('https://agrobuddy.tk/getData?type=arima-model-temperature-dataset', parse_dates=['date'],
    #                      index_col='date')

    months = 3
    validationDatasetSize = months * 30
    split_point = int(len(series) - validationDatasetSize)

    data, validation = series[0:split_point], series[split_point:]

    print(len(validation))
    print(validation)

    # Seasonal - fit stepwise auto-ARIMA
    bestFitSarimaModel = pm.auto_arima(data,                    # Providing data set to the model.
                                       start_p=1,               # Starting of the moving average (MA) p.
                                       start_q=1,               # Starting of the moving average (MA) q.
                                       test='adf',              # Testing type is set in here.
                                       max_p=3, max_q=3,        # Max size of p and q.
                                       m=7,                     # Period of each section. 7 means daily.
                                       start_P=0,               # It's Auto-Regression potion of seasonal model.
                                       seasonal=True,           # Set to sarima model.
                                       d=None,                  # The order of first differing the model.
                                       D=1,                     # The order of seasonal differencing value.
                                       trace=True,              # Print status on the fits.
                                       error_action='ignore',   # If unable to fit to model remove the warning message and lines.
                                       suppress_warnings=True,  # Warning might be
                                       stepwise=True            # This will help to find the optimum model properly.
                                       )

    print(bestFitSarimaModel.summary())

    # Forecast
    n_periods = validationDatasetSize
    fitted = bestFitSarimaModel.predict(n_periods=n_periods)  # Number of predicting days for future.

    validationData = validation.values
    print(validationData)

    return str(AccurancyCalculator.calculate(validationData, fitted, arrayType="sarima"))

getAccuracy()