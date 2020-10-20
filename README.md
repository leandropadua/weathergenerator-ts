# weathergenerator-ts
![Build Status](https://github.com/leandropadua/weathergenerator-ts/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/leandropadua/weathergenerator-ts/branch/main/graph/badge.svg?token=M186RNP2FS)](https://codecov.io/gh/leandropadua/weathergenerator-ts)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=leandropadua_weathergenerator-ts&metric=alert_status)](https://sonarcloud.io/dashboard?id=leandropadua_weathergenerator-ts)

Typescript version of Weather Generator

## Quickstart
```bash
npm install
npm run build
npm start
```
Set env var `LOCATIONS` to specify the number of locations to generate at a time.
The default is `10` and the maximum is `1000`.

## Test and Linting
```bash
npm run lint # to auto fix, add "-- --fix"
npm run test # execute tests files with jest
```

## Docker execution
```bash
npm run docker:build
npm run docker:start
```