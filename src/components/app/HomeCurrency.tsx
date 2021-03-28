import React from "react";
interface HomeCurrencyProps {
  rates: {
    USD: number;
    EUR: number;
    RUB: number;
  },
  date: Date;
}

enum currencies {
  USD = "USD",
  EUR = "EUR",
  RUB = "RUB",
}

const HomeCurrency = (props: HomeCurrencyProps) => {
  // console.log(new Intl.DateTimeFormat("ru-RU").format(props.date)); // todo
  const renderCurrency = () => {
    return Object.keys(props.rates).map((cur) =>
      <tr key={cur}>
        <td>{cur}</td>
        <td>{props.rates[cur as currencies].toFixed(2)}</td>
        <td>{props.date}</td>
      </tr>)
  }
  return (
    <div className="col s12 m6 l8">
      <div className="card orange darken-3 bill-card">
        <div className="card-content white-text">
          <div className="card-header">
            <span className="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Валюта</th>
                <th>Курс</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {renderCurrency()}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default HomeCurrency;