import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
data = pd.read_csv("dataset/accidents.csv")

# Remove missing values
data = data.dropna()

# Select useful columns
data = data[
    [
        'Weather Conditions',
        'Road Type',
        'Speed Limit (km/h)',
        'Driver Age',
        'Alcohol Involvement',
        'Accident Severity'
    ]
]

# Encode text columns
encoder = LabelEncoder()

data['Weather Conditions'] = encoder.fit_transform(
    data['Weather Conditions']
)

data['Road Type'] = encoder.fit_transform(
    data['Road Type']
)

data['Alcohol Involvement'] = encoder.fit_transform(
    data['Alcohol Involvement']
)

data['Accident Severity'] = encoder.fit_transform(
    data['Accident Severity']
)

# Features
X = data[
    [
        'Weather Conditions',
        'Road Type',
        'Speed Limit (km/h)',
        'Driver Age',
        'Alcohol Involvement'
    ]
]

# Target
y = data['Accident Severity']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = RandomForestClassifier()

model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, "model.pkl")

print("Model Saved Successfully")