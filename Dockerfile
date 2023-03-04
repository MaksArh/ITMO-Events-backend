FROM python:3.10

WORKDIR /usr/src/app
COPY pyproject.toml pyproject.toml

RUN pip3 install poetry=="1.2.2"

RUN poetry source add --default doubanio https://pypi.doubanio.com/simple

RUN poetry config virtualenvs.create false && poetry install

COPY . .

RUN chmod +x gunicorn.sh

ENTRYPOINT ["./gunicorn.sh"]
