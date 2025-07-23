import "./SearchInput.css";
import Button from "../Button/Button";
import { useState } from "react";
function SearchInput() {
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("eg");
    const [date, setDate] = useState("");

    const handleClear = () => {
        setSearch("");
        setCountry("eg");
        setDate("");
    };
  return (
    <>
        <section className="search">
            <form className="d-flex align-items-center gap-2">
                <div className="search-item d-flex flex-column">
                    <label htmlFor="search">search</label>
                    <input type="text"  id="search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                </div>
                <div className="search-item d-flex flex-column">
                    <label htmlFor="country">country</label>
                    <select id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="eg">Egypt</option>
                        <option value="us">United States</option>
                        <option value="gb">United Kingdom</option>
                        <option value="fr">France</option>
                        <option value="de">Germany</option>
                        <option value="sa">Saudi Arabia</option>
                        <option value="ae">United Arab Emirates</option>
                        <option value="jp">Japan</option>
                        <option value="br">Brazil</option>
                    </select>
                </div>

                <div className="search-item d-flex flex-column">
                    <label htmlFor="date">chick-in</label>
                    <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div onClick={handleClear}>
                    <Button className="clear" title="clear filters" />
                </div>
                <Button className="search-button" title="search" />
            </form>
        </section>
    </>
  )
}

export default SearchInput