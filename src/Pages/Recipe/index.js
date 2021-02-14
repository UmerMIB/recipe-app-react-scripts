import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Buttons";
import "../../scss/Pages/Recipe/index.scss";
import CreatUpdateRecipe from "../../Components/createUpdateRecipe";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";

function RecipeDetail({ match }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMess, setErrMess] = useState(null);
  const [ingredientName, setIngredientName] = useState(null);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/id`, {
        params: {
          id: match?.params?.id,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setRecipeDetails(res.data.data);
          setData(res.data.data);
          setErrMess("");
        } else {
          if (res.data.error) {
            setErrMess(res.data.error.message);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        setErrMess(err.response.data.message);
      });
  }, []);

  const handleGoHome = () => {
    history.push("/");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    if (e.target.name === "ingredients")
      return setIngredientName(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = () => {
    setData({
      ...data,
      ingredients: [...data.ingredients, ingredientName],
    });
    setIngredientName("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/api/id", {
        id: match?.params?.id,
        ...data,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Recipe updated successfully");
          setRecipeDetails(data);
          handleOpen();
        } else toast.info(res.data.message);
      })
      .catch((err) => {
        // console.log("err", err.response);s
        let error = err?.response?.data?.error?.message;
        toast.error(`Error occured ${error}`);
      });
  };

  return (
    <div className="container Active-recipe">
      {!!recipeDetails && !loading ? (
        <div className="Active-recipe__main">
          <Dialog
            open={open}
            maxWidth={"sm"}
            onClose={handleOpen}
            fullWidth
            className="Active-recipe__update-recipe-dialog"
          >
            <CreatUpdateRecipe
              data={data}
              handleChange={handleChange}
              update
              handleSubmit={handleSubmit}
              handleAddIngredient={handleAddIngredient}
            />
          </Dialog>
          <div>
            <img
              className="Active-recipe__img"
              src={recipeDetails.image_url}
              alt={recipeDetails.title}
            />
          </div>
          <div>
            <h1 className="Active-recipe__title">{recipeDetails.title}</h1>
            <h5 className="Active-recipe__sub-heading">
              Publisher: <span>{recipeDetails.publisher}</span>
            </h5>
            <h5 className="Active-recipe__sub-heading">
              Description: <span>{recipeDetails.description}</span>
            </h5>
            <h5 className="Active-recipe__sub-heading">
              Ingredients:{" "}
              <span>
                {recipeDetails.ingredients.map((ingredient, index) =>
                  index > 0 ? `, ${ingredient}` : ingredient
                )}
              </span>
            </h5>
            <div>
              <Button
                title="Go Home"
                onClick={handleGoHome}
                className="Active-recipe__btn"
              />
              <Button
                title="Update"
                onClick={handleOpen}
                className="Active-recipe__btn"
              />
            </div>
          </div>
        </div>
      ) : (
        !loading && errMess && <div>{errMess}</div>
      )}
    </div>
  );
}

export default RecipeDetail;
