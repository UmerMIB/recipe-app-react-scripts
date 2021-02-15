import React from "react";
import Button from "../Components/Buttons";
import "../scss/Components/Form.scss";

const Form = ({ getRecipe, ingredient, handleOnchange }) => (
  <form onSubmit={getRecipe} style={{ marginBottom: "2rem" }}>
    <input
      className="Form__input"
      type="text"
      name="recipeName"
      value={ingredient}
      onChange={handleOnchange}
      placeholder="Type ingredient name"
    />
    <Button title="Search Recipe" type="submit" />
  </form>
);

export default Form;
