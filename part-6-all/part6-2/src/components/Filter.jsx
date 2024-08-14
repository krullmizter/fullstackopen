import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className="filter">
      <input
        onChange={handleChange}
        placeholder="Filter through the anecdotes..."
      />
    </div>
  );
};

export default Filter;
