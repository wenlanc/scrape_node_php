# Simple Node with Express Server with REST API

## Features

- Express
- Scrapping using puppeter

## Installation

- `git clone https://github.com/wenlanc/scrape_node_php.git`
- `cd scrape_node_php`
- `npm install`
- `npm start`

### GET Routes

- visit http://localhost:3000
  - /scrape
  
#### Postman

- Install [Postman](https://www.getpostman.com/apps) to interact with REST API
- Create a message with:
  - URL: http://localhost:3000/messages
  - Method: POST
  - Body: raw + JSON (application/json)
  - Body Content: `{ "text": "Hi again, World" }`
- Delete a message with:
  - URL: http://localhost:3000/messages/1
  - Method: DELETE
