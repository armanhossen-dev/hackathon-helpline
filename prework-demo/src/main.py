"""AI Hackathon Project - Main Entry Point"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from utils import load_config


def main():
    config = load_config()
    print(f"Running with config: {config}")


if __name__ == "__main__":
    main()