import json
import urllib.request

GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOFLEVKtZQHp5GNWINpSOsTVEeVvVUBI_pmkfKLm2sl3CN-Zfxi2MP-pa9hMFXRkIe/exec"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def handler(event: dict, context) -> dict:
    """Прокси для отправки RSVP-данных в Google Sheets."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")

    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        GOOGLE_SCRIPT_URL,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=15) as response:
        result = response.read().decode("utf-8")

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": result,
    }
