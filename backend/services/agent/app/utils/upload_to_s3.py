import os

from config.s3 import s3


async def upload_to_s3(
    filename: str,
    data: bytes,
    content_type: str
):
    s3.put_object(
        Bucket=os.getenv("AWS_BUCKET_NAME"),
        Key=filename,
        Body=data,
        ContentType=content_type
    )

    return filename