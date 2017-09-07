# restful-aiml-bot

Simple restful api server, process request string (keyword) and return data base on AIML algorithm.

You can use this to create simple chatbot, understanding user queries and return value base on template / pattern of queries.

## Requirement
This project need `Nodejs` and `AIMLInterpreter` library to run. Install with `npm`:

```bash
npm install aimlinterpreter
```

## Usage

### Step 1: Build your bot brain with AIML ###
Edit `test.aiml` with aiml content. Learn more about AIML at [http://www.alicebot.org/aiml.html]()

### Step 2: Start web server ###
```bash
node server.js
```
By default, web server will start from port `8088`

### Step 3: Query to server ###
Request to url `http://localhost:8088?q=YOUR_STRING&format=json|text`

Query string meanings:

- `q`: Keyword will search in AIML file.
- `format`: can be `json` or `text`.

### Example: ###

- Request to: `http://localhost:8088?q=hi&format=json`
 
- Sample response (`json` format):

```json
{
    "text": "Hello to you too",
    "wildcard": []
}
```