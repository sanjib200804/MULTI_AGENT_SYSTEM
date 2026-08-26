FROM python:3.11-slim

WORKDIR /app

COPY backend/services/auth/requirements.txt ./requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/services/auth ./services/auth
COPY backend/shared ./shared

ENV PYTHONPATH=/app/services/auth:/app

WORKDIR /app/services/auth

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]
