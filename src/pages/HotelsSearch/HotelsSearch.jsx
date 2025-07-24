import "./HotelsSearch.css"
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchInput from  "../../components/SearchInput/SearchInput";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../network/interceptor/ApiUrl";
import { useSearchParams } from "react-router-dom";
import notFound from "../../assets/images/not-found.png"

function HotelsSearch() {

    const [searchParams] = useSearchParams();
    const [hotels, setHotels] = useState([]);
    const search = searchParams.get("q") || "";
    const country = searchParams.get("country") || "";

    useEffect(()=>{
        ApiUrl.get("/hotels").then((res)=>{
          setHotels(res.data);
          console.log(res.data)})
    },[])

    const filteredHotels = hotels.filter((hotel) => {
    const nameMatch = hotel.name.toLowerCase().includes(search);
    const countryMatch = country ? hotel.address.countryIsoCode === country : true;
    return nameMatch && countryMatch;
  });

  return (
    <>
      <Header />
      <SideBar />

      <section className="hotels-search">
        <SearchInput />

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
            {filteredHotels.length>0?
            filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            )): 
            <div className="not-found d-flex flex-column align-items-center justify-content-center">
                <img src={notFound} alt="not found"/>
                <p>No Result Found</p>
            </div>
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default HotelsSearch