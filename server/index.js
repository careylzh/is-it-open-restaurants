const express = require("express");
const app = express();
const port = 3000;

// aws-connector code


// connectors

//Routing 
app.get("/store_json", (req, res) => {
//want to get all the relevant documents
//  result = client.search{elastic search json string} 
//client.search is an abstracted method from npm package aws-elasticsearch-connector to access elasticsearch api directly
  res.send(result);
});


app.get("/home", (req, res) => {
  res.send(""); //see the data post to the actual endpoint above
});

// backend.com/blah
app.post("/home", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
