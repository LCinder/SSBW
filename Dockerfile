FROM python:3.7-alpine
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN apk add gettext
WORKDIR /src
COPY requirements.txt /src/
RUN pip install -r requirements.txt
COPY . /src