import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { ICategory } from "../../reducers/categorySlice";


const CategoryEdit = (props: { categories: Array<ICategory> }) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      limit: ""
    },
    onSubmit: async (values) => {

    },
  });

  return (
    <div className="col s12 m6">
      <div>
        <div className="page-subtitle">
          <h4>Редактировать</h4>
        </div>

        <form onSubmit={formik.handleSubmit} >
          <div className="input-field">
            <select value={formik.values.id} onChange={formik.handleChange("category")}>
              <option>Category</option>
            </select>
            <label>Выберите категорию</label>
          </div>

          <div className="input-field">
            <input type="text" id="name" value={formik.values.title} onChange={formik.handleChange("name")} />
            <label htmlFor="name">Название</label>
            <span className="helper-text invalid">TITLE</span>
          </div>

          <div className="input-field">
            <input id="limit" type="number" value={formik.values.limit} onChange={formik.handleChange("limit")} />
            <label htmlFor="limit">Лимит</label>
            <span className="helper-text invalid">LIMIT</span>
          </div>

          <button className="btn waves-effect waves-light" type="submit">
            Обновить
                        <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>

  )
}

export default CategoryEdit;