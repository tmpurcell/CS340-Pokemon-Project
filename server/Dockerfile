FROM python:3.11-slim

# set working dir to /api
WORKDIR /api

# copy server contents into the container at the Working dir = /api
COPY ./server .

RUN pip install -r requirements.txt

ENV FLASK_ENV production

EXPOSE 5000

# CMD ["gunicorn", "-b", ":5000", "api.api:create_app()"]
CMD ["gunicorn", "-b", ":5000", "app:app"]