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
    - run app: `source .venv/bin/activate` -> `fastapi dev app/main.py`
    - stop app: `deactivate`
- Architecture:
    - [reference](https://fastapi.tiangolo.com/tutorial/bigger-applications/)


#### REST
```
curl --location 'http://localhost:8000/fun-fact/' \
--header 'x-token: fake-super-secret-token'

200OK
{
    "value": "Chuck Norris sleeps with a pillow under his gun.",
    "categories": [],
    "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    "id": "qqthrspvtqyigfwvaui2eq"
}

curl --location 'http://localhost:8000/fun-fact/' \
--header 'x-token: fake-super-secret-token' \
--header 'Content-Type: application/json' \
--data '{
    "value": "Chuck Norris Time Stamps",
    "categories": ["list"],
    "created_at": "str",
    "updated_at": "str",
    "icon_url": "str"
}'

201 CREATED
{
    "value": "Chuck Norris Time Stamps",
    "categories": [
        "list"
    ],
    "icon_url": "str",
    "id": "55c35ad9-fbf4-4a7f-ae07-9a04eb4380c6"
}
```
