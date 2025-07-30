import { useEffect, useState } from "react";
import "./HotelDetails.css";
import RecommendedCard from "../../components/RecommendedCard/RecommendedCard";
import { ApiUrl } from "../../network/interceptor/ApiUrl";
import { Link, useParams } from "react-router-dom";
import {
  faLocationDot,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchInput from "../../components/SearchInput/SearchInput";

function HotelDetails() {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [recommendedHotels, setRecommendedHotels] = useState(null);

  //fetch recommednded hotels data
  useEffect(() => {
    ApiUrl.get("/recommended_hotels").then((res) => {
      setRecommendedHotels(res.data);
      console.log(res.data);
    });
  }, []);

  const changeImage = (index) => {
    setCurrentIndex(index);
  };

  const nextImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % hotel.images.gallery.length
    );
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + hotel.images.gallery.length) %
        hotel.images.gallery.length
    );
  };

  useEffect(() => {
    ApiUrl.get(`/hotels/${id}`).then((res) => {
      setHotel(res.data);
      console.log(res.data);
    });
  }, [id]);

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="d-flex justify-content-start gap-4">
          <SideBar />
          <section className="hotel-details">
            <SearchInput />
            {hotel && (
              <div className="hotel-details-container d-flex align-items-stretch justify-content-between mt-5">
                <div className="hotel-carousel">
                  <div className="carousel-main position-relative mb-4">
                    <img
                      key={hotel.images.gallery[currentIndex]}
                      src={hotel.images.gallery[currentIndex]}
                      alt="Main"
                      className="carousel-main-img img-fluid rounded shadow"
                    />

                    <button className="carousel-btn prev" onClick={prevImage}>
                      <span className="carousel-control-prev-icon" />
                    </button>

                    <button className="carousel-btn next" onClick={nextImage}>
                      <span className="carousel-control-next-icon" />
                    </button>
                  </div>

                  <div className="carousel-thumbnails d-flex justify-content-center flex-wrap">
                    {hotel.images.gallery.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`thumb-${index}`}
                        onClick={() => changeImage(index)}
                        className={`carousel-thumb ${
                          currentIndex === index ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="hotel-details-info">
                  <div className="review-price d-flex justify-content-between align-items-center">
                    <div className="review">
                      <h4>hotel review</h4>
                      <div className="d-flex align-items-center gap-2">
                        <p className="score">
                          {hotel.rating.score} <FontAwesomeIcon icon={faStar} />
                        </p>
                        <div>
                          <p className="status">{hotel.rating.status}</p>
                          <p className="count">
                            {hotel.rating.reviewCount} reviews
                          </p>
                        </div>
                        <div className="stars d-flex align-items-center">
                          <div className="filled-stars">
                            {[...Array(Math.floor(hotel.rating.score))].map(
                              (_, i) => (
                                <FontAwesomeIcon key={i} icon={faStar} />
                              )
                            )}
                          </div>
                          {hotel.rating.score -
                            Math.floor(hotel.rating.score !== 0) && (
                            <FontAwesomeIcon icon={faStarHalf} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <p className="discount">{hotel.pricing[0].discount}</p>
                      <div className="d-flex align-items-end">
                        <p className="c-price">
                          {hotel.pricing[0].originalPrice}
                        </p>
                        <p className="currency">{hotel.pricing[0].currency}</p>
                      </div>
                      <p className="unit">{hotel.pricing[0].priceUnit}</p>
                    </div>
                  </div>
                  <div className="about">
                    <h4>about</h4>
                    <p>{hotel.description}</p>
                  </div>
                  <p className="location">
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    {hotel.address.street}, {hotel.address.city},{" "}
                    {hotel.address.country}
                  </p>
                  <div className="services">
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        {hotel.amenities.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link to="" className="pay">
                    pay now
                  </Link>
                </div>
              </div>
            )}

            <section className="recommended-hotels">
              <h3>recommended hotels</h3>
              <div className="carousel-container d-flex overflow-auto">
                {recommendedHotels &&
                  recommendedHotels.map((hotel) => (
                    <div key={hotel.id} className="card-wrapper">
                      <RecommendedCard hotel={hotel} />
                    </div>
                  ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default HotelDetails;
