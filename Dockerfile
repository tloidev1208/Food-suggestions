FROM python:3.10-slim

WORKDIR /app

COPY training/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY training ./training

EXPOSE 8000

CMD ["python", "training/app.py"]
