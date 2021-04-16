# is-it-open-restaurants
Simple Web App to query Restaurant Opening Hours (from a given csv)
Task Requirements: https://gist.github.com/seahyc/d013a8f8f1c1be52513cf7b77cce6e81

## How to use this repo
This readme on master describes the general updates, TODOS for frontend/backend and updates that can't be quantified as code this repo(deployment settings, setting up of db/API gateway/lambda fn in aws). 

Keeping master branch as the latest working full stack deployment, so I pull-req from a dev branch to master once a version is complete. 

I started off designing my architecture as reactjs -> awsAPIgateway -> lambda function -> AWS Elasticsearch, but faced multiple issues including CORS and lambda fn deployment.

Although final deployment is simply reactjs on netlify --> jsonbin.io REST API --> jsonbin.io db, I can explain my initial architectural decisions of using Elasticsearch, API Gateway and serverless component of lambda function although I couldn't get it to work, despite deployed various parts of the stack. 

## What's Deployed and Where?
| Branch | Frontend  | Backend | Db |
| ------------- | ------------- | ------------- | ------------- |
| reactjs-jsonbinio | ReactJS on AWS Amplify:  https://main.d2rwu09ypt5g13.amplifyapp.com/ | - (didn't need express) | jsonbin.io |
| jquery-aws-elasticsearch | jquery(undeployed) | AWS API Gateway (deployed but fail), lambda function (deployed, to test) | AWS ElasticSearch (success) |

## Latest Notes
- master currently running based on branch reactjs-jsonbin
```
git clone https://github.com/careylzh/is-it-open-restaurants.git
cd client
npm i
npm start
```
### Separate Adventures:
- Successfully parsed and populated AWS Elasticsearch(abbreviated ES, not ECMA) DB with Kibana Console
- Priortised Name Searching Speed so decided to use non-rel db over rel. Also corrobated w fact that Elasticsearch is industrial grade search eng/db. But number searching might be slow
- Probably have to reformat openingHours field in elasticsearch restaurants for future usage/ease of access by new, unplanned features eg. new location tag in each json string
- If API Gateway/Lambda Function is configured properly: Finetine Cloudwatch logs to throw exact 5xx/4xx error statuses. 
- Paused development for jquery-aws-elasticsearch stack due to unresolved CORS setting despite setting "Access-Control-Allow-Origin" to '*' on AWS API gateway

### The follow sections explain the technical decisions/details revolving each component/stack. 

## AWS Elasticsearch
[add photo for kibana console queries]
- main index for all data 2214 data points: collection_of_restaurants
- Kibana endpoint for testing (internally revealed) has login credentials that is differently set from aws IAM/secret key authentication

## API Protection: Reverse Proxy using nginx vs AWS API Gateway Interface
- We need a a user-facing proxy for API/endpoint protection. While exposing the db endpoint directly to frontend is convenient for api calls, doing so could open db to spams. 
- API gateway provides traffic burst protections, accessed in AWS IAM --> Search Services --> API Gateway --> Choose the respective gateway --> 

## TODO - General
- [x] requirement analysis, architecture planning for scalability
- [x] set up proj structure using npx/npm for client and server folders, helper functions 
- [x] set up branches (master=live, dev-reactjs-jsonbin, dev-jquery-aws-elasticsearch)
- [x] deploy v0.9.4 from master branch

## TODO - frontend 
### reactjs-jsonbin
- [x] frontend wireframe in terms of html elements 
- [x] implement reactjs search bar and native js REST API
- [ ] implement tab navigation/drawer reactjs
- [ ] implement reactjs datepicker and write found python data retrieval code for datepicker in js 
- [ ] css formatting reactjs (not a priority)
- [ ] create reactjs Collections page for one user
- [ ] implement jquery + plain js for search bar
- [ ] implement jquery/plain js datepicker

## TODO - backend
- [x] set up AWS ES instance
- [x] parse data into json bulk format (req of Elasticsearch dbs)
- [x] populate data into AWS ES instance (used Kibana console)
- [x] implement lambda function to interface betwn AWS gateway and Elastic Search
### AWS configs (additional explorations)
- [ ] peform unit test on lambda function using AWS Lambda Web Testing Interface
- [ ] fix annoying CORS issue on API gateway/lambda function
- [ ] create new branch from explore using aws-elasticsearch-connector (run on separate node instance as reactjs), express to facilitate communication between reactJS and aws es db access

- [x] LAST-RESORT BY 17/4/21 5PM: implement Firebase/jsonbin.io db with reactjs front end if AWS Full Stack doesn't work
