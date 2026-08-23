import requests
def download_pdf(url: str, filename: str = "document.pdf"):
    response = requests.get(url, timeout=60)
    response.raise_for_status()

    with open(filename, "wb") as f:
        f.write(response.content)

    return filename

