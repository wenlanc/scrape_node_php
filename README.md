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

- visit http://localhost:3031
  - /scrape
  
### Reference - Configuration php, nodejs on ec2

- https://gist.github.com/atikju/1fb8d3e856e32f3b0a678d393914351b


### Install chrome engine on centos

- wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm

- sudo yum localinstall google-chrome-stable_current_x86_64.rpm


### Setting pm2
 
# Installing pm2    
npm install -g pm2 # may require sudo

# Starting the app
pm2 start npm -- start
pm2 save    # saves the running processes
            # if not saved, pm2 will forget
            # the running apps on next boot


# check status 
pm2 list

# IMPORTANT: If you want pm2 to start on system boot
pm2 startup # starts pm2 on computer boot

#### Postman

- Install [Postman](https://www.getpostman.com/apps) to interact with REST API
- Create a message with:
  - URL: http://localhost:3031/messages
  - Method: POST
  - Body: raw + JSON (application/json)
  - Body Content: `{ "text": "Hi again, World" }`
- Delete a message with:
  - URL: http://localhost:3031/messages/1
  - Method: DELETE
