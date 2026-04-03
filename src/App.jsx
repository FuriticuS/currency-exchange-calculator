import React, {useEffect, useState} from "react";
import "./index.css";

const API_URL = "https://api.frankfurter.app";

function App() {
  const [currency, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('AUD')
  const [toCurrency, setToCurrency] = useState('AUD')
  const [amount, setAmount] = useState('')
  const [convertedAmount, setConvertedAmount] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function currencyData()  {
      setLoading(true)
      try{
        const resp = await fetch(API_URL + '/latest')
        if(!resp.ok){
          throw new Error("Error fetching currency data.");
        }
        const data = await resp.json();

        setCurrency(Object.keys(data.rates));

      }catch(err){
        console.error(err);
      }finally{
        setLoading(false)
      }
    }

    currencyData()
  },[])

  async function convertCurrency() {
    if(!amount || fromCurrency === toCurrency){
      setError("Amount = 0 or the currency is the same");
      return
    }
    setLoading(true)
     try{
       const respCur = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
       if(!respCur){
         throw new Error("Error fetching currency data.");
       }

       const dataCur = await respCur.json();
       setError(null)
       setConvertedAmount(dataCur?.rates[toCurrency])
     }catch(err){
       console.error(err);
       setError(err)
     }finally{
       setLoading(false)
     }
  }

  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        <div className="input-group">
          <input type="number" placeholder="Amount" className="input-field" value={amount} onChange={(e)=> setAmount(e.target.value)}/>
          <select className="dropdown" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currency.map(cur => <option value={cur} key={cur}>{cur}</option>)}
          </select>
          <span className="arrow">→</span>
          <select className="dropdown" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currency.map(cur => <option value={cur} key={cur}>{cur}</option>)}
          </select>
        </div>
        <button className="convert-button" onClick={convertCurrency}>Convert</button>

        {loading && <p className="loading">Converting...</p>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && convertedAmount && <p className="result">{amount} {`${fromCurrency} ${toCurrency}`} = {convertedAmount.toFixed(2)}</p>}
      </div>
    </div>
  );
}

export default App;
