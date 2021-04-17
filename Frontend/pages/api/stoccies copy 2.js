// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var Promise = require("bluebird");
var yahooFinance = Promise.promisifyAll(require('yahoo-finance'));

var fs = require('fs')
export default (req, res) => {
  console.log(req.body)


  var promiseFinance = []
        
  for  (var value of req.body.stonks) {
            // This replaces the deprecated snapshot() API
      let ticker = value;
  promiseFinance.push(    
   yahooFinance.quote ({
    symbol: value,
    modules: [ 'summaryDetail' ] // 'price',// see the docs for the full list
  }).then((quote,err)=>{
       //console.log(quote)
       console.log(ticker)
       return {[ticker]:quote};//https://stackoverflow.com/questions/10640159/key-for-javascript-dictionary-is-not-stored-as-value-but-as-variable-name
   }))
  }
          

  Promise.all(promiseFinance).then((values) => { //console.log(values);   
    
    res.status(200).json(values)

    //https://stackoverflow.com/questions/27538349/merge-multiple-objects-inside-the-same-array-into-one-object
    //object array merge Object.assign({}, ...arrObj)

    let obj = Object.assign({}, ...values)

    let data = JSON.stringify(obj);
    fs.writeFileSync('student-2.json', data);
    return values;

  
});
}
