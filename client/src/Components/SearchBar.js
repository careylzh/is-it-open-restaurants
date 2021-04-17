
import React from 'react';

//keyWord is assign to input value 
//setKeyword is assigned as function to handle change in input.
//what does SearcBar take in {}? a prop object?
const SearchBar = ({input:keyword, onChange:setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Search and Makan"}
     onChange={(e) => setKeyword(e.target.value)} //e is wtv that was passed into this "change function" upon input change
    />
  );
}

export default SearchBar