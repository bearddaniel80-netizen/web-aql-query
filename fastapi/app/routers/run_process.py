import asyncio
import subprocess


async def run_query(command, filename):
    def execute():
        with open(filename, "w+") as log:
            result = subprocess.run(
                command,
                stdout=log,
                stderr=subprocess.STDOUT,
                text=True
            )
            return result.returncode

    await asyncio.to_thread(execute)

async def run_markdown_conversion(input_file, output_file):
    command = ["pandoc", "-f", "markdown-yaml_metadata_block", input_file, "-o", output_file]
    await run_query(command, output_file)