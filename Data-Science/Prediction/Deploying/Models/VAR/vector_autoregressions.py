# some example data
import numpy as np
import pandas
import statsmodels.api as sm
from statsmodels.tsa.api import VAR
mdata = sm.datasets.macrodata.load_pandas().data

print(mdata.head(500))

# prepare the dates index
dates = mdata[['year', 'quarter']].astype(int).astype(str)
quarterly = dates["year"] + "Q" + dates["quarter"]

from statsmodels.tsa.base.datetools import dates_from_str
quarterly = dates_from_str(quarterly)
mdata = mdata[['realgdp','realcons','realinv']]
mdata.index = pandas.DatetimeIndex(quarterly)
data = np.log(mdata).diff().dropna()

# make a VAR model
model = VAR(data)
results = model.fit(2)
results.summary()
results.plot()
results.plot_acorr()

#Lag order selection
model.select_order(15)
results = model.fit(maxlags=15, ic='aic')

#Forecasting
#forecast function to produce this forecast.(Note that we have to specify the “initial value” for the forecast)
lag_order = results.k_ar
results.forecast(data.values[-lag_order:], 5)
#forecast_interval function - produce the above forecast along with asymptotic standard errors.These can be visualized using the plot_forecast function
results.plot_forecast(10)


# Impulse Response Analysis
# impulse response analysis by calling the irf function on a VARResults object
irf = results.irf(10)
# visualized using the plot function
irf.plot(orth=False)
# plot function is flexible and can plot only variables of interest if so desired
irf.plot(impulse='realgdp')
#  The cumulative effects Ψn=∑ni=0Φi can be plotted with the long run effects as follows
irf.plot_cum_effects(orth=False)

# Forecast Error Variance Decomposition (FEVD)
fevd = results.fevd(5)
fevd.summary()
#visualized through the returned FEVD object
results.fevd(20).plot()

#Statistical tests
#Granger causality
results.test_causality('realgdp', ['realinv', 'realcons'], kind='f')
#Normality
results.test_normality()