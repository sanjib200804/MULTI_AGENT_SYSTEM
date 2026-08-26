FROM python:3.11-slim

WORKDIR /app

COPY services/auth/requirements.txt ./requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY services/auth ./services/auth
COPY shared ./shared

ENV PYTHONPATH=/app/services/auth:/app

EXPOSE 8001

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]