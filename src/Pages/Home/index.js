import React, { useEffect, useState } from "react";
// import { recipes as dummyData } from '../../dummyData';
import Form from "../../Components/Form";
import Recipes from "./Recipes";
import axios from "axios";
import "../../scss/Pages/Home/index.scss";
import { toast } from "react-toastify";

export default function App() {
  const [recipes, setRecipies] = useState([]);

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
        toast.error(`Error occured ${err.response.data.message}`);
        console.log(err.response.data);
      });
  }, []);

  const getRecipe = () => {};

  const handleRecipe = (recipe, deleteRecipe) => {
    if (deleteRecipe) {
      const recipeIndex = recipes.findIndex((item) => item._id === recipe._id);
      console.log("recipeIndex", recipeIndex);
      setRecipies((previousData) => {
        let preData = [...previousData];
        preData.splice(recipeIndex, 1);
        return preData;
      });
    }
  };

  return (
    <div className="RecipeSearch">
      <Form getRecipe={getRecipe} />
      <Recipes recipes={recipes} handleRecipe={handleRecipe} />
    </div>
  );
}
