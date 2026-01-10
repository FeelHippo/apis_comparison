### Commands

- How to generate a new project:
    - [Docs](https://fastapi.tiangolo.com/virtual-environments/#create-a-project)
    - [Medium](https://dorian599.medium.com/fastapi-getting-started-3294efe823a0)
    - instructions:
        - `mkdir new_project`
        - `cd new_project`
        - `python3 -m venv .venv`
        - `source .venv/bin/activate`
        - `python -m pip install --upgrade pip`
        - `pip install "fastapi[standard]"`
        - `fastapi dev main.py`
        - when done: `deactivate`
- Commands:
    - [generate venv in Garuda](https://stackoverflow.com/a/79304690/10708345)
    - run app: `source .venv/bin/activate` -> `fastapi dev main.py`
    - stop app: `deactivate`
- Architecture:
    - [reference](https://fastapi.tiangolo.com/tutorial/bigger-applications/)


#### REST
```
curl --location 'http://localhost:8000/fun-fact/' \
--header 'x-token: fake-super-secret-token'

200OK
{
    "id": "K0q21jWJRdWkAJKh32Ur4g",
    "categories": [],
    "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    "created_at": "2020-01-05 13:42:25.905626",
    "updated_at": "2020-01-05 13:42:25.905626",
    "value": "Chuck Norris can piss into gale force winds."
}

curl --location 'http://localhost:8000/fun-fact/' \
--header 'x-token: fake-super-secret-token' \
--header 'Content-Type: application/json' \
--data '{
    "id": "abc123",
    "value": "Chuck Norris",
    "categories": ["list"],
    "created_at": "str",
    "updated_at": "str",
    "icon_url": "str"
}'

201 CREATED
{
    "categories": [
        "list"
    ],
    "created_at": "str",
    "id": "abc123",
    "value": "Chuck Norris",
    "icon_url": "str",
    "updated_at": "str"
}
```
