import React from "react";
import CategoryEdit from "../components/app/CategoryEdit";
import CategoryCreate from "../components/app/CategoryCreate";
import MainLayout from "../layouts/MainLayout";

const Categories = () => {
  return (
    <MainLayout>
      <div>
        <div className="page-title">
          <h3>Категории</h3>
        </div>
        <section>
          <div className="row">
            <CategoryEdit />
            <CategoryCreate />
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

export default Categories;