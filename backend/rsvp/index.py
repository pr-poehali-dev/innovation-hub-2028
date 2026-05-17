"""RSVP-форма для свадьбы. Отправляет уведомление на почту при подтверждении гостя."""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

FROM_EMAIL = 'tsydes@mail.ru'
TO_EMAIL = 'tsydes@mail.ru'


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    guests_count = int(body.get('guests_count', 1))
    comment = body.get('comment', '').strip()

    if not name:
        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Имя обязательно'})}

    send_email(name, guests_count, comment)

    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True}, ensure_ascii=False)}


def send_email(name: str, guests_count: int, comment: str):
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    guests_word = 'гость' if guests_count == 1 else ('гостя' if guests_count < 5 else 'гостей')
    comment_line = f'<p><b>Комментарий:</b> {comment}</p>' if comment else ''

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'RSVP: {name} подтверждает присутствие'
    msg['From'] = FROM_EMAIL
    msg['To'] = TO_EMAIL

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; color: #333;">
      <h2 style="color: #8b6f52; border-bottom: 1px solid #e0d5c8; padding-bottom: 12px;">
        Новое подтверждение присутствия
      </h2>
      <p><b>Имя:</b> {name}</p>
      <p><b>Количество гостей:</b> {guests_count} {guests_word}</p>
      {comment_line}
      <p style="color: #999; font-size: 13px; margin-top: 24px;">
        Свадьба Дмитрия и Екатерины · 1 августа 2026
      </p>
    </div>
    """
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(FROM_EMAIL, smtp_password)
        server.sendmail(FROM_EMAIL, TO_EMAIL, msg.as_string())
