import React from "react";

const Form = ({ value1, value2, onChange1, onChange2, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <Input label="name:" value={value1} onChange={onChange1} />
    <Input label="number:" value={value2} onChange={onChange2} />
    <Button type="submit" text="add" />
  </form>
);

const Input = ({ label, value, onChange }) => (
  <div>
    {label} <input value={value} onChange={onChange} />
  </div>
);

const Button = ({ type, text, onClick }) => (
  <button type={type} onClick={onClick}>
    {" "}
    {text}{" "}
  </button>
);

export { Form, Input, Button };
