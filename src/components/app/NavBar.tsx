import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout as logoutFromFirebase } from "../../reducers/authSlice"
import { useTypedSelector } from "../../hooks/useTypedSelector";
interface NavbarProps {
  toggleMenu: (e: React.SyntheticEvent) => void;
}

export const getDateTime = (time: Date) => {
  const options = {
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  };
  const optionsArray = ["hour", "minute"]
  return new Intl.DateTimeFormat("ru-RU", { hour: 'numeric', minute: 'numeric', second: 'numeric', day: '2-digit', month: '2-digit' }).format(time)
};


const NavBar = (props: NavbarProps) => {
  const user = useTypedSelector((state) => state.auth.user)
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date>(new Date())
  const route = useHistory();
  const dropDownRef = useRef<HTMLAnchorElement>(null)
  let dropDown: M.Dropdown;
  useEffect(() => {
    if (dropDownRef?.current) {
      dropDown = M.Dropdown.init(dropDownRef.current)
    }
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000)
    return () => {
      if (dropDown) {
        dropDown.destroy();
      }
      clearInterval(timerId)
    }
  }, [])

  const logout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(logoutFromFirebase())
    route.push("/login?message=logout")
  }
  return (
    <nav className="navbar orange lighten-1">
      <div className="nav-wrapper">
        <div className="navbar-left">
          <a href="#" onClick={props.toggleMenu}>
            <i className="material-icons black-text">dehaze</i>
          </a>
          <span className="black-text">{getDateTime(date)}</span>
        </div>

        <ul className="right hide-on-small-and-down">
          <li>
            <a ref={dropDownRef} className="dropdown-trigger black-text" href="#" data-target="dropdown">
              {user?.name}
              <i className="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' className='dropdown-content'>
              <li>
                <Link to="/profile" className="black-text">
                  <i className="material-icons">account_circle</i>Профиль
            </Link>
              </li>
              <li className="divider" tabIndex={-1}></li>
              <li>
                <a href="#" className="black-text" onClick={logout}>
                  <i className="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>

          </li>
        </ul>
      </div>
    </nav>

  )
}

export default NavBar;