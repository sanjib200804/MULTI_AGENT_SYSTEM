import subprocess
import sys

services = [
    ("Gateway", "gateway.main:app", 8000),
    ("Auth", "services.auth.main:app", 8001),
    ("Chat", "services.chat.main:app", 8002),
    ("Agent", "services.agent.main:app", 8003),
]

processes = []

for name, app, port in services:
    print(f"Starting {name} on port {port}...")

    process = subprocess.Popen([
        sys.executable,
        "-m",
        "uvicorn",
        app,
        "--host",
        "0.0.0.0",
        "--port",
        str(port),
        "--reload"
    ])

    processes.append(process)

print("\n🚀 All services started!")

try:
    for process in processes:
        process.wait()

except KeyboardInterrupt:
    print("\n🛑 Stopping all services...")

    for process in processes:
        process.terminate()

    print("All services stopped.")