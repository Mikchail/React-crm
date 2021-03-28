import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import HomeBill from "../components/app/HomeBill";
import HomeCurrency from "../components/app/HomeCurrency";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchCurrency } from "../reducers/moneySlice";
import Loader from "../components/app/Loader";

const Home = () => {
  const { currency, loading } = useTypedSelector((state) => state.currency)
  const bill = useTypedSelector((state) => state.auth.user?.bill)
  const base = (bill: number) => {
    return bill / (currency.rates.RUB / currency.rates.EUR)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    refresh();
  }, [])
  console.log(currency);

  const refresh = () => {
    dispatch(fetchCurrency())
  }

  const renderCurrency = () => {
    if (loading) { 
      return <Loader />
    }
    const userBase = bill ? base(bill) : 0
    return (
      <>
        <HomeBill base={userBase} rates={currency.rates} />
        <HomeCurrency date={currency.date} rates={currency.rates} />
      </>
    )
  }

  return (
    <MainLayout>
      <div>
        <div className="page-title">
          <h3>Счет</h3>

          <button onClick={refresh} className="btn waves-effect waves-light btn-small">
            <i className="material-icons">refresh</i>
          </button>
        </div>

        <div className="row">
          {renderCurrency()}
        </div>
      </div>
    </MainLayout>
  )
}

export default Home;