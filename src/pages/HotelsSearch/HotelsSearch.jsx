import "./HotelsSearch.css";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchInput from "../../components/SearchInput/SearchInput";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../network/interceptor/ApiUrl";
import { useLocation } from "react-router-dom";
import notFound from "../../assets/images/not-found.png";

function HotelsSearch() {
  const [hotels, setHotels] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultValuesFromURL = {
    search: searchParams.get("q") || "",
    country: searchParams.get("country") || "",
    checkin: searchParams.get("checkin") || "",
    checkout: searchParams.get("checkout") || "",
  };
  useEffect(() => {
    ApiUrl.get("/hotels").then((res) => {
      setHotels(res.data);
      console.log(res.data);
    });
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const nameMatch = hotel.name.toLowerCase().includes(defaultValuesFromURL.search);
    const countryMatch = defaultValuesFromURL.country
      ? hotel.address.countryIsoCode === defaultValuesFromURL.country
      : true;
    return nameMatch && countryMatch;
  });

  return (
    <>
      <Header />
        <div className="container-fluid">
          <div className="d-flex justify-content-start gap-4">
          <SideBar />
          <section className="hotels-search">
          <SearchInput defaultValuesFromURL={defaultValuesFromURL}/>

          <div className="breadcrumb-section">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Hotels</li>
                <li
                  className="breadcrumb-item active hotels-number"
                  aria-current="page"
                >
                  total <span>{filteredHotels.length} result </span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="filtered-hotels">
            <div className="row g-4">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} checkin={defaultValuesFromURL.checkin} checkout={defaultValuesFromURL.checkout} />
                ))
              ) : (
                <div className="not-found d-flex flex-column align-items-center justify-content-center">
                  <img src={notFound} alt="not found" />
                  <p>No Result Found</p>
                </div>
              )}
            </div>
            </div>


            </section>
          </div>
        </div>
    </>
  );
}

export default HotelsSearch;
