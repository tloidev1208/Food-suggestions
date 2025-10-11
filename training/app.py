from fastapi import FastAPI, File, UploadFile
from keras.layers import TFSMLayer
from tensorflow.keras.preprocessing import image
import numpy as np
import uvicorn
import io
from PIL import Image

app = FastAPI()

# ✅ Load model bằng TFSMLayer (Keras 3)
model = TFSMLayer("./model.savedmodel", call_endpoint="serving_default")

# ⚠️ Thay bằng label thật mà bạn train
labels = ["Pho", "Banhmi"]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        img = Image.open(io.BytesIO(await file.read())).convert("RGB")
        img = img.resize((224, 224))  # 👈 chỉnh đúng input model Teachable Machine (thường 224x224)
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        preds = model(img_array)
        # ✅ fix lỗi dict
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
    uvicorn.run(app, host="0.0.0.0", port=8000)
