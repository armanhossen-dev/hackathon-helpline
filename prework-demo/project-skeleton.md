# Project Skeleton

## Directory Structure
```
prework-demo/
├── src/
│   ├── __init__.py
│   ├── main.py
│   └── utils/
│       └── __init__.py
├── tests/
│   └── test_main.py
├── .env.example
├── requirements.txt
├── README.md
└── config.yaml
```

## Create the structure
```bash
mkdir -p src/utils tests
touch src/__init__.py src/main.py src/utils/__init__.py tests/test_main.py
```

## main.py (skeleton)
```python
from utils.helpers import load_config

def main():
    config = load_config()
    print(f"Running with config: {config}")

if __name__ == "__main__":
    main()
```