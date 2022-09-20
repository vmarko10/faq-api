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

The question categories are static.<br>
For testing, there are 2 user in the database you can use. There is a question, answer and like/dislike registered in the db, so you can request it already.<br>
For request data, you don't need to be signed in, only for the post actions.<br>

The 2 test users:<br>

```
// user 1
{
  username: bill
  password: BillPass
}

// user 2
{
  username: erzsi
  password: erzsiPass
}
```

The registered question_id: 1

## Database restore

### Create a user and a database in postgresql.
 
```bash
$ CREATE DATABASE faq;
$ CREATE USER faquser WITH PASSWORD 'faqpass';
```

### Restore database from faq_database.sql file.

If you use a remote server:<br>
 - change 'localhost' to your host and '5432' to your port,
 - change '/ormconfig.ts'

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
Call
```
http://localhost:3000/category
```
Response
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
You need the 1. request id value for category_id parameter

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/question/byCategoryID/[category_id]` | `category_id: number` |

##### Response
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
Call
```
http://localhost:3000/question/byCategoryID/1
```
Response
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
You need the 2. request id value for question_id parameter

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/question/[question_id]` | `question_id: number` |

##### Response
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
Call
```
http://localhost:3000/question/1
```
Response
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
`http://localhost:3000/auth/signup` | `username: string`<br>`password: string`<br>`email: string`<br>`gender: string`|

#### Response
```
{
  "msg": string
}
```

#### Example
Call
```
http://localhost:3000/auth/signup
```
Parameters
```
{
  "username": "Alex",
  "password": "AlexSecurePassword",
  "email": "alexemail@email.com",
  "gender": "male"
}
```
Response
```
{
  "msg": "Signed up successfully!"
},
```

#### 2. Login

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/auth/login` | `username: string`<br>`password: string` |

#### Response
```
{
  "accessToken": string,
}
```

#### Example
Call
```
http://localhost:3000/auth/login
```
Parameters
```
{
  "username": "Alex",
  "password": "AlexSecurePassword",
}
```
Response
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2...",
}
```

#### 2. Create question
You need to use your <b>Bearer token</b><br>
You need the 1. request id value for category_id

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/question/create` | `question_title: string`<br>`question_body: string`<br>`category_id: number` |

#### Response
```
{
  "msg": string
}
```

#### Example
Call
```
http://localhost:3000/question/create
```
Parameters
```
{
 "question_title": "What do you think, which team is going to win tonight?"
 "question_body": "I am courios about people thoughts, so explain yourself."
 "category_id": 4
}
```
Response
```
{
  "msg": "Question was uploaded!"
}
```

#### 3. Answer Question
You need to use your <b>Bearer token</b><br>
You need the 3. request id value for question_id

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/question/answer` | `question_title: string`<br>`question_body: string`<br>`category_id: number` |

#### Response
```
{
  "msg": string
}
```

#### Example
Call
```
http://localhost:3000/question/answer
```
Parameters
```
{
  "question_id": 1,
  "answer_body": "I guess the home team will win, they are unstoppable this season"
}
```
Response
```
{
  "msg": "Answer was uploaded successfully!"
}
```


#### 4. Like/Dislike an answer
You need to use your <b>Bearer token</b><br>
You need an id value of an answer, you can have it from the 3. request

| Path | parameters |
| :--- | :--- |
`http://localhost:3000/question/answer` | `answer_id: number`<br>`isLike: boolean` |

#### Response
```
{
  "msg": string
}
```

#### Example
Call
```
http://localhost:3000/question/answer
```
Parameters
```
{
  "question_id": 1,
  "answer_body": "I guess the home team will win, they are unstoppable this season"
}
```
Response
```
{
  "msg": "Answer was uploaded successfully!"
}
```

## License

Nest is [MIT licensed](LICENSE).
