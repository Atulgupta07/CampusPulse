from apscheduler.schedulers.background import BackgroundScheduler
import logging

logger = logging.getLogger(__name__)

scheduler = BackgroundScheduler()

def daily_reminder():
    logger.info("Running daily task reminder job...")
    # Add real logic here (e.g., query db, send email)

def start_scheduler():
    scheduler.add_job(daily_reminder, 'cron', hour=8, minute=0)
    scheduler.start()
    logger.info("Scheduler started.")

def stop_scheduler():
    scheduler.shutdown()
    logger.info("Scheduler stopped.")
