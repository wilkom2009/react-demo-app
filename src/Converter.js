import React, { useState, useEffect } from "react";
import converter from "./Converter.css";
import axios from "axios";

export default function Converter() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState("");

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "http://api.openrates.io/latest";

  useEffect(() => {
    axios
      .get(proxyurl + url)
      .then((response) => {
        const currencyAr = ["EUR"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        setCurrencies(currencyAr);
        //this.setState({ currencies: currencyAr });
      })
      .catch((err) => {
        console.log("oppps", err);
      });
  }, []);

  const selectHandler = (event) => {
    if (event.target.name === "from") {
      setFromCurrency(event.target.value);
      //this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        setToCurrency(event.target.value);
        //this.setState({ toCurrency: event.target.value });
      }
    }
  };

  const convertHandler = () => {
    if (fromCurrency !== toCurrency) {
      axios
        .get(proxyurl + url + `?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((response) => {
          const res = amount * response.data.rates[toCurrency];
          setResult(res.toFixed(5));
          //this.setState({ result: result.toFixed(5) });
        })
        .catch((error) => {
          console.log("Opps", error.message);
        });
    } else {
      setResult("You cant convert the same currency!");
      //this.setState({ result: "You cant convert the same currency!" });
    }
  };

  return (
    <div className="converter">
      <h2>
        <span>Currency</span>Converter
        <span role="img" aria-label="money">
          &#x1f4b5;
        </span>
      </h2>
      <div className="From">
        <input
          name="amount"
          type="text"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <select
          name="from"
          onChange={(event) => selectHandler(event)}
          value={fromCurrency}
        >
          {currencies.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>
        <select
          name="to"
          onChange={(event) => selectHandler(event)}
          value={toCurrency}
        >
          {currencies.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>
        <button onClick={convertHandler}>Convert</button>
        {result && <h3>{result}</h3>}
      </div>
    </div>
  );
}
