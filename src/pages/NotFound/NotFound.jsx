import "./NotFound.css";
import  notImage  from "../../assets/images/not-found.png";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchInput from "../../components/SearchInput/SearchInput";

function NotFound() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="d-flex justify-content-start gap-4">
          <SideBar />
          <div className=" w-100 ">
            <SearchInput />
            <div className="not-found d-flex flex-column justify-content-center align-items-center">
                <img src={notImage} alt="not found" />
                <h3>page not found</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
