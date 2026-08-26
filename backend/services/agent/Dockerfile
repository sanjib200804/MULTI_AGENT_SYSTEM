FROM python:3.11-slim

WORKDIR /app

COPY backend/services/agent/requirements.txt ./requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/shared ./shared
COPY backend/services/agent/app ./app

EXPOSE 8003

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003"]
