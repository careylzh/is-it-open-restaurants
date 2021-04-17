# is-it-open-restaurants
Simple Web App to query Restaurant Opening Hours (from a given csv) </br>
Task Requirements: https://gist.github.com/seahyc/d013a8f8f1c1be52513cf7b77cce6e81

## How to use this repo
This readme on master describes the general updates, TODOS for frontend/backend and updates that can't be quantified as code this repo(deployment settings, setting up of db/API gateway/lambda fns in aws). 

Keeping master branch as the latest working full stack deployment, so I pull-req from a dev branch to master once a version is complete. 

I started off designing my architecture as reactjs -> awsAPIgateway -> lambda function -> AWS Elasticsearch, but faced multiple issues including CORS and lambda fn deployment.
[UPDATE: AWS Stack now works too! see latest notes]

While my final deployment is simply reactjs on AWS Amplify --> jsonbin.io REST API --> jsonbin.io db, I can explain my initial architectural decisions of using Elasticsearch, API Gateway and serverless component of lambda function.

## What's Deployed and Where?
| Branch | Frontend  | Backend | Db |
| ------------- | ------------- | ------------- | ------------- |
| reactjs-jsonbinio | ReactJS on AWS Amplify:  https://main.d2rwu09ypt5g13.amplifyapp.com/ | - (didn't need express) | jsonbin.io |
| jquery-aws-elasticsearch | jquery(undeployed, new browser error in chrome console) | AWS API Gateway (success), lambda function (success). Update after Consult with AWS Technical Writer Liz Synder | AWS ElasticSearch (success) |

## Latest Notes

- ERR_NAME_NOT_RESOLVED surfaced because forgot to update new awsApiGatewayEndpoint (main one, not the specific ones for GET, POST etc)
- CORs issue fixed by deleting API Gateway and regenerating but checking the 5xx and 4xx tickboxes. Verified using http://client.cors-api.appspot.com/client
- master currently running based on branch dev-reactjs-jsonbin
```
git clone https://github.com/careylzh/is-it-open-restaurants.git
cd client
npm i
npm start
```
- simplified stack because found jsonbin.io, a JSON store which has several benefits:
  - auto-configs CORS-settings
  - simple UI for organising collections of documents
  - can add schema ltr if needed.
- AWS Amplify does snapshot testing on various mobile devices for you so no need ```npm test``` wew [add photo]
### dev-reactjs-jsonbin specific notes: 
- search by name and display openingHours done. 
- To add datepicker and integrate datepicking search algo in js (semantic versioning should be 0.9.7 now - when tabnav is complete(collections page) 0.9.8, 0.9.8 favouriting function, 0.9.9 when POST queries to json bin are done, 1.0.0 when passing date from datepicker UI to SearchBarResults component)
### Separate Adventures:
- Successfully parsed raw data and populated AWS Elasticsearch(abbreviated ES, not ECMA) DB with Kibana Console in required BULK format
- Priortised Name Searching Speed so decided to use non-rel db over rel. Also corrobated w fact that Elasticsearch is industrial grade search eng/db. But number searching might be slow
- Probably have to reformat openingHours field in elasticsearch restaurants for future usage/ease of access by new, unplanned features eg. new location tag in each json string
- If API Gateway/Lambda Function is configured properly: Finetune Cloudwatch logs to throw exact 5xx/4xx error statuses. 
- Paused development for dev-jquery-aws-elasticsearch stack due to unresolved CORS setting despite setting "Access-Control-Allow-Origin" to '*' on AWS API gateway

### The follow sections explain the initial technical decisions/progress revolving dev-jquery-aws-elasticsearch.
#### AWS Elasticsearch
[add photo for kibana console queries]
- main index for all data 2214 data points: collection_of_restaurants
- Kibana endpoint for testing (internally revealed) has login credentials that is differently set from aws IAM/secret key authentication

#### API Protection using AWS API Gateway Interface (probably similar to how nginx works?)
- We need a a user-facing proxy for API/endpoint protection. While exposing the db endpoint directly to frontend is convenient for api calls, doing so could open db to spams. 
- API gateway provides traffic burst protections, accessed in AWS IAM --> Search Services --> API Gateway --> Choose the respective gateway --> 
- [FIXED] Limited by CORS settings despite following resources and communicating with AWS Technical Writer SGT Apr 16 2021 9.30pm (CA 6.30am)
- systematically tested the following solutions:
  - https://stackoverflow.com/questions/55125633/why-do-i-get-a-cors-error-on-api-gateway-get-request-when-the-options-request-ha
  - https://stackoverflow.com/questions/35190615/api-gateway-cors-no-access-control-allow-origin-header
  - https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
  - https://github.com/vendia/serverless-express/issues/90
  - https://enable-cors.org/server_awsapigateway.html
  - https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
  - Final solution: Delete API Gateway, Enabled CORS and "checked 5xx and 4xx" (first row in CORS settings), deploy API Gateway, redeploy Lambdafunction trigger(you'll see your API Gateway dashboard updated after this)
 
#### AWS Lambda: the Serverless, event-triggered faciltator
-  component that facilitates communication between API Gateway
-  talks to elasticsearch API to return documents of a particular index
-  could either write separate lambda fns for separate API calls from reactjs/jquery. Lambda functions will form the backend like how express.js routes data from frontend to db, vice versa
- Lambda function deployed successfully
- How to update lambda fn:
  -  navigate to LambdaFunction folder
  -  ```pip install -t './' [new dependencies]```
  -  modify contents in the handler lambda_function.py
  https://docs.aws.amazon.com/lambda/latest/dg/lambda-python.html
- Can try using Serverless framework to deploy using CLI so no need keep uploading .zip of your LambdaFunction folder onto AWS console

## TODO - General
- [x] requirement analysis, architecture planning for scalability
- [x] set up proj structure using npx/npm for client and server folders, helper functions 
- [x] set up branches (master=live, dev-reactjs-jsonbin, dev-jquery-aws-elasticsearch)
- [x] deploy v0.9.4 from master branch
- [x] update deployment notes here w.r.t dev-jquery-aws-elasticsearch branch (alot of work) 

## TODO - frontend 
### reactjs-jsonbin
- [x] frontend wireframe in terms of html elements 
- [x] implement reactjs search bar and native js REST API
- [ ] implement tab navigation/drawer reactjs
- [ ] implement reactjs datepicker and write found python data retrieval code for datepicker in js 
- [ ] css formatting reactjs (not a priority)
- [ ] create reactjs Collections page for one user
- [x] implement jquery + plain js for search bar
- [ ] implement jquery/plain js datepicker

## TODO - backend
- [x] set up AWS ES instance
- [x] parse data into json bulk format (req of Elasticsearch dbs)
- [x] populate data into AWS ES instance (used Kibana console)
- [x] implement lambda function to interface betwn AWS gateway and Elastic Search
### AWS configs (additional explorations)
- [x] peform unit test on lambda function using AWS Lambda Web Testing Interface (used API Gateway Testing Interface instead
- [x] fix annoying CORS issue on API gateway/lambda function
- [ ] create new branch from explore using aws-elasticsearch-connector (run on separate node instance as reactjs), express to facilitate communication between reactJS and aws es db access

- [x] LAST-RESORT BY 17/4/21 5PM: implement Firebase/jsonbin.io db with reactjs front end if AWS Full Stack doesn't work
