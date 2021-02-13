import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../Components/Buttons";
import "../../scss/Pages/Recipe/index.scss";

function RecipeDetail({ match }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMess, setErrMess] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/id`, {
        params: {
          id: match?.params?.id,
        },
      })
      .then((res) => {
        console.log("recipe", res.data);
        if (res.data.success) {
          setRecipeDetails(res.data.data);
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

  return (
    <div className="container Active-recipe">
      {!!recipeDetails && !loading ? (
        <div className="Active-recipe">
          <img
            className="Active-recipe__img"
            src={recipeDetails.image_url}
            alt={recipeDetails.title}
          />
          <h3 className="Active-recipe__title">{recipeDetails.title}</h3>
          <h4 className="Active-recipe__publisher">
            Publisher: <span>{recipeDetails.publisher}</span>
          </h4>

          <Button title="Go Home" onClick={handleGoHome} />
        </div>
      ) : (
        !loading && errMess && <div>{errMess}</div>
      )}
    </div>
  );
}

export default RecipeDetail;
