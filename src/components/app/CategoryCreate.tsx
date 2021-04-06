import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../reducers/authSlice";
import { createCategory } from "../../reducers/categorySlice";


const CategoryCreate = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      limit: 1
    },
    onSubmit: async (values) => {
      if (!values.title.length) {
        return
      }
      // dispatch(createCategory(values))
      values.title = ""
      values.limit = 1
      dispatch(setMessage("Категория была создана"))
    },
  });
  return (
    <div className="col s12 m6">
      <div>
        <div className="page-subtitle">
          <h4>Создать</h4>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="input-field">
            <input id="name" type="text" value={formik.values.title} onChange={formik.handleChange("title")} />
            <label htmlFor="name">Название</label>
            <span className="helper-text invalid">Введите название</span>
          </div>

          <div className="input-field">
            <input id="limit" type="number" value={formik.values.limit} onChange={formik.handleChange("limit")} />
            <label htmlFor="limit">Лимит</label>
            <span className="helper-text invalid">Минимальная величина</span>
          </div>

          <button className="btn waves-effect waves-light" type="submit">
            Создать
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>

  )
}

export default CategoryCreate;