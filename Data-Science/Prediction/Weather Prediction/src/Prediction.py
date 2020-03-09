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
    origin='https://agrobuddy.tk/DataSet/weatherdata.csv.zip',
    fname='weatherdata.csv.zip',
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
# History size is the size of the past window of data.
# Target size : How far we wanted to predict the weather.
def univariate_data(dataset, start_index, end_index, history_size, target_size):
    # Array to store data temporary.
    data = []
    labels = []

    # Getting starting index.
    start_index = start_index + history_size
    if end_index is None:
        end_index = len(dataset) - target_size

    for i in range(start_index, end_index):
        indices = range(i-history_size, i)
        # Reshape data from (history_size,) to (history_size, 1)
        data.append(np.reshape(dataset[indices], (history_size, 1)))
        labels.append(dataset[i+target_size])

    # Returning the arrays with values.
    return np.array(data), np.array(labels)

# Set value for training dataset. Number of rows defined in here.
TRAIN_SPLIT = 5000

# Make Tensor-flow output more stable. Ensuring reproducibility.
tf.random.set_seed(13)

# Reading from excel & setting values to array.
# Set values into the array.
uni_data = df['rainFall']

# Set date into the index.
uni_data.index = df['Date Time']

# Displaying example data.
print("\nSuccessfully data added.\nExample :")
print(uni_data.head())
print("\n")

# Enabling plotting in graphs. (Increasing publication quality)
uni_data.plot(subplots=True)

# Get data values into an array.
uni_data = uni_data.values
print("Data values added into numpy array : " + str(uni_data))

# # Calculating mean of the values of array.
# uni_train_mean = uni_data[:TRAIN_SPLIT].mean()
# print("Mean of the training data : " + str(uni_train_mean))
#
# # Calculating standard deviation of array.
# uni_train_std = uni_data[:TRAIN_SPLIT].std()
# print("Standard deviation of the training data : " + str(uni_train_std))
#
# # Standardize the dataset. This makes conform to a standard.
# uni_data = (uni_data-uni_train_mean)/uni_train_std
# print("Standardized data : " + str(uni_data))

# Set dataset size and the required prediction date.
univariate_past_history = 200
univariate_future_target = 25


# Train model from last 20 recodes and predict temp for next time.
x_train_uni, y_train_uni = univariate_data(uni_data, 0, TRAIN_SPLIT, univariate_past_history,univariate_future_target)
x_val_uni, y_val_uni = univariate_data(uni_data, TRAIN_SPLIT, None,univariate_past_history, univariate_future_target)


# Print model output.
print ('Single window of past history')
print (x_train_uni[0])
print ('\n Target temperature to predict')
print (y_train_uni[0])

# Create timing in the plot.
def create_time_steps(length):
  return list(range(-length, 0))

# Create plot to display the data.
def show_plot(plot_data, delta, title):
  # Setting labels to plot.
  labels = ['History', 'True Future', 'Model Prediction']

  # Set marker type for each label.
  marker = ['.-', 'rx', 'go']

  # Create appropriate time slots.
  time_steps = create_time_steps(plot_data[0].shape[0])

  # Checking delta value.
  if delta:
    future = delta
  else:
    future = 0


  plt.title(title)
  for i, x in enumerate(plot_data):
    if i:
      plt.plot(future, (plot_data[i]), marker[i], markersize=10,
               label=labels[i])
    else:
      plt.plot(time_steps, (plot_data[i].flatten()), marker[i], label=labels[i])
  plt.legend()
  plt.xlim([time_steps[0], (future+100)*2])
  plt.xlabel('Time-Step')
  return plt

show_plot([x_train_uni[0], y_train_uni[0]], 0, 'Sample Example')


def baseline(history):
  return np.mean(history)

show_plot([x_train_uni[0], y_train_uni[0], baseline(x_train_uni[0])], 0,'Baseline Prediction Example')

BATCH_SIZE = 256
BUFFER_SIZE = 10000

train_univariate = tf.data.Dataset.from_tensor_slices((x_train_uni, y_train_uni))
train_univariate = train_univariate.cache().shuffle(BUFFER_SIZE).batch(BATCH_SIZE).repeat()

val_univariate = tf.data.Dataset.from_tensor_slices((x_val_uni, y_val_uni))
val_univariate = val_univariate.batch(BATCH_SIZE).repeat()

simple_lstm_model = tf.keras.models.Sequential([
    tf.keras.layers.LSTM(8, input_shape=x_train_uni.shape[-2:]),
    tf.keras.layers.Dense(1)
])

simple_lstm_model.compile(optimizer='adam', loss='mae')

for x, y in val_univariate.take(1):
    print(simple_lstm_model.predict(x).shape)

EVALUATION_INTERVAL = 200
EPOCHS = 10

simple_lstm_model.fit(train_univariate, epochs=EPOCHS, steps_per_epoch=EVALUATION_INTERVAL,validation_data=val_univariate, validation_steps=50)

for x, y in val_univariate.take(3):
  plot = show_plot([x[0].numpy(), y[0].numpy(),
                    simple_lstm_model.predict(x)[0]], 0, 'Simple LSTM model')
  plot.show()

