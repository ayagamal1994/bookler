import "./Home.css";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchInput from "../../components/SearchInput/SearchInput";
import RecommendedCard from "../../components/RecommendedCard/RecommendedCard";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../network/interceptor/ApiUrl";

function Home() {
  const [recommendedHotels, setRecommendedHotels] = useState(null);
  const [bestOffers, setBestOffers] = useState(null);

  //fetch recommednded hotels data
  useEffect(() => {
    ApiUrl.get("/recommended_hotels").then((res) => {
      setRecommendedHotels(res.data);
      console.log(res.data);
    });
  }, []);

  //fetch best offers
  useEffect(() => {
    ApiUrl.get("/best_offer").then((res) => {
      setBestOffers(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <section className="home">
        <Header />
        <div className="container-fluid">
          <div className="d-flex justify-content-start gap-4">
            <SideBar />
            <div className="home-content">
              <SearchInput />

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

              <section className="offers mt-5">
                <h3>best offer</h3>

                <div className="row g-4">
                  {bestOffers &&
                    bestOffers.map((offer) => (
                      <div key={offer.id} className="col-12 col-md-4">
                        <div className="offer-item d-flex align-items-center gap-3 p-3">
                          <div className="offer-img">
                            <img
                              src={offer.image}
                              alt="offer"
                              className="img-fluid rounded"
                              style={{ maxWidth: "100px", height: "auto" }}
                            />
                          </div>
                          <div className="offer-details text-start">
                            <h5 className="mb-1">{offer.location}</h5>
                            <p className="mb-0">{offer.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
