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

### Run tests

```
jest
// run single test
jest -t 'test name here'
```

## Docs:

[Swagger Documentation](localhost:3000/api-docs/)
