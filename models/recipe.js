const { Schema, model } = require("mongoose");

// create our schema
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model

const recipes = model("Recipes", recipeSchema);

module.exports = recipes;
