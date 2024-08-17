const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController')


router.post('/new', recipeController.addRecipe)
router.get('/list/:userId', recipeController.getRecipeList)
router.get('/listRgx/:recipeName/:userId', recipeController.getRecipesByRegex)
router.get('/view/:recipeId', recipeController.getRecipe)
router.post('/update', recipeController.updateRecipe)
router.post('/delete', recipeController.deleteRecipe)


module.exports = router