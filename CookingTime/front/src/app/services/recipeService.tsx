interface recipeData {
    recipeId: string | '';
    userId: string | '';
    name: string | '';
    time: string | '';
    finalImage: string | '';
    ingredients: Array<{
        id: number;
        product: string | '';
        quantity: string | '';
        unit: string | '';
    }>,
    steps: Array<{
        id: number;
        title: string | '';
        image: string | '';
        description: string | '';
    }>
}

const SERVER_URI = process.env.SERVER_URI;


const uploadImages = async (imgFormData: FormData) => {
    const response = await fetch(SERVER_URI + 'upload/images', {
        method: 'POST',
        body: imgFormData
    });

    const paths = await response.json();
    return paths;
}

const createRecipe = async (recipe: recipeData): Promise<any> => {
    const response = await fetch(SERVER_URI + 'recipes/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });

    const result = await response.json();
    return result;
}


const getRecipeList = async (userId: string) => {
    const response = await fetch(SERVER_URI + `recipes/list/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await response.json();
    return result;
}

const getRecipe = async (recipeId: string) => {
    const response = await fetch(SERVER_URI + `recipes/view/${recipeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await response.json();
    return result;
}

const updateRecipe = async (recipeData: recipeData) => {
    const response = await fetch(SERVER_URI + 'recipes/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
    });

    const result = await response.json();
    return result;
}


const deleteRecipe = async (data: any) => {
    const response = await fetch(SERVER_URI + 'recipes/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
}

const getRecipesByRegexp = async (recipeName: string, userId: string) => {
    const response = await fetch(SERVER_URI + `recipes/listRgx/${recipeName}/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}


export { uploadImages, createRecipe, getRecipeList, getRecipe, getRecipesByRegexp, updateRecipe, deleteRecipe };