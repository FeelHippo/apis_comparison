# Express Cheatsheet

### Local environment variables

Please refer to .env.example in the root dir

### Run on Docker CLI

```
// install packages
npm install
// start mongoDb deamon
sudo systemctl start mongodb
// status of mongoDb deamon
sudo systemctl status mongodb
// stop mongoDb deamon
sudo systemctl stop mongodb
// start Docker Deamon
sudo systemctl start docker
// build and run
docker-compose up
```

Then [connect](https://huzaima.io/blog/connect-localhost-docker) to the docker container.

### Run tests

```
jest
// run single test
jest -t 'test name here'
```

## Docs:

[Swagger Documentation](localhost:3000/api-docs/)

## Requests

- GET
```
curl --location 'localhost:3000/api/v1/fun/get-fact' \
--header 'ENVIRONMENT: DEVELOPMENT' \
--header 'api-key: test_key'

{
    "url": "https://api.chucknorris.io/jokes/l14K4VjUS5qmRlU87vQj9g",
    "value": "Chuck Norris gets more ass than a toilet seat.",
    "iconUrl": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    "factId": "l14K4VjUS5qmRlU87vQj9g"
}
```

- POST
```
curl --location 'localhost:3000/api/v1/fun/post-fact' \
--header 'ENVIRONMENT: DEVELOPMENT' \
--header 'api-key: test_key' \
--header 'Content-Type: application/json' \
--data '{
    "url": "https://api.chucknorris.io/jokes/l14K4VjUS5qmRlU87vQj9g",
    "value": "Chuck Norris gets more ass than a toilet seat.",
    "iconUrl": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    "factId": "l14K4VjUS5qmRlU87vQj9g"
}'

204
```
