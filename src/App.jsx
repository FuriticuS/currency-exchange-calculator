import React, {useEffect, useState} from "react";
import "./index.css";

// 3 - Получите значения выбранных валют из обоих select и запишите их в state fromCurrency и toCurrency.
// 4 - Создайте state для записи amount из input. Запишите данные из input в этот state.
// 5 - Создайте вторую асинхронную функцию для получения значения конвертации двух валют. Запишите результат конвертации в новый state - convertedAmount. Покажите результат в интерфейсе.
// 6 - Добавьте в обе функции блоки try/catch/finally. Создайте state для loading (true/false) и error ("Сообщение ошибки").
// 7 - Внедрите логику отображения загрузки и ошибок в интерфейсе.
// 8 - Добавьте проверку, чтобы amount был больше 0.

//https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

const API_URL = "https://api.frankfurter.app";

function App() {
  const [currency, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    async function currencyData()  {
      try{
        const resp = await fetch(API_URL + '/latest')
        if(!resp.ok){
          throw new Error("Error fetching currency data.");
        }
        const data = await resp.json();

        setCurrency(Object.keys(data.rates));

      }catch(err){
        console.error(err);
      }
    }

    currencyData()
  },[])

  console.log(fromCurrency,
  toCurrency,
  amount)
  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        <p className="error"></p>

        <div className="input-group">
          <input type="number" placeholder="Amount" className="input-field" onChange={(e)=> setAmount(e.target.value)}/>
          <select className="dropdown" onChange={(e) => setFromCurrency(e.target.value)}>
            {currency.map(cur => <option key={cur}>{cur}</option>)}
          </select>
          <span className="arrow">→</span>
          <select className="dropdown" onChange={(e) => setToCurrency(e.target.value)}>
            {currency.map(cur => <option key={cur}>{cur}</option>)}
          </select>
        </div>
        <button className="convert-button">Convert</button>
        <p className="loading">Converting...</p>

        <p className="result"></p>
      </div>
    </div>
  );
}

export default App;
