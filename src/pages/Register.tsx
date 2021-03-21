import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { register } from "../features/counter/authSlice";
import EmptyLayout from "../layouts/EmptyLayout";
import { validateEmail, validatePassword, validateName } from "../utils";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      checkbox: false
    },
    onSubmit: (values, test) => {
      console.log(test);
      test.setSubmitting(false)
      // handleSubmit();
      if (
        validateEmail(values.email) !== undefined ||
        validateName(values.name) !== undefined ||
        validatePassword(values.password) !== undefined
      ) {
        alert('You need to type the real email')
      }

      console.log(values);
      dispatch(register({ email: values.email, password: values.password, name: values.name }))
      // history.push("/")

    },
  });

  return (
    <EmptyLayout>
      <form className="card auth-card" onSubmit={formik.handleSubmit}>
        <div className="card-content">
          <span className="card-title">Домашняя бухгалтерия</span>
          <div className="input-field">
            <input
              id="email"
              type="text"
              onChange={formik.handleChange('email')}
              value={formik.values.email}
            />
            <label htmlFor="email">Email</label>
            <small className="helper-text invalid">{validateEmail(formik.values.email)}</small>
          </div>
          <div className="input-field">
            <input
              id="password"
              type="password"
              className="validate"
              onChange={formik.handleChange('password')}
              value={formik.values.password}
            />
            <label htmlFor="password">Пароль</label>
            <small className="helper-text invalid">{validatePassword(formik.values.password)}</small>
          </div>
          <div className="input-field">
            <input
              id="name"
              type="text"
              className="validate"
              onChange={formik.handleChange('name')}
              value={formik.values.name}
            />
            <label htmlFor="name">Имя</label>
            <small className="helper-text invalid">{validateName(formik.values.name)}</small>
          </div>
          <p>
            <label>
              <input type="checkbox" onChange={formik.handleChange('checked')} checked={formik.values.checkbox} />
              <span>С правилами согласен</span>
            </label>
          </p>
        </div>
        <div className="card-action">
          <div>
            <button
              className="btn waves-effect waves-light auth-submit"
              type="submit"
            >
              Зарегистрироваться
        <i className="material-icons right">send</i>
            </button>
          </div>

          <p className="center">
            Уже есть аккаунт?
            <Link to="/login">Войти!</Link>
          </p>
        </div>
      </form>
    </EmptyLayout>
  )
}

export default Register;