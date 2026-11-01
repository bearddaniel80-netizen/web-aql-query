from .security.api_key_check import verify_internal_key
from .routers.run_process import run_query, run_markdown_conversion
from .routers.minio import router as minio_router

import json
from pathlib import Path
from fastapi import FastAPI, Header
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------------------------------------
# Routers
# --------------------------------------------------

app.include_router(minio_router)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/api/data")
async def get_data(
    x_internal_key: str | None = Header(default=None),
):
    verify_internal_key(x_internal_key)

    return {
        "message": "Hello from FastAPI"
    }

@app.get("/api/index")
async def get_aql_readme(
    x_internal_key: str | None = Header(default=None),
):
    verify_internal_key(x_internal_key)
    filename = "README"
    input_file = str(Path.cwd() /  f"{filename}.md")
    output_file = str(Path.cwd() /  f"{filename}.html")
    await run_markdown_conversion(input_file, output_file)
    with open(output_file, "r") as f:
        html = f.read()
    return HTMLResponse(content=html)

@app.get("/api/system/list")
async def get_system_list(
    x_internal_key: str | None = Header(default=None),
):
    verify_internal_key(x_internal_key)
    return {"result": ["aggregates", "docs", "docs_filter", "operators", "scalars", "stdin_sources","table_functions","transformers"]}

@app.get("/api/system/{source}")
async def get_system_source(
    source: str,
    x_internal_key: str | None = Header(default=None),
):
    verify_internal_key(x_internal_key)

    # --------- Data files ------------
    data_filename = str(Path.cwd() / f"{source}_data.js")
    metadata_filename = str(Path.cwd() / f"{source}_metadata.js")

    # --------- Run command -----------
    command = ["aql", "query", f"SHOW {source}"]
    await run_query(command, data_filename)
    command = ["aql", "query", f"DESCRIBE {source}"]
    await run_query(command, metadata_filename)

    # --------- Collect / Format ------
    with open(data_filename, "r") as f_data:
        data = json.load(f_data)
    with open(metadata_filename, "r") as f_metadata:
        tmp_columns = json.load(f_metadata)
        columns = [
            {
                "key": column["name"],
                "label": column["name"].title(),
                "type": column["type"]
            }
            for column in tmp_columns 
        ]
    return {"columns": columns, "results": data}