import { useEffect } from 'react'

const axios = require('axios');


const SampleComponent = () => {
    useEffect(() => {
      // code to run on component mount
      console.log("YELLOW");


        // Make a request for a user with a given ID
axios.get('http://localhost:5000')
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});




    }, [])
  return (<div>foo</div>)
  }
 
export default SampleComponent;