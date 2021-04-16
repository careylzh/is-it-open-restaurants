var awsAPIGatewayEndpoint = ' https://wmx2c9zj6e.execute-api.us-east-2.amazonaws.com/search-es-api-test';
var loadingdiv = $('#loading');
var noresults = $('#noresults');
var resultdiv = $('#results');
var searchbox = $('input#search');
var timer = 0;

// Executes the search function 250 milliseconds after user stops typing
searchbox.keyup(function () {
  clearTimeout(timer);
  timer = setTimeout(search, 250);
});

async function search() {
  // Clear results before searching
  noresults.hide();
  resultdiv.empty();
  loadingdiv.show();
  // Get the query from the user
  let query = searchbox.val();
  // Only run a query if the string contains at least three characters
  if (query.length > 2) {
    // Make the HTTP request with the query as a parameter and wait for the JSON results
    let response = await $.get(awsAPIGatewayEndpoint, { q: query, size: 25 }, 'json');
    // Get the part of the JSON response that we care about
    let results = response['hits']['hits'];
    if (results.length > 0) {
      loadingdiv.hide();
      // Iterate through the results and write them to HTML
      resultdiv.append('<p>Found ' + results.length + ' results.</p>');
      for (var item in results) {
        let image = results[item]._source.restaurantName;
        let title = results[item]._source.openingHours;
        // Construct the full HTML string that we want to append to the div
        resultdiv.append('<div class="result">' +
        '<div><h2>'+ restaurantName + '</h2><h3>' + openingHours + '</h3></div>');
      }
    } else {
      noresults.show();
    }
  }
  loadingdiv.hide();
}