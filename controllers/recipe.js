const recipe = require("../models/recipe");
// const Blog = require('../models/blog');
const express = require("express");
const recipeRouter = express.Router();
recipeRouter.use(express.json());

// INDUCES
// -- new goes bye bye
// -- edit goes bye bye
// CRUD
// Create

recipeRouter
  .route("/")
  .all((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  })

  // Read
  /* Index */
  .get(async (req, res) => {
    try {
      const allRecipes = await recipe.find({});
      res.status(200).json({
        success: true,
        message: "Recipes found",
        data: allRecipes,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  })

  //CREATE
  .post(async (req, res) => {
    try {
      const body = req.body;

      if (!body.title)
        return res.status(400).json({
          success: false,
          error: {
            message: "Title is required",
          },
        });
      if (!body.description)
        return res.status(400).json({
          success: false,
          error: {
            message: "Description is required",
          },
        });
      if (!body.image_url)
        return res.status(400).json({
          success: false,
          error: {
            message: "Image URL is required",
          },
        });
      if (!body.publisher)
        return res.status(400).json({
          success: false,
          error: {
            message: "Publisher is required",
          },
        });
      if (!body.ingredients?.length)
        return res.status(400).json({
          success: false,
          error: {
            message: "Ingredients are required",
          },
        });

      const {
        title,
        description,
        image_url,
        publisher,
        ingredients,
      } = req.body;

      const newRecipe = await recipe.create({
        title,
        description,
        image_url,
        publisher,
        ingredients,
      });

      res.status(200).json({
        success: true,
        message: "Recipe added successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  });

/* Show */
recipeRouter
  .route("/id")
  .all((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .get(async (req, res) => {
    try {
      if (!req.query.id)
        return res.status(400).json({
          success: false,
          error: {
            message: "Recipe ID is required",
          },
        });
      recipe.findById(req.query.id).then(
        (foundRecipe) => {
          if (foundRecipe)
            res.status(200).json({
              success: true,
              message: "Recipe Found",
              data: foundRecipe,
            });
          else
            res.status(400).json({
              success: false,
              error: {
                message: "No Recipe Exists",
              },
            });
        },
        (error) => {
          res.status(400).json({
            success: false,
            error: error,
          });
        }
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  })

  // Destroy
  .delete(async (req, res) => {
    try {
      console.log("req.body", req.body);
      if (!req.body.id)
        return res.status(400).json({
          success: false,
          error: {
            message: "Recipe ID is required",
          },
        });
      const foundRecipe = await recipe.findByIdAndDelete(req.query.id);
      res.status(200).json({
        success: true,
        message: "Recipe Deleted Successfully",
        data: foundRecipe,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  })

  // Update
  .put(async (req, res) => {
    try {
      const body = req.body;
      if (!body.id)
        return res.status(400).json({
          success: false,
          error: {
            message: "Recipe ID is required",
          },
        });
      const foundRecipe = await recipe.findById(body.id).then(
        (recipe) => {
          recipe.ingredients = body.ingredients;
          recipe.description = body.description;
          recipe.publisher = body.publisher;
          (recipe.image_url = body.image_url), (recipe.title = body.title);
          recipe
            .save()
            .then(() => {
              res.status(200).json({
                success: true,
                message: "Recipe updated successfully",
              });
            })
            .catch((error) => {
              res.status(400).json({
                success: false,
                error: error,
              });
            });
        },
        (error) => {
          res.status(400).json({
            success: false,
            error: error,
          });
        }
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  });

module.exports = recipeRouter;
