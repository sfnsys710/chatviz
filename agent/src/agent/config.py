import os
from dotenv import load_dotenv

load_dotenv()

MODEL_NAME = os.getenv("MODEL_NAME", "claude-haiku-4-5-20251001")
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.0"))
