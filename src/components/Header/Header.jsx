import "./Header.css";
import NavItem from "../NavItem/NavItem";
import { faBed, faHouse, faTaxi, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
function Header() {
  return (
    <>
        <header className="header"> 
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