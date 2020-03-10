import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt
import seaborn as sns
import os

file_ = ('./w_data' + ".csv")

origData = pd.read_csv(file_,index_col=None, header=0)

# rows,clmns = origData.shape

origData.head()

plt.figure(figsize=(14,6))
origData['maxTemp'].plot()

plt.figure(figsize=(12, 7))
sns.boxplot(x='rainFall',y='maxTemp',data=origData,palette='winter')

#conver rainfall column to 0 and 1 for ann
origData['rainFall']=[1 if i>0 else 0 for i in origData['rainFall']]

from sklearn.model_selection import train_test_split

origData.columns

origData.info()

x=origData[['temp', 'maxTemp', 'minTemp']]
y=origData[['rainFall']]

xtrain,xtest,ytrain,ytest=train_test_split(x,y,test_size=0.2, random_state=41)

#normalized x value
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
xtrain = scaler.fit_transform(xtrain)
xtest = scaler.transform(xtest)

# create ann model

import keras
from keras.layers import Dense
from keras.models import Sequential

ann  = Sequential()
ann.add(Dense(units= 32,init= 'uniform', activation = 'relu', input_dim=3))
ann.add(Dense(units= 16,init= 'uniform', activation = 'relu'))
ann.add(Dense(units= 1,init= 'uniform', activation = 'sigmoid'))
ann.compile(optimizer='adam',
              loss='mean_squared_error',
              metrics=['accuracy'])

ann.fit(xtrain,ytrain, batch_size=10, nb_epoch=10,verbose= 1)

Y_pred = ann.predict(xtest)
Y_pred = [ 1 if y>=0.5 else 0 for y in Y_pred]
print(Y_pred)

from sklearn.metrics import confusion_matrix

cm = confusion_matrix(ytest, Y_pred)
print(cm)

