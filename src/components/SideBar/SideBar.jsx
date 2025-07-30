import "./SideBar.css";
import logo from "../../assets/images/Brand-Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faAddressBook, faEarthEurope, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from "react";


function SideBar() {
  const currentUser = useSelector((state)=>state.user.currentUser);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
        <aside className={`aside ${collapsed ? 'collapsed' : ''}`}>
            <div className="logo-icon d-flex justify-content-between align-items-center">
                {!collapsed && <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>}
                <div className="icon" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars}/>
                </div>
            </div>

            <div className="links d-flex flex-column gap-2">
                <NavLink to="/"><FontAwesomeIcon icon={faHome}/> {!collapsed && <span> home </span>}</NavLink>
                {currentUser && <NavLink to="/mybookings"><FontAwesomeIcon icon={faAddressBook}/> {!collapsed && <span> my bookings </span>} </NavLink>}
                <NavLink to="/"><FontAwesomeIcon icon={faEarthEurope}/> {!collapsed && <span> explore </span>} </NavLink>
                <NavLink to="/"><FontAwesomeIcon icon={faCircleQuestion}/> {!collapsed && <span> support </span>} </NavLink>
            </div>

            <div className="aside-background">
                {!currentUser && <NavLink className="align-self-end" to="/signup">sign up now</NavLink>}
            </div>
        </aside>
    </>
  )
}

export default SideBar