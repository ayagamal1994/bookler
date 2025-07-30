import "./RecommendedCard.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function RecommendedCard({hotel}) {
  return (
    <>
        <div className="recommended-item d-flex justify-content-between align-items-center gap-3" >
            <div className="rec-img">
                <img src={hotel.images.main} alt={hotel.id}/>
            </div>
            <div className="rec-details">
                <h5>hotel</h5>
                <h2>{hotel.name}</h2>
                <p>{hotel.address.street}, {hotel.address.country}</p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="rating d-flex align-items-center">
                        <div className="filled-stars">
                            {[...Array(Math.floor(hotel.rating.score))].map((_, i)=>(
                            <FontAwesomeIcon key={i} icon={faStar}/>
                            ))}
                        </div>
                        {hotel.rating.score - Math.floor(hotel.rating.score !== 0) && <FontAwesomeIcon icon={faStarHalf}/>}
                    </div>

                    <Link className="book" to={`/booking/${hotel.id}`}>book now</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default RecommendedCard