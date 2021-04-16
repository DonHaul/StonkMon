const axios = require('axios');
const Papa = require('papaparse');


import Head from 'next/head'
import styles from '../styles/Home.module.css'



//var fs = require('fs');


// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

function GetStoccies()
{
  console.log("Stoccies");

  //var stoccies = 
  LS('Finance_Positions.csv').then(function(stoccies) {
    console.log("YOO")
    console.log(stoccies)
return [...new Set(stoccies)];
}).then(async(uniquestoccies) =>{
    
var promiseFinance = []
    
for  (var value of uniquestoccies) {
      // This replaces the deprecated snapshot() API

promiseFinance.push(    
yahooFinance.quote({
symbol: value,
modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
}).then((quote,err)=>{
 //console.log(quote)
 return quote;
}))
}
    
return Promise.all(promiseFinance)//.then((values) => { console.log(values);   return values;
}).then((allll)=>{

console.log('############################');
console.log('############################');
console.log(allll);
console.log('############################');
console.log('############################');
});
}

async function LS(filename)
{
    var stoccies = []
    
    var stream  = fs.createReadStream(filename)
  .pipe(csv())
  .on('data', (row) => {
    //console.log(row);
    //console.log(stoccies.Ticker);
    stoccies.push(row['Ticker'])
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
      
      
  });
 

    
     await new Promise(fulfill => stream.on("end", fulfill))

//console.log("Finish")
    //console.log(stoccies)
    //console.log("Finish2")
    return stoccies
}

function Form() {
  const registerUser = async event => {
    event.preventDefault()
    console.log(event)
    console.log(event.target.inputfile.value)
    console.log(event.target.name.value)
    console.log(event.target.inputfile.files)

    var file = event.target.inputfile.files[0];


    var results = await Papa.parse(event.target.inputfile.files[0], {

      header: true,
      complete: function(results) {

        console.log("$$$$$$$$$$$$$$$");
        console.log(results);

        var stoccies = []

        for (var arr of results.data)
        {
stoccies.push(arr.Ticker)
        }

        console.log("Single Stocks")
        console.log([...new Set(stoccies)]);
      },
      
    });


    var results = Papa.parse(file, {
      header: true
    });

    console.log(results);
   // var reader = new FileReader();

    //var results = Papa.parse(csvString, config);

    /*var results =""

    reader.onload = function(event) {
      // The file's text will be printed here
       results = Papa.parse(file, {
        header: true
      });

      console.log(results);
      console.log("Rezies");
    };


    reader.readAsText(file);*/

    console.log(results)
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