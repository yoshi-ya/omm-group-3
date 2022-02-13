# OMM group project

### This is a Meme Web-Application, where you can view, create, and share Memes with your friends.

#### Content

* Project setup
* API documentation

## Project setup

### prerequisites

* [Node version > 12.x](https://nodejs.org/en/download/)

### getting the project up and running

1. install dependencies

* inside both, /express-backend **and** /react-frontend, run the following command

````shell
npm install
````

2. navigate inside `/express-backend` and start the server

````shell
npm start
````

now a Node-Express server should be running on your local port 5001

3. navigate inside `/react-frontend` and start React

````shell
npm start
````

now the app should be running on `http://localhost:3000`

## API documentation

As long as the express-server is running on port 5001, the REST-API provides endpoints to create and retrieve Memes.

### `/createMeme`

|description|method|response|
|---|---|---|
|Create several memes by providing a template and a set of texts.|POST|URLs of created Memes|

#### request body type

```
{
  template: URL String,
  texts: [
    {
        captions: [
            {
                text: String,
                x: Number,
                y: Number
            }
        ],
        color: String,
        size: Number
    }
  ]
}
```

#### sample call

method: POST

headers:

* Content-Type: application/json

request URL: http://localhost:5001/createMeme

request body:

```json
{
  "template": "https://via.placeholder.com/250?text=hello",
  "texts":
  [
    {"captions": [
      {"text": "caption 1 for meme 1"},
      {"text": "caption 2 for meme 1"},
      {"text": "caption 3 for meme 1"}
    ]
    },
    {"captions": [
      {"text": "caption top", "x":220, "y":40},
      {"text": "caption bottom", "x":220, "y":380}
    ],
      "color": "blue",
      "size": 40
    }
  ]
}
```

#### sample response object

```json
{
    "data": [
        "http://localhost:3000/view/62090d6647cddc6644354e51",
        "http://localhost:3000/view/62090d6747cddc6644354e53"
    ]
}
```