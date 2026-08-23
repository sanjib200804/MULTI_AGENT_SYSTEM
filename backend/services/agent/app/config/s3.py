import os

import boto3
from dotenv import load_dotenv
load_dotenv()


s3 = boto3.client(
    "s3",
    region_name=os.getenv("AWS_REGION") or "us-east-1",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID") or None,
    aws_secret_access_key=os.getenv("AWS_SECRET_KEY") or None
)