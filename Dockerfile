FROM python:3.10-slim

WORKDIR /app

COPY training/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY training ./training

CMD ["sh", "-c", "uvicorn training.app:app --host 0.0.0.0 --port $PORT"]
