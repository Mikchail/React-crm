import { useFormik } from "formik";
import React from "react";


const CategoryCreate = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            limit: ""
        },
        onSubmit: async (values) => {

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
                        <input id="name" type="text" value={formik.values.name} onChange={formik.handleChange("name")}/>
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