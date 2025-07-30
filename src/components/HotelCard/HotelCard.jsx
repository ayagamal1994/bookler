import "./HotelCard.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function HotelCard({hotel, checkin, checkout}) {
  return (
    <>
        <div className="col-12 col-lg-6 d-flex">
            <div className="hotel-card d-flex justify-content-between align-items-stretch">
            <div className="hotel-img">
                <img src={hotel.images.main} alt={hotel.name}/>
            </div>
            <div className="hotel-details">
                <div className="rate d-flex align-items-center">
                    {hotel.rating.score}
                    <FontAwesomeIcon icon={faStar}/>
                </div>
                <h3>{hotel.name}</h3>
                <p className="location">{hotel.address.street}, {hotel.address.city}</p>
                <div className="amenities d-flex gap-2 flex-wrap my-2">
                    {hotel.amenities.map((am)=>(
                        <span key={am}>{am}</span>
                    ))}
                </div>
                <div className="price-buttons d-flex align-items-center justify-content-between mt-3">
                    <div className="price d-flex gap-2 align-items-center">
                        <p className="discount">{hotel.pricing[0].discount}</p>
                        <p className="actual-price">${hotel.pricing[0].discountedPrice}</p>
                    </div>
                    <div className="buttons d-flex gap-2">
                        <Link to={`/hotelssearch/${hotel.id}`} className="view">view more</Link>
                        <Link to={`/booking/${hotel.id}?checkin=${checkin}&checkout=${checkout}`} className="book">book now</Link>
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default HotelCard