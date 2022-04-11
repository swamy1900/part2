import React from "react";

const Filter = ({ filter, onChange }) => (
  <>
    <label>filter shown with</label>
    <input value={filter} onChange={onChange} />
  </>
);

export default Filter;