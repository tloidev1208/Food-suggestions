from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from keras.layers import TFSMLayer
from tensorflow.keras.preprocessing import image
import numpy as np
import io
import os
from PIL import Image
import threading

app = FastAPI(title="Food Prediction API")

# ======================
# CORS
# ======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================
# Health check (BẮT BUỘC)
# ======================
@app.get("/")
def root():
    return {"status": "ok"}

# ======================
# Model config
# ======================
labels = ["Cơm tấm", "Phở", "Bánh mì"]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.savedmodel")

model = None
model_lock = threading.Lock()

def load_model():
    global model
    with model_lock:
        if model is None:
            print("🔥 Loading model...")
            model = TFSMLayer(
                MODEL_PATH,
                call_endpoint="serving_default"
            )
            print("✅ Model loaded")

def get_model():
    if model is None:
        load_model()
    return model

# ======================
# Startup event (QUAN TRỌNG)
# ======================
@app.on_event("startup")
def startup_event():
    print("🚀 FastAPI started")
    # ❌ KHÔNG load model ở đây (Railway dễ timeout)

# ======================
# API predict
# ======================
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        model = get_model()

        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((224, 224))

        img_array = image.img_to_array(img)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        preds = model(img_array)

        if isinstance(preds, dict):
            preds = list(preds.values())[0]

        preds = preds.numpy()[0]
        idx = int(np.argmax(preds))

        return {
            "label": labels[idx],
            "confidence": float(preds[idx])
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}
