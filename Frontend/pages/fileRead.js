const axios = require('axios');
var Papa = require('papaparse');

//import quote from 'yahoo-finance';
//var yahooFinance = Promise.promisify();

Papa.parsePromise = function(file) {
  return new Promise(function(complete, error) {
    Papa.parse(file, {complete, error,header:true});
  });
};




function Form() {
  const registerUser = async event => {
    event.preventDefault()

    var file = event.target.inputfile.files[0];

    Papa.parsePromise(event.target.inputfile.files[0]).
  then(function(results) { console.log(results);
  
  
    var stoccies = []

    for (var arr of results.data)
    {
stoccies.push(arr.Ticker)
    }

    console.log("Single Stocks")
    console.log([...new Set(stoccies)]);

    return [...new Set(stoccies)]

  }).then(async (allll)=>{
    
    console.log('############################');
    console.log('############################');
    console.log(allll);
    console.log('############################');
    console.log('############################');

    var res = await fetch('/api/stoccies', {
      body: JSON.stringify({
        stonks: allll
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    var result = await res.json()

    console.log(result)
    });



    //console.log(results)
    console.log("##################3")

    

    const res = await fetch('/api/register', {
      body: JSON.stringify({
        name: event.target.name.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()

    console.log(result)
    // result.user => 'Ada Lovelace'
  }

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="name">Name</label>
      <input type="text"
       id="name" name="name"
       accept=".csv" value="yes" ></input>
      <input type="file"
       id="inputfile" name="inputfile"
       accept=".csv" ></input>
      <button type="submit">Register</button>
    </form>
  )
}

export default Form