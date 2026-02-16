import sys
import json
import random
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

def generate_forecast():
    try:
        # Try to import sklearn
        try:
            import numpy as np
            from sklearn.linear_model import LinearRegression
            HAS_SKLEARN = True
        except ImportError:
            HAS_SKLEARN = False

        predictions = []

        if HAS_SKLEARN:
            # Simulated historical data (last 30 days)
            X = np.array(range(1, 31)).reshape(-1, 1)
            y_energy = np.array([450 + 2*i + np.random.normal(0, 10) for i in range(1, 31)])
            y_waste = np.array([120 - 0.5*i + np.random.normal(0, 5) for i in range(1, 31)])

            model_energy = LinearRegression()
            model_energy.fit(X, y_energy)

            model_waste = LinearRegression()
            model_waste.fit(X, y_waste)

            future_days = np.array(range(31, 38)).reshape(-1, 1)
            pred_energy = model_energy.predict(future_days)
            pred_waste = model_waste.predict(future_days)

            for i in range(7):
                predictions.append({
                    'date': f'Day {31+i}',
                    'predictedEnergy': round(float(pred_energy[i]), 2),
                    'predictedWaste': round(float(pred_waste[i]), 2),
                    'confidence': 0.95
                })
        else:
            # Fallback simple logic
            base_energy = 510
            base_waste = 105
            for i in range(7):
                predictions.append({
                    'date': f'Day {31+i}',
                    'predictedEnergy': base_energy + (i * 2) + random.uniform(-10, 10),
                    'predictedWaste': base_waste - (i * 0.5) + random.uniform(-2, 2),
                    'confidence': 0.70 # Lower confidence for basic logic
                })

        print(json.dumps({
            'success': True,
            'data': predictions,
            'method': 'sklearn' if HAS_SKLEARN else 'fallback'
        }))

    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }))

if __name__ == "__main__":
    generate_forecast()
