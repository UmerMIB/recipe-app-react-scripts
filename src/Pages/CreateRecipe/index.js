import React, { useState, useEffect } from "react";
import "../../scss/Pages/CreateRecipe/index.scss";
import Button from "../../Components/Buttons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateRecipe = () => {
  const [data, setData] = useState({
    title: "Pizza",
    description: "des",
    image_url:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/02/Chicken-Fajitas-7.jpg",
    publisher: "Umer",
    ingredients: ["rice", "water"],
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
      .catch((error) => {
        console.log("err", error.response.data);
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div className="Create-Recipe">
      <h1 className="Create-Recipe__title"> Create Recipe </h1>

      <div className="Create-Recipe__Card">
        <form onSubmit={handleSubmit}>
          <div className="Create-Recipe__field">
            <label className="Create-Recipe__label col-3">Recipe Name</label>
            <input
              type="text"
              onChange={handleChange}
              className="Create-Recipe__input col-9"
              name="title"
              value={data.title}
            />
          </div>
          <br />
          <div className="Create-Recipe__field">
            <label className="Create-Recipe__label col-3">Description</label>
            <input
              type="text"
              onChange={handleChange}
              className="Create-Recipe__input col-9"
              name="description"
              value={data.description}
            />
          </div>
          <br />
          <div className="Create-Recipe__field">
            <label className="Create-Recipe__label col-3">Image Url</label>
            <input
              type="url"
              onChange={handleChange}
              className="Create-Recipe__input col-9"
              name="image_url"
              value={data.image_url}
            />
          </div>
          <br />
          <div className="Create-Recipe__field">
            <label className="Create-Recipe__label col-3">Publisher</label>
            <input
              type="text"
              onChange={handleChange}
              className="Create-Recipe__input col-9"
              name="publisher"
              value={data.publisher}
            />
          </div>
          <br />
          <Button
            title="Create Recipe"
            type="submit"
            className="Create-Recipe__submit-btn"
          />
        </form>
      </div>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </div>
  );
};

export default CreateRecipe;
