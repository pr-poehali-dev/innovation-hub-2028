"""RSVP-форма для свадьбы Дмитрия и Екатерины. Сохраняет ответ гостя в БД и отправляет уведомление на почту."""
import json
import os
import smtplib
import psycopg2  # noqa
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    if event.get('httpMethod') == 'GET':
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute(
            "SELECT id, name, guests_count, comment, created_at FROM t_p49309913_innovation_hub_2028.rsvp ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        result = [
            {"id": r[0], "name": r[1], "guests_count": r[2], "comment": r[3], "created_at": str(r[4])}
            for r in rows
        ]
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps(result, ensure_ascii=False)}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    guests_count = int(body.get('guests_count', 1))
    comment = body.get('comment', '').strip()

    if not name:
        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Имя обязательно'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p49309913_innovation_hub_2028.rsvp (name, guests_count, comment) VALUES (%s, %s, %s)",
        (name, guests_count, comment or None)
    )
    conn.commit()
    cur.close()
    conn.close()

    try:
        send_email(name, guests_count, comment)
    except Exception:
        pass

    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True}, ensure_ascii=False)}


def send_email(name: str, guests_count: int, comment: str):
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    if not smtp_password:
        return

    from_email = '1tsydes1@mail.ru'
    to_email = '1tsydes1@mail.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'RSVP: {name} подтверждает присутствие'
    msg['From'] = from_email
    msg['To'] = to_email

    guests_word = 'гость' if guests_count == 1 else ('гостя' if guests_count < 5 else 'гостей')
    comment_line = f'<p><b>Комментарий:</b> {comment}</p>' if comment else ''

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
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())