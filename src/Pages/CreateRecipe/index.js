import React, { useState, useEffect } from "react";
import "../../scss/Pages/CreateRecipe/index.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CreatUpdateRecipe from "../../Components/createUpdateRecipe";

const CreateRecipe = () => {
  const [data, setData] = useState({
    title: "Pizza",
    description: "des",
    image_url:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/02/Chicken-Fajitas-7.jpg",
    publisher: "Umer",
    ingredients: [
      "rice",
      "water",
      "rice",
      "water",
      "rice",
      "water",
      "rice",
      "water",
    ],
  });
  const [ingredientName, setIngredientName] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "ingredients")
      return setIngredientName(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = () => {
    console.log("kk");
    setData({ ...data, ingredients: [...data.ingredients, ingredientName] });
    setIngredientName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/", data)
      .then(({ data }) => {
        //   console.log("res", res.data);
        if (data.success) {
          setData({
            title: "",
            description: "",
            image_url: "",
            publisher: "",
            ingredients: ["rice", "water"],
          });
          toast.success(data.message);
        }
      })
      .catch((err) => {
        console.log("err", err.response.data);
        let error = err?.response?.data;

        toast.error(
          `Something went wrong ${
            !!error.error.message
              ? error.error.message
              : !!error.message
              ? error.message
              : ""
          }`
        );
      });
  };

  return (
    <div className="Create-Recipe">
      <h1 className="Create-Recipe__title"> Create Recipe </h1>

      <CreatUpdateRecipe
        handleSubmit={handleSubmit}
        data={data}
        handleChange={handleChange}
        handleAddIngredient={handleAddIngredient}
        ingredientName={ingredientName}
      />
    </div>
  );
};

export default CreateRecipe;
