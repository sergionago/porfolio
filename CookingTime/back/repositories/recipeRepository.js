const { ObjectId } = require('mongodb');
const { getDB } = require('../config/mongo_config');

const createRecipe = async (recipeData) => {
    try {
        if (!recipeData.recipeId) {
            return await getDB().collection('recipes').insertOne(recipeData);
        } else {
            await getDB().collection('recipes').updateOne({ '_id': new ObjectId(recipeData.recipeId) }, { $set: recipeData });
        }
    } catch (err) {
        throw err;
    }
}

const searchRecipeList = async (userId) => {
    try {
        return await getDB().collection('recipes').find({ userId: userId }).toArray();
    } catch (erro) {
        throw err;
    }
}

const searchRecipe = async (recipeId) => {
    try {
        return await getDB().collection('recipes').findOne({ _id: new ObjectId(recipeId) });
    } catch (err) {
        throw err;
    }
}

const searchRecipeByRegex = async (recipeName, userId) => {
    try {
        return await getDB().collection('recipes').find({ name: { $regex: `${recipeName}`, $options: 'i' } }, { userId: userId }).toArray();
    } catch (err) {
        throw err;
    }
}

const editRecipe = async (recipeData) => {
    try {
        await getDB().collection('recipes').updateOne({ '_id': new ObjectId(recipeData.recipeId), 'userId': recipeData.userId }, { $set: recipeData });
    } catch (err) {
        throw err;
    }
}

const deleteRecipe = async (recipeId, userId) => {
    try {
        await getDB().collection('recipes').deleteOne({ '_id': new ObjectId(recipeId), 'userId': userId })
    } catch (err) {
        throw err;
    }
}


module.exports = { createRecipe, searchRecipe, searchRecipeByRegex, searchRecipeList, editRecipe, deleteRecipe }