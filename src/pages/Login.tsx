import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../features/counter/authSlice";
import EmptyLayout from "../layouts/EmptyLayout";
import { validateEmail, validatePassword } from "../utils";



const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      if (
        validateEmail(values.email) !== undefined ||
        validatePassword(values.password) !== undefined
      ) {
        alert('You need to type the real email')
        return
      }
      try {
        await dispatch(login({ email: values.email, password: values.password }))
        history.push("/")
      } catch (e) {
      }

    },
  });

  return (
    <EmptyLayout>
      <form className="card auth-card" onSubmit={formik.handleSubmit}>
        <div className="card-content">
          <span className="card-title">Домашняя бухгалтерия</span>
          <div className="input-field">
            <input
              onChange={formik.handleChange('email')}
              value={formik.values.email}
              id="email"
              type="text"
              className="validate"
            />
            <label htmlFor="email">Email</label>
            <small className="helper-text invalid">{validateEmail(formik.values.email)}</small>
          </div>
          <div className="input-field">
            <input
              onChange={formik.handleChange('password')}
              value={formik.values.password}
              id="password"
              type="password"
              className="validate"
            />
            <label htmlFor="password">Пароль</label>
            <small className="helper-text invalid">{validatePassword(formik.values.password)}</small>
          </div>
        </div>
        <div className="card-action">
          <div>
            <button
              className="btn waves-effect waves-light auth-submit"
              type="submit"
            >
              Войти
        <i className="material-icons right">send</i>
            </button>
          </div>

          <p className="center">
            Нет аккаунта?
           <Link to="/register">Зарегистрироваться</Link>
          </p>
        </div>
      </form>
    </EmptyLayout>
  )
}

export default Login;