import "./SearchInput.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function SearchInput({defaultValuesFromURL} ) {
  const navigate = useNavigate();

  const countries = [
    { label: "United States", value: "US" },
    { label: "Morocco", value: "MA" },
    { label: "Egypt", value: "EG" },
    { label: "Greece", value: "GR" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: defaultValuesFromURL?.search || "",
      country: defaultValuesFromURL?.country || "",
      checkin: defaultValuesFromURL?.checkin || "",
      checkout: defaultValuesFromURL?.checkout || "",
    },
  });

  const checkInValue = watch("checkin");

  const onSubmit = (data) => {
    const params = new URLSearchParams();
    if (data.search) params.append("q", data.search);
    if (data.country) params.append("country", data.country);
    if (data.checkin) params.append("checkin", data.checkin);
    if (data.checkout) params.append("checkout", data.checkout);
    navigate(`/hotelssearch?${params.toString()}`);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <section className="search">
      <form className="d-flex align-items-center justify-content-between gap-2 flex-wrap" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-item d-flex flex-column">
          <label htmlFor="search">search</label>
          <input
            id="search"
            type="text"
            placeholder="Hotel Name"
            {...register("search")}
          />
        </div>

        <div className="search-item d-flex flex-column">
          <label htmlFor="country">country</label>
          <select id="country" {...register("country")}>
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="search-item d-flex flex-column">
          <label htmlFor="checkin">check-in</label>
          <input
            id="checkin"
            type="date"
            {...register("checkin", { required: "Check-in is required" })}
          />
          {errors.checkin && <span style={{ color: "red" }}>{errors.checkin.message}</span>}
        </div>

        <div className="search-item d-flex flex-column">
          <label htmlFor="checkout">check-out</label>
          <input
            id="checkout"
            type="date"
            {...register("checkout", {
              required: "Check-out is required",
              validate: (value) =>
                !checkInValue || value > checkInValue || "Check-out must be after check-in",
            })}
            min={checkInValue || ""}
          />
          {errors.checkout && <span style={{ color: "red" }}>{errors.checkout.message}</span>}
        </div>

        <div onClick={handleClear}>
          <Button className="clear" title="clear filters" />
        </div>

        <div>
          <Button className="search-button" title="search" type="submit" />
        </div>
      </form>
    </section>
  );
}

export default SearchInput;
