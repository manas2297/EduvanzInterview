# Eduvanz Backend Task

> Express REST API with support for sqlite, mysql, and postgresql


- routes mapping via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- support for [sqlite](https://www.sqlite.org/), [mysql](https://www.mysql.com/), and [postgresql](https://www.postgresql.org/)
- environments for `development`, `testing`, and `production`
- linting via [eslint](https://github.com/eslint/eslint)
- tests running with [Jest](https://github.com/facebook/jest)

## Table of Contents

- [Install & Use](#install-and-use)
- [Folder Structure](#folder-structure)
- [Services](#services)
- [Config](#config)
  - [Connection and Database](#connection-and-database)
- [Routes](#routes)
- [Test](#test)
  - [Setup](#setup)

## Install and Use

```sh
# cd into project root
$ npm i
# to use mysql
$ npm i mysql2 --save
# start the api
$ npm start
```

## Folder Structure

This application has 3 main directories:

- api - for controllers, models, services, etc.
- config - for routes, database, etc.
- test - using [Jest](https://github.com/facebook/jest)



## Config

Holds all the server configurations.

## Connection and Database

```js
{
  database: 'eduvanz',
  username: 'root',
  password: 'password',
  host: 'localhost',
  dialect: 'mysql' || 'sqlite' ||  || 'postgres',
}
```


## Routes

Here I have defined all the routes for the api. 
POST /api/participants
GET /api/participants

with pagination support 

/api/participants?size=4&page=0

## Test

```
npm run test-ci
```

### Setup

The setup directory holds the `_setup.js` which holds `beforeAction` which starts a test express application and connects to our test database, and a `afterAction` which closes the db connection.


### npm start

This is the entry. This command:


- runs **nodemon watch task** for the all files conected to `.api/api.js`
- sets the **environment variable** `NODE_ENV` to `development`
- opens the db connection for `development`
- starts the server on 127.0.0.1:2017

### other commands

- `npm run dev` - simply start the server withou a watcher
- `npm run lint` - linting with [eslint](http://eslint.org/)
- `npm run nodemon` - same as `npm start``
- `test-ci` - only runs tests, nothing in pretest, nothing in posttest, for better use with ci tools

