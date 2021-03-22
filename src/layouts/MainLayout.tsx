import React, { ReactNode, useState } from "react";
import { Switch, Route, Link } from "react-router-dom"
import NavBar from "../components/app/NavBar";
import SideBar from "../components/app/SideBar";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
 
  const [isOpen, setOpen] = useState<boolean>(true);
  const toggleMenu = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpen((prev) => !prev)
  }
  return (
    <div className="app-main-layout">
      <NavBar toggleMenu={toggleMenu} />
      <SideBar isOpen={isOpen} />

      <div className={`app-content ${!isOpen ? "full" : ""}`}>
        <div className="app-page">
          {props.children}
        </div>
      </div>

      <div className="fixed-action-btn">
        <Link className="btn-floating btn-large blue" to={"/record"}>
          <i className="large material-icons">add</i>
        </Link>
      </div>

    </div>
  )
}

export default MainLayout;