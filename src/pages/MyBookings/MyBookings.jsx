import { useSelector } from "react-redux";
import "./MyBookings.css";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchInput from "../../components/SearchInput/SearchInput";
import Button from "../../components/Button/Button";
// import { useLocation } from "react-router-dom";

function MyBookings() {
  const myBooking = useSelector((state) => state.booking.bookingData);
  const user = useSelector((state) => state.user.currentUser);

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);

  // const checkin = searchParams.get("checkin");
  // const checkout = searchParams.get("checkout");

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="d-flex justify-content-start gap-4">
          <SideBar />
          <section className="myBooking">
            <SearchInput />
            <div className="d-flex justify-content-between gap-2">
              <div className="booking-hotels">
            {myBooking && myBooking.length > 0 ? (
              myBooking.map((hotel) => (
                <div
                  key={hotel.id}
                  className="hotel-card d-flex justify-content-between align-items-stretch"
                >
                  <div className="hotel-img">
                    <img src={hotel.images.main} alt={hotel.name} />
                  </div>
                  <div className="hotel-details">
                    <div className="rate d-flex align-items-center">
                      {hotel.rating.score}
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <h3>{hotel.name}</h3>
                    <p className="location">
                      {hotel.address.street}, {hotel.address.city}
                    </p>
                    <div className="amenities d-flex gap-2 flex-wrap my-2">
                      {hotel.amenities.map((am) => (
                        <span key={am}>{am}</span>
                      ))}
                    </div>
                    <div className="price-buttons d-flex align-items-center justify-content-between mt-3">
                      <div className="price d-flex gap-2 align-items-center">
                        <p className="discount">{hotel.pricing[0].discount}</p>
                        <p className="actual-price">
                          ${hotel.pricing[0].discountedPrice}
                        </p>
                      </div>
                      <div className="check d-flex gap-2">
                        <p>from: {hotel.checkin}</p>
                        <p>to: {hotel.checkout}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>no booking found</p>
            )}
            </div>
            <div className="profile d-flex flex-column align-items-center">
              <h3>profile</h3>
              <FontAwesomeIcon icon={faUser}/>
              <h4>{user.email}</h4>
              <p>personal account</p>
              <Button title="edit profile"/>
            </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default MyBookings;
