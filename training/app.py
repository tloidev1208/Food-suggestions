from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from keras.layers import TFSMLayer
from tensorflow.keras.preprocessing import image
import numpy as np
import io
import uvicorn
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ❌ KHÔNG load model ở đây
model = None

labels = ["Cơm tấm", "Phở", "Bánh mì"]

def get_model():
    global model
    if model is None:
        print("🔥 Loading model...")
        model = TFSMLayer("./model.savedmodel", call_endpoint="serving_default")
        print("✅ Model loaded")
    return model


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        model = get_model()

        img = Image.open(io.BytesIO(await file.read())).convert("RGB")
        img = img.resize((224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        preds = model(img_array)
        if isinstance(preds, dict):
            preds = list(preds.values())[0]

        preds = preds.numpy()[0]
        predicted_label = labels[np.argmax(preds)]
        confidence = float(np.max(preds))

        return {"label": predicted_label, "confidence": confidence}

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)