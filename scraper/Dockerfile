FROM python:3.6-buster
LABEL maintainer="codyzacharias@pm.me"

WORKDIR /usr/src/app

COPY . .

RUN cd twint && \
	pip3 install . -r requirements.txt

COPY . . 