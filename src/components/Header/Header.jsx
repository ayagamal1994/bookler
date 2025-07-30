import "./Header.css";
import NavItem from "../NavItem/NavItem";
import { faBed, faHouse, faTaxi, faPlaneDeparture, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logOut } from "../../store/UserSlice";

function Header() {
  const navigate = useNavigate();
  const currentUser = useSelector((state)=>state.user.currentUser);
  const dispatch = useDispatch()

    useEffect(() => {
    if (currentUser) {
      console.log('User logged in:', currentUser);
    } else {
      console.log('User logged out');
    }
  }, [currentUser, navigate]);

  return (
    <>
        <header className="header">
          {currentUser === null? (
            <div className="login-sign d-flex gap-3">
              <Link to="/login">login</Link>
              <Link to ="/signup">sign up</Link>
            </div>
          ):
          (
            <div className="user-dropdown">
              <button
                className="btn d-flex align-items-center gap-2 rounded-pill px-3 py-2 text-white"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: "#253659" }}
              >
                <FontAwesomeIcon icon={faUser}/>
                <p className="user-name">{currentUser.email}</p>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{ backgroundColor: "#253659"}}>
                <li>
                  <button className="dropdown-item" onClick={() => dispatch(logOut())}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div className="nav-items d-flex align-items-center gap-5">
              <NavItem icon={faBed} title="hotel"/>
              <NavItem icon={faHouse} title="villa"/>
              <NavItem icon={faTaxi} title="taxi"/>
              <NavItem icon={faPlaneDeparture} title="flights"/>
          </div>
        </header>
    </>
  )
}

export default Header