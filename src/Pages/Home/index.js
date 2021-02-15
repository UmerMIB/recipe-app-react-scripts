import React, { useEffect, useState } from "react";
import Form from "../../Components/Form";
import Recipes from "./Recipes";
import axios from "axios";
import "../../scss/Pages/Home/index.scss";
import { toast } from "react-toastify";

export default function App() {
  const [recipes, setRecipies] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [temp, setTemp] = useState("");

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        console.log("res", res.data);
        if (res.data.success) {
          setRecipies(res.data.data);
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
        setRecipies([]);
      });
  }, []);

  const handleOnchange = (e) => setIngredient(e.target.value);

  const getRecipe = (e) => {
    e.preventDefault();
    axios
      .get("api/search", {
        params: {
          ingredient: ingredient,
        },
      })
      .then((res) => {
        setRecipies(res.data.data);
        setTemp(Date.now());
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
        setRecipies([]);
      });
  };

  const handleDeleteRecipe = (recipe) => {
    setRecipies((previousData) => {
      let preData = previousData.filter((item) => item._id !== recipe._id);
      return preData;
    });
  };

  return (
    <div className="RecipeSearch">
      <Form
        getRecipe={getRecipe}
        handleOnchange={handleOnchange}
        ingredient={ingredient}
      />
      <Recipes
        recipes={recipes}
        handleDeleteRecipe={handleDeleteRecipe}
        temp={temp}
      />
    </div>
  );
}
