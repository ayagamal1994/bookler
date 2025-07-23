import "./SideBar.css";
import logo from "../../assets/images/Brand-Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faAddressBook, faEarthEurope, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


function SideBar() {
  return (
    <>
        <aside className="aside">
            <div className="logo-icon d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faBars}/>
                </div>
            </div>

            <div className="links d-flex flex-column gap-2">
                <NavLink to="/"><FontAwesomeIcon icon={faHome}/> home</NavLink>
                <NavLink to="/"><FontAwesomeIcon icon={faAddressBook}/> my bookings</NavLink>
                <NavLink to="/"><FontAwesomeIcon icon={faEarthEurope}/> explore</NavLink>
                <NavLink to="/"><FontAwesomeIcon icon={faCircleQuestion}/> support</NavLink>
            </div>

            <div className="aside-background">
                
            </div>
        </aside>
    </>
  )
}

export default SideBar