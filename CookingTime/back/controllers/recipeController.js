const recipeRepository = require('../repositories/recipeRepository');
const fs = require('fs');
const path = require('path');

const addRecipe = async (req, res) => {
    try {
        await recipeRepository.createRecipe(req.body);
        res.status(200).json({ message: 'Receta creada con éxito' });
    } catch (err) {
        res.status(500).json({ message: 'Error interno al crear la receta' });
    }
}

const getRecipeList = async (req, res) => {
    try {
        let recipes;
        recipes = await recipeRepository.searchRecipeList(req.params.userId);
        res.status(200).json({ recipes: recipes })
    } catch (err) {
        res.status(500).json({ message: 'Error interno al obtener la lista de recetas' });
    }
}


const getRecipe = async (req, res) => {
    try {
        let recipe;
        recipe = await recipeRepository.searchRecipe(req.params.recipeId);
        res.status(200).json({ recipe: recipe })
    } catch (err) {
        res.status(500).json({ message: 'Error interno al obtener la receta' });
    }
}

const getRecipesByRegex = async (req, res) => {
    try {
        let recipes;
        const { recipeName, userId } = req.params;
        recipes = await recipeRepository.searchRecipeByRegex(recipeName, userId);
        res.status(200).json({ recipes: recipes });
    } catch (err) {
        res.status(500).json({ message: 'Error interno al obtener la receta' });
    }
}

const updateRecipe = async (req, res) => {
    try {
        await recipeRepository.editRecipe(req.body);
        res.status(200).json({ message: 'Receta actualizada con éxito' });
    } catch (err) {
        res.status(500).json({ message: 'Error interno al actualizar la receta' });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const { recipeId, userId } = req.body;
        await recipeRepository.deleteRecipe(recipeId, userId);
        const deleteDir = path.join(__dirname, '..', 'public', 'uploads', 'images', recipeId);
        fs.rm(deleteDir, { recursive: true, force: true }, (err) => {
            if (err) {
                throw err;
            }
            res.status(200).json({ message: 'Receta eliminada con éxito' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Error interno al eliminar la receta' });
    }
}

module.exports = { addRecipe, getRecipeList, getRecipe, getRecipesByRegex, updateRecipe, deleteRecipe };