"""Tests for main module"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.main import main


def test_main_runs():
    """Test that main executes without errors."""
    main()


if __name__ == "__main__":
    test_main_runs()
    print("All tests passed!")