import React from "react";
import { Input } from "./Form";

const Filter = ({ value, onChange }) => (
  <Input label="filter shown with:" value={value} onChange={onChange} />
);

export default Filter;
