# Build stage — same Python version as .python-version to match UV_PYTHON_DOWNLOADS=0
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim AS builder

ENV UV_PYTHON_DOWNLOADS=0 UV_COMPILE_BYTECODE=1

WORKDIR /app

# Install deps first (no project) for better layer caching
COPY uv.lock ./
COPY pyproject.toml ./
COPY README.md ./
RUN uv sync --locked --no-install-project

# Install project
COPY src ./src
RUN uv sync --locked

# Runtime stage
FROM python:3.12-slim-bookworm

WORKDIR /app

COPY --from=builder /app/.venv ./.venv
COPY --from=builder /app/src ./src

ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH="/app/src"

EXPOSE 8000

CMD ["uvicorn", "agent.api:app", "--host", "0.0.0.0", "--port", "8000"]
