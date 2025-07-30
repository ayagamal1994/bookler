import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import SideBar from "../../components/SideBar/SideBar";
import "./Booking.css";
import { useForm } from "react-hook-form";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ApiUrl } from "../../network/interceptor/ApiUrl";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


function Booking() {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  let nights = (new Date(checkout) - new Date(checkin))/(1000 * 60 * 60 * 24)

  useEffect(() => {
    ApiUrl.get(`/hotels/${id}`).then((res) => {
      setHotel(res.data);
      console.log(res.data);
    });
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="d-flex justify-content-start gap-4">
          <SideBar />
          <div className="booking">
            <SearchInput />
            <div className=" mt-5">
              <div className="row">
                {/* User Details Section */}
                <div className="booking-form col-lg-8">
                  <h4>Your Details</h4>
                  <p className="parag">
                    Whether you are in town for business or leisure, San
                    Francisco Marriott Marquis welcomes travelers to Northern
                    California with exceptional service, spacious
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                      <div className="col-md-2">
                        <label>Title</label>
                        <select className="form-select" {...register("title")}>
                          <option>Mr</option>
                          <option>Mrs</option>
                          <option>Miss</option>
                        </select>
                      </div>
                      <div className="col-md-5">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("firstName", { required: true })}
                        />
                        {errors.firstName && (
                          <small className="text-danger">
                            First name is required
                          </small>
                        )}
                      </div>
                      <div className="col-md-5">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("lastName", { required: true })}
                        />
                        {errors.lastName && (
                          <small className="text-danger">
                            Last name is required
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <small className="text-danger">Email is required</small>
                      )}
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label>Country</label>
                        <select
                          className="form-select"
                          {...register("country")}
                        >
                          <option>Egypt</option>
                          <option>United States</option>
                          <option>Morocco</option>
                          <option>Greece</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("mobile", { required: true })}
                        />
                        {errors.mobile && (
                          <small className="text-danger">
                            Mobile is required
                          </small>
                        )}
                      </div>
                    </div>

                    <hr />

                    <h5>Payment Details</h5>
                    <div className="mb-3">
                      <label>Card Number</label>
                      <div className="card-icons">
                        <input
                          type="text"
                          className="form-control"
                          {...register("cardNumber", { required: true })}
                        />
                        <div className="icons d-flex gap-2">
                          <FontAwesomeIcon icon={faCcVisa} />
                          <FontAwesomeIcon icon={faCcMastercard} />
                          <FontAwesomeIcon icon={faCcAmex} />
                          <FontAwesomeIcon icon={faCcDiscover} />
                        </div>
                      </div>

                      {errors.cardNumber && (
                        <small className="text-danger">
                          Card number is required
                        </small>
                      )}
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label>CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("cvv", { required: true })}
                        />
                        {errors.cvv && (
                          <small className="text-danger">CVV is required</small>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("expiry", { required: true })}
                        />
                        {errors.expiry && (
                          <small className="text-danger">
                            Expiry date is required
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label>Card Holder</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("cardHolder", { required: true })}
                      />
                      {errors.cardHolder && (
                        <small className="text-danger">
                          Card holder name is required
                        </small>
                      )}
                    </div>

                    <button type="submit" className="pay btn w-100">
                      PAY NOW
                    </button>
                  </form>
                </div>

                {/* Summary Section */}
                <div className="col-lg-4">
                  {hotel && (
                    <div className="card shadow-sm">
                      <img
                        src={hotel.images.main}
                        className="card-img-top"
                        alt="Hotel"
                      />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h3 className="card-title">{hotel.name}</h3>
                            <p className="location">
                              <FontAwesomeIcon icon={faLocationDot} />{" "}
                              {hotel.address.street}, {hotel.address.city},{" "}
                              {hotel.address.country}
                            </p>
                          </div>
                          <div className="price">
                            <p className="discount">
                              {hotel.pricing[0].discount}
                            </p>
                            <div className="d-flex align-items-end">
                              <p className="c-price">
                                {hotel.pricing[0].originalPrice}
                              </p>
                              <p className="currency">
                                {hotel.pricing[0].currency}
                              </p>
                            </div>
                            <p className="unit">{hotel.pricing[0].priceUnit}</p>
                          </div>
                        </div>

                        <hr />
                        <div className="d-flex justify-content-between">
                          <span>Check In</span>
                          <span>{checkin}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Check Out</span>
                          <span>{checkout}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span>Price Per Night</span>
                          <span>{hotel.pricing[0].originalPrice}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Nights</span>
                          <span>{nights}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold">
                          <span>Total Price</span>
                          <span>{hotel.pricing[0].originalPrice * nights}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
