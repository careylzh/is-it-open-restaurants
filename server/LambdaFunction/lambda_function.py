import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
region = 'us-east-2' # For example, us-west-1
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

host = 'search-is-it-open-42vyaovbnyu445fp2khgozjamu.us-east-2.es.amazonaws.com' # For example, search-mydomain-id.us-west-1.es.amazonaws.com
index = 'collection_of_shops'
url = 'https://' + host + '/' + index + '/_search'
# Lambda execution starts here
def lambda_handler(event, context):
    #print("queryStringParameter: ", json.dumps(event['queryStringParameter']))
    # Put the user query into the query DSL for more accurate search results.
    # Note that certain fields are boosted (^).
    query = {
        "size": 25,
        "query": {
            "multi_match": {
                "query": event['queryStringParameters']['q'], #value here is the user's input
                "fields": ["restaurantName"] #use fields parameter to search by json tags
            }
        }
    }
    
    # ES 6.x requires an explicit Content-Type header
    headers = { "Content-Type": "application/json" }

    # Make the signed HTTP request
    r = requests.get(url, auth=awsauth, headers=headers, data=json.dumps(query))

    # Create the response and add some extra content to support CORS
    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": '*'
        },
        "isBase64Encoded": False
    }

    # Add the search results to the response
    response['body'] = r.text
    return response
