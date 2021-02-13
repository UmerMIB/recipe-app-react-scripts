import React from "react";
import Button from "../Components/Buttons";
import "../scss/Components/Form.scss";

const Form = ({ getRecipe }) => (
  <form onSubmit={getRecipe} style={{ marginBottom: "2rem" }}>
    <input className="Form__input" type="text" name="recipeName" />
    <Button title="Search Recipe" type="submit" />
  </form>
);

export default Form;
