FROM python:3.5
COPY server.py server.py
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
CMD ["python", "server.py"]