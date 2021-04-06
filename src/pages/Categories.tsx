import React, { useEffect } from "react";
import CategoryEdit from "../components/app/CategoryEdit";
import CategoryCreate from "../components/app/CategoryCreate";
import MainLayout from "../layouts/MainLayout";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Categories = () => {
  const categories = useTypedSelector((state) => state.category.categories);
  console.log(categories);
  useEffect(() => {
    M.updateTextFields();
  }, [])
  return (
    <MainLayout>
      <div>
        <div className="page-title">
          <h3>Категории</h3>
        </div>
        <section>
          <div className="row">
            <CategoryCreate />
            <CategoryEdit categories={categories}/>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

export default Categories;