import logging

logger = logging.getLogger(__name__)

def send_email(to_email: str, subject: str, body: str):
    # Mock SMTP email sending
    logger.info(f"Sending email to {to_email}")
    logger.info(f"Subject: {subject}")
    logger.info(f"Body: {body}")
    return True
