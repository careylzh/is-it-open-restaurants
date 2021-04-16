import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResultsTable from './SearchResultsTable';

/* =========TLDR: How this page works=================
1. upon opening page, async fn fetchData is called and displays ALL datapoints as default before any input in search bar is detected
2. upon data change in SearchBar, async fn updateInput is called. 2 things happen:
   i. firstly, the nested method filter() compares json tag "restaurantName" of each datapoint with SearchBar input
   ii. setRestaurantList is called and updates restaurantList results
*/




const SearchPage = (props) => {

  //syntax: [somefield, setterForTheFieldBeforeThisFn] = an instance of useState(); //react-specific "state hook"
  const [input, setInput] = useState('');
  const [restaurantListDefault, setRestaurantListDefault] = useState();
  const [restaurantListResults, setRestaurantList] = useState();
  
  //fetches data for default display upon loading page
  //using native javascript fetch() instead of some jQuery xmlhttpreq(troublesome cuz must config CORS config on API gateway side)
  const fetchData = async () => {
    //sample endpoint: https://restcountries.eu/rest/v2/all. if used, rename all instances of "restaurantName" to "name" in proj
    return await fetch('https://api.jsonbin.io/b/6078f7ef5b165e19f6210dac') //endpoint with all json strings. depends on backend used. expect array of json strings
      .then(response => response.json())
      .then(data => {
         setRestaurantList(data); 
         setRestaurantListDefault(data);
         console.log(data);
       });}    

//retrieves input from SearchBar in "real-time" and filters by "restaurantName" tag in json string. 
//Good to ref structure of each datapoint in backend
  const updateInput = async (input) => {
    console.log("data displayed upon refresh:", restaurantListDefault);
    //in this arrow fn, restaurant is the parameter that takes the value of ??? TODO
     const filtered = restaurantListDefault.filter(restaurant => {
      return restaurant.restaurantName.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setRestaurantList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <h1>Is It Open?</h1>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <SearchResultsTable restaurantList={restaurantListResults}/>
    </>
   );
}

export default SearchPage