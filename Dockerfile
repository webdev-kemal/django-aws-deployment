FROM python:3.11.5-alpine
WORKDIR /goksoyakademi
COPY ./goksoyakademi /goksoyakademi

RUN pip install --upgrade pip --no-cache-dir

RUN pip install -r requirements.txt --no-cache-dir

RUN chmod -R 755 /goksoyakademi/static/

# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

# CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--timeout", "120", "--workers", "4"]
