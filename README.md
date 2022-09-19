# Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Running the app](#running)
4. [Api Documentation](#api_doc)

## Overview <a name="overview">

This api is created for a frequently asked quetions site.<br>
I used postgresql as database.<br>

### Features

 <b>Authoriztaion (Jwt)</b><br>
 - signup<br>
 - login<br>

 <b>GET</b><br>
 - get the categories of questions<br>
 - get all question of one category<br>
 - get one question with all of it answers<br>

 <b>POST</b><br>
 - create question<br>
 - answer a question<br>
 - like or dislike an answer<br>

## Database restore

### Create a user and a database in postgresql.
 
```bash
$ CREATE DATABASE faq;
$ CREATE USER faquser WITH PASSWORD 'faqpass';
```

### Restore database from faq_database.sql file.

If you use a remote server, then change 'localhost' to your host and '5432' to your port.

```bash
$ psql -U faquser -h localhost -p 5432 faq < "[your path]/faq-api/faq_database.sql"
```
 
## Installation <a name="installation">
 
```bash
$ npm install
```

## Running the app <a name="running">

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Api documentation <a name="api_doc">

### Get requests

#### 1. Get all question category with category id

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/category` | `-` |

#### Response
```
[
  {
    "id": number,
    "name": string
  },
  ...
]
```

#### Example
```
http://localhost:3000/category
```
```
[
  {
    "id": 1,
    "name": "tech"
  },
  ...
]
```

#### 2. Get all question by category id

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/question/byCategoryID/[category_id]` | `category_id (you can get it from 1. request)` |

##### Responses
```
[
  {
    "id": number,
    "author_id": number,
    "question_title": string,
    "question_body": string,
  },
  ...
]
```

#### Example
```
http://localhost:3000/question/byCategoryID/1
```
```
[
  {
    "id": 1,
    "author_id": 1,
    "question_title": "How much does a new PC cost?",
    "question_body": "Hi, I want a new PC for programming. What should I buy and how much does it cost? Thanks for the answers."
  },
  ...
]
```

#### 3. Get a question with all of it answers

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/question/[question_id]` | `question_id (you can get it from 2. request)` |

##### Responses
```
{
  "id": number,
  "author_id": number,
  "question_title": string,
  "question_body": string,
  "answers": [
    {
      "id": number,
      "question_id": number,
      "author_id": number,
      "answer_body": string,
      "like_count": number,
      "dislike_count": number
    },
    ...
  ]
}
```

#### Example
```
http://localhost:3000/question/1
```
```
{
  "id": 1,
  "author_id": 1,
  "question_title": "How much does a new PC cost?",
  "question_body": "Hi, I want a new PC for programming. What should I buy and how much does it cost? Thanks for the answers.",
  "answers": [
    {
      "id": 39,
      "question_id": 1,
      "author_id": 16,
      "answer_body": "You didn't tell us how much you have for that.",
      "like_count": 2,
      "dislike_count": 0
    },
    ...
  ]
}
```

### Post

#### 1. Signup

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/auth/signup` | `username: string, password: string, email: string, gender: string`|

#### Response
```
{
  "msg": string
}
```

#### Example
```
http://localhost:3000/auth/signup

{
  "username": "Alex",
  "password": "AlexSecurePassword",
  "email": "alexemail@email.com",
  "gender": "male"
}

```
```
  {
    "msg": "Signed up successfully!"
  },
```

#### 2. Login

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/auth/login` | `username: string, password: string` |

#### Response
```
{
    "accessToken": string,
}
```

#### Example
```
http://localhost:3000/auth/login
```
```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2...",
}
```

## License

Nest is [MIT licensed](LICENSE).
