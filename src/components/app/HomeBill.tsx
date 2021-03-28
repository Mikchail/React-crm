import React from "react";

interface HomeBillProps {
  rates: {
    USD: number;
    EUR: number;
    RUB: number;
  },
  base: number | null;
}

enum currencies {
  USD = "USD",
  EUR = "EUR",
  RUB = "RUB",
}
// const currenciesArray = ["USD", "EUR", "RUB"];
const HomeBill = (props: HomeBillProps) => {
  const getCurrency = (currency: currencies) => {
    console.log(props.base);
    const money = new Intl.NumberFormat("ru-Ru",{
      style: "currency",
      currency,
    }).format(Math.round(props.base! * props.rates[currency]))
    return money
  }
  const renderCurrency = () => {
    return Object.keys(props.rates).map((cur) =>
      <p className="currency-line"key={cur}>
        <span>{getCurrency(cur as currencies)}</span>
      </p>)
  }
  return (
    <div className="col s12 m6 l4">
      <div className="card light-blue bill-card">
        <div className="card-content white-text">
          <span className="card-title">Счет в валюте</span>
          {props.base && renderCurrency().reverse()}
        </div>
      </div>
    </div >
  )
}

export default HomeBill;