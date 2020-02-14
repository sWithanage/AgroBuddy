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

# This is changed

