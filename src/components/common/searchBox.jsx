import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      name="search"
      value={value}
      className="form-control my-3"
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
