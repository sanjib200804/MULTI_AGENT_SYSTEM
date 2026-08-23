import os

from config.s3 import s3


async def get_from_s3(
    filename: str,
    expires_in: int = 600
):
    url = s3.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": os.getenv("AWS_BUCKET_NAME"),
            "Key": filename
        },
        ExpiresIn=expires_in
    )

    return url