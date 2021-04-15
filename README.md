# is-it-open-restaurants
Simple Web App to query Restaurant Opening Hours (from a given csv)

## Latest Notes
- Successfully parsed and populated AWS Elasticsearch(abbreviated ES, not ECMA) DB with Kibana Console
- Found working python code to retrieve list of restaurants from raw data given data. Must integrate with 
- Priortised Name Searching Speed so decided to use non-rel db over rel. Also corrobated w fact that Elasticsearch is industrial grade search eng/db. But number searching might be slow
- Probably have to reformat openingHours field in elasticsearch restaurants for future usage/ease of access by new, unplanned features 
- If API Gateway/Lambda Function is configured properly: Finetine Cloudwatch logs to throw exact 5xx/4xx error statuses. 

### The follow sections explain the technical decisions/details revolving each component/stack. 

## AWS Elasticsearch
- main index for all data 2214 data points: collection_of_restaurants
- Kibana endpoint for testing (internally revealled : 

## Reverse Proxy using nginx vs AWS API Gateway Interface
- We need a a user-facing proxy for API/endpoint protection. While exposing the db endpoint directly to frontend is convenient for api calls, doing so could open db to spams. API gateway provides traffic burst protections, accessed in AWS IAM --> Search Services --> API Gateway --> Choose the respective gateway --> 

## TODO - General
- [x] requirement analysis, architecture planning for scalability
- [ ] set up proj structure using npx/npm for client and server folders, helper functions 
- [ ] set up branches (master=live, dev-reactjs, dev-express, dev-jquery)

## TODO - frontend 
- [ ] frontend wireframe in terms of html elements 
- [ ] implement jquery + plain js implementation
- [ ] explore reactjs search bar and axios js REST API

## TODO - backend
- [x] set up AWS ES instance
- [x] parse data into json bulk format (req of Elasticsearch dbs)
- [x] populate data into AWS ES instance (used Kibana console)
- [ ] implement lambda function to interface betwn AWS gateway and Elastic Searcj
- [ ] peform unit test lambda function using AWS Lambda Web Testing Interface
- [ ] fix annoying CORS issue on API gateway/lambda function
- [ ] explore using aws-elasticsearch-connector (run on separate node instance as reactjs), express to facilitate communication between reactJS and aws es db access
- [ ] LAST-RESORT BY 16/4/21 10PM: implement Firebase db with reactjs front end (easy)
