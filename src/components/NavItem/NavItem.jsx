import "./NavItem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function NavItem({icon, title}) {
  return (
    <>
        <div className="nav-item d-flex flex-column justify-content-center align-items-center">
            <FontAwesomeIcon icon={icon}/>
            <p className="title">{title}</p>
        </div>
    </>
  )
}

export default NavItem