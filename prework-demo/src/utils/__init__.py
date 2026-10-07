"""Helper utilities"""

import os


def load_config() -> dict:
    """Load configuration from environment variables."""
    return {
        "debug": os.getenv("DEBUG", "false").lower() == "true",
        "port": int(os.getenv("PORT", "8000")),
        "log_level": os.getenv("LOG_LEVEL", "info"),
    }


def get_api_key(service: str) -> str:
    """Get API key from environment variables."""
    key = os.getenv(f"{service.upper()}_API_KEY")
    if not key:
        raise ValueError(f"Missing API key for {service}")
    return key