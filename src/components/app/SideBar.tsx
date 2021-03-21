import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const routers = [
  {
    title: "Счёт",
    to: "/"
  },
  {
    title: "История",
    to: "/history"
  },
  {
    title: "Планирование",
    to: "/planning"
  },
  {
    title: "Новая запись",
    to: "/record"
  },
  {
    title: "Категории",
    to: "/categories"
  }
]

interface SideBarProps {
  isOpen: boolean;
}

const SideBar = (props: SideBarProps) => {
  const routeParams = useRouteMatch();
  return (
    <ul className={`sidenav app-sidenav ${props.isOpen ? "open" : ""}`}>
      {routers.map((route) => (
        <li key={route.to } className={`${routeParams.path === route.to ? "active" : ""}`}>
          <Link to={route.to} className="waves-effect waves-orange pointer">{route.title}</Link>
        </li>
      ))}

    </ul>
  )
}

export default SideBar;