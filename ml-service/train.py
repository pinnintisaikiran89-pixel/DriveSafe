import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# ============================================================
# 1. LOAD DATASET
# ============================================================

print("\n========================================")
print("Loading dataset...")
print("========================================")

data = pd.read_csv("dataset/accidents.csv")

print("Dataset shape:", data.shape)


# ============================================================
# 2. REMOVE DUPLICATE ROWS
# ============================================================

before = len(data)

data = data.drop_duplicates()

after = len(data)

print("Duplicate rows removed:", before - after)


# ============================================================
# 3. SELECT FEATURES
# ============================================================

features = [
    "Weather Conditions",
    "Road Type",
    "Road Condition",
    "Lighting Conditions",
    "Traffic Control Presence",
    "Speed Limit (km/h)",
    "Driver Age",
    "Driver Gender",
    "Driver License Status",
    "Alcohol Involvement",
    "Vehicle Type Involved"
]


target = "Accident Severity"


# Keep only required columns
data = data[features + [target]]


# ============================================================
# 4. REMOVE MISSING VALUES
# ============================================================

print("\nMissing values before cleaning:")

print(data.isnull().sum())

data = data.dropna()

print("\nDataset shape after removing missing values:")
print(data.shape)


# ============================================================
# 5. DISPLAY TARGET DISTRIBUTION
# ============================================================

print("\n========================================")
print("Accident Severity Distribution")
print("========================================")

print(data[target].value_counts())


# ============================================================
# 6. SEPARATE FEATURES AND TARGET
# ============================================================

X = data[features]

y = data[target]


# ============================================================
# 7. DEFINE CATEGORICAL AND NUMERICAL FEATURES
# ============================================================

categorical_features = [
    "Weather Conditions",
    "Road Type",
    "Road Condition",
    "Lighting Conditions",
    "Traffic Control Presence",
    "Driver Gender",
    "Driver License Status",
    "Alcohol Involvement",
    "Vehicle Type Involved"
]


numerical_features = [
    "Speed Limit (km/h)",
    "Driver Age"
]


# ============================================================
# 8. PREPROCESSING
# ============================================================

preprocessor = ColumnTransformer(

    transformers=[

        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_features
        ),

        (
            "numerical",
            "passthrough",
            numerical_features
        )

    ]
)


# ============================================================
# 9. RANDOM FOREST MODEL
# ============================================================

model = RandomForestClassifier(

    n_estimators=300,

    max_depth=None,

    min_samples_split=2,

    min_samples_leaf=1,

    random_state=42,

    class_weight="balanced",

    n_jobs=-1
)


# ============================================================
# 10. CREATE COMPLETE PIPELINE
# ============================================================

pipeline = Pipeline(

    steps=[

        (
            "preprocessor",
            preprocessor
        ),

        (
            "classifier",
            model
        )

    ]
)


# ============================================================
# 11. TRAIN / TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.20,

    random_state=42,

    stratify=y
)


print("\n========================================")
print("Training Model")
print("========================================")

print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))


# ============================================================
# 12. TRAIN
# ============================================================

pipeline.fit(
    X_train,
    y_train
)


print("\nModel training completed.")


# ============================================================
# 13. PREDICTION
# ============================================================

y_pred = pipeline.predict(X_test)


# ============================================================
# 14. ACCURACY
# ============================================================

accuracy = accuracy_score(
    y_test,
    y_pred
)


print("\n========================================")
print("MODEL PERFORMANCE")
print("========================================")

print(
    f"Accuracy: {accuracy * 100:.2f}%"
)


# ============================================================
# 15. CLASSIFICATION REPORT
# ============================================================

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred
    )
)


# ============================================================
# 16. CONFUSION MATRIX
# ============================================================

print("\nConfusion Matrix:")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)


# ============================================================
# 17. SAVE COMPLETE PIPELINE
# ============================================================

joblib.dump(
    pipeline,
    "model.pkl"
)


print("\n========================================")
print("MODEL SAVED")
print("========================================")

print("Saved file: model.pkl")
print("Training completed successfully.")