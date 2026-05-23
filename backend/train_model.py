import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load Dataset
data = pd.read_csv("dataset/accidents.csv")

# Display Dataset
print(data.head())
print(data.columns)

# Create Encoder
encoder = LabelEncoder()

# Encode categorical columns
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

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create Model
model = RandomForestClassifier()

# Train Model
model.fit(X_train, y_train)

# Accuracy
accuracy = model.score(X_test, y_test)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save Model
joblib.dump(model, "models/accident_model.pkl")

print("Model Saved Successfully")