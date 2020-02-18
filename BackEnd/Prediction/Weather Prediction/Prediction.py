# Importing random libraries for prediction
from __future__ import absolute_import, division, print_function, unicode_literals

# Importing for fast numerical computing.
import tensorflow as tf

# Manage multi-dimensional arrays & matrices
import numpy as np

# Operating system dependent functionality.
import os

# Importing for the Python programming language for data manipulation and analysis.
import pandas as pd

# Matplotlib is a graph generating library.
import matplotlib as mpl
import matplotlib.pyplot as plt


# It will create graphs. 8 mean 8 inches. and 6 means 6 inches.
mpl.rcParams['figure.figsize'] = (8, 6)

# It will hide the grid lines in diagrams.
mpl.rcParams['axes.grid'] = False


# Downloading file from the dedicated link & extracting in allocated location.
zip_path = tf.keras.utils.get_file(
    origin='https://storage.googleapis.com/tensorflow/tf-keras-datasets/jena_climate_2009_2016.csv.zip',
    fname='jena_climate_2009_2016.csv.zip',
    extract=True)

print("Zip File Downloaded Location : "+zip_path)

# split the path name into a pair root and ext.
csv_path, _ = os.path.splitext(zip_path)

# Read CSV file using pandas library.
df = pd.read_csv(csv_path)
df.head()

# Check weather data correctly imported or not.
print(df.head())

# One variable is varying overtime.
def univariate_data(dataset, start_index, end_index, history_size, target_size):

    data = []
    labels = []
    start_index = start_index + history_size
    if end_index is None:
        end_index = len(dataset) - target_size

    for i in range(start_index, end_index):
        indices = range(i-history_size, i)
        # Reshape data from (history_size,) to (history_size, 1)
        data.append(np.reshape(dataset[indices], (history_size, 1)))
        labels.append(dataset[i+target_size])
        return np.array(data), np.array(labels)

TRAIN_SPLIT = 300000

tf.random.set_seed(13)

uni_data = df['T (degC)']
uni_data.index = df['Date Time']
uni_data.head()


uni_data.plot(subplots=True)

uni_data = uni_data.values

uni_train_mean = uni_data[:TRAIN_SPLIT].mean()
uni_train_std = uni_data[:TRAIN_SPLIT].std()

uni_data = (uni_data-uni_train_mean)/uni_train_std

univariate_past_history = 20
univariate_future_target = 0

x_train_uni, y_train_uni = univariate_data(uni_data, 0, TRAIN_SPLIT,univariate_past_history,univariate_future_target)
x_val_uni, y_val_uni = univariate_data(uni_data, TRAIN_SPLIT, None,univariate_past_history,univariate_future_target)

print ('Single window of past history')
print (x_train_uni[0])
print ('\n Target temperature to predict')
print (y_train_uni[0])
