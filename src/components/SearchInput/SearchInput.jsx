import "./SearchInput.css";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput() {
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("eg");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const countries = [
        { label: "United States", value: "US" },
        { label: "Morocco", value: "MA" },
        { label: "Egypt", value: "EG" },
        { label: "Greece", value: "GR" },
    ];


    

    const handleClear = () => {
        setSearch("");
        setCountry("eg");
        setDate("");
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (search) params.append("q", search);
        if (country) params.append("country", country);
        navigate(`/hotelssearch?${params.toString()}`);
    }


  return (
    <>
        <section className="search">
            <form className="d-flex align-items-center gap-2">
                <div className="search-item d-flex flex-column">
                    <label htmlFor="search">search</label>
                    <input type="text"  id="search" value={search} placeholder="Hotel Name" onChange={(e) => setSearch(e.target.value)}></input>
                </div>
                <div className="search-item d-flex flex-column">
                    <label htmlFor="country">country</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="">All Countries</option>
                        {countries.map((c) => (
                        <option key={c.value} value={c.value}>
                            {c.label}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="search-item d-flex flex-column">
                    <label htmlFor="date">chick-in</label>
                    <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div onClick={handleClear}>
                    <Button className="clear" title="clear filters" />
                </div>
                <div onClick={handleSearch}>
                    <Button className="search-button" title="search" />
                </div>
                
            </form>
        </section>
    </>
  )
}

export default SearchInput