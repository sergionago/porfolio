'use client'
import { FormEvent, useState } from "react"
import { uploadImages, createRecipe } from "@/app/services/recipeService"
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    const [serverResponse, setServerResponse] = useState('');
    const [recipeData, setRecipeData] = useState({
        recipeId: '',
        userId: '',
        name: '',
        time: '',
        finalImage: '',
        ingredients: [{
            id: 1,
            product: '',
            quantity: '',
            unit: ''
        }],
        steps: [{
            id: 1,
            title: '',
            image: '',
            description: ''
        }]
    })
    const [imagesData, setImagesData] = useState({
        finalImage: null,
        steps: [{
            id: 1,
            image: null
        }]

    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (files) {
            setImagesData({ ...imagesData, [name]: files[0] })
        } else {
            setRecipeData({ ...recipeData, [name]: value })
        }
    }

    const addIngredient = () => {
        const newIngredient = {
            id: recipeData.ingredients[recipeData.ingredients.length - 1].id + 1,
            product: '',
            quantity: '',
            unit: ''
        }
        setRecipeData({ ...recipeData, ingredients: [...recipeData.ingredients, newIngredient] });
    }

    const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fatherId = event.target.closest("li")?.id;
        setRecipeData((prevData) => ({
            ...prevData, ingredients: prevData.ingredients.map((ingredient) =>
                ingredient.id.toString() == fatherId ? { ...ingredient, [event.target.name]: event.target.value } : ingredient
            )
        }))
    }

    const addStep = () => {
        const newStep = {
            id: recipeData.steps[recipeData.steps.length - 1].id + 1,
            title: '',
            image: '',
            description: ''
        }
        setRecipeData({ ...recipeData, steps: [...recipeData.steps, newStep] });
        setImagesData({ ...imagesData, steps: [...imagesData.steps, { id: newStep.id, image: null }] })
    }

    const handleStepChange = (event: React.ChangeEvent<any>) => {
        const fatherId = event.target.closest("article")?.id;
        const { name, value, files } = event.target;
        if (files) {
            setImagesData((prevData) => ({
                ...prevData, steps: prevData.steps.map((step) =>
                    step.id.toString() == fatherId ? { ...step, [name]: files[0] } : step
                )
            }))

        } else {
            setRecipeData((prevData) => ({
                ...prevData, steps: prevData.steps.map((step) =>
                    step.id.toString() == fatherId ? { ...step, [name]: value } : step
                )
            }))
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Images upload
        const imgFormData = new FormData();

        if (imagesData.finalImage) {
            imgFormData.append('finalImage', imagesData.finalImage);
        }
        imagesData.steps.forEach((step) => {
            if (step.image) {
                imgFormData.append(`step[${step.id}]`, step.image)
            }
        })

        // Get the path of the images uploaded in the server
        const uploadResponse = await uploadImages(imgFormData);
        const token = localStorage.getItem('sessionToken')
        let decodedToken: any;

        // Add the imagesPath and another info to the recipeData object
        if (token) decodedToken = await jwtDecode(token);
        if (decodedToken) recipeData.userId = decodedToken.id;
        recipeData.recipeId = uploadResponse.imagesPath.recipeId;
        recipeData.finalImage = uploadResponse.imagesPath.finalImage;
        recipeData.steps.forEach((recipeStep) => {
            let matchedId = uploadResponse.imagesPath.steps.find((pathStep: any) => recipeStep.id == pathStep.id);
            if (matchedId) recipeStep.image = matchedId.image;
        })

        // Send data with relative paths of the images
        const submitResponse = await createRecipe(recipeData);

        setServerResponse(submitResponse.message);
        setTimeout(() => {
            router.push('./recipes-list');
        }, 1000);
    }

    return (
        <main className="w-[90vw] h-screen bg-white mx-auto">

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-inherit">
                <Link href={'/pages/recipes-list'} className="text-xl border-2 border-support-gray px-2 py-1 self-start rounded hover:text-strong-red" title="Return to recipe list">
                    <i aria-hidden className="fa-solid fa-arrow-left"></i>
                </Link>
                <section className="border-b-2 border-black w-full flex flex-col items-center gap-3 pb-3">
                    <article>
                        <input type="text" placeholder="Recipe name" name="name" className="border-b-2 border-support-gray text-xl text-center" onChange={handleChange} />
                    </article>
                    <article className="w-full flex flex-col items-center gap-6 sm:grid sm:grid-cols-[1fr_1fr] sm:grid-rows-[auto_auto] lg:grid lg:grid-cols-[35%_30%_35%] lg:grid-rows-[auto]">
                        <div className="flex flex-col items-center gap-2 relative sm:self-start">
                            <p className="text-lg">Imagen plato terminado:</p>
                            <label htmlFor="file" className="text-lg p-2 border-2 border-support-gray rounded cursor-pointer hover:text-strong-red"><i aria-hidden className="fa-solid fa-upload mr-2"></i>Seleccionar archivo</label>
                            <input type="file" id="file" name="finalImage" onChange={handleChange} className="overflow-hidden absolute w-0 z-[-1]" />
                        </div>
                        <div className="border-2 border-black p-3">
                            <p className="text-lg">Ingredientes:</p>
                            <ul className="ingredients">
                                {recipeData.ingredients.map((ingredient) => (
                                    <li key={ingredient.id} id={ingredient.id.toString()} className="flex items-center place-content-start my-2 ingredient gap-1">
                                        <input type="text" placeholder="Product" className="w-1/3 border-b-2 border-support-gray" name="product" onChange={handleIngredientChange} />
                                        <p>:</p>
                                        <input type="text" placeholder="Quantity" className="w-1/3 border-b-2 border-support-gray" name="quantity" onChange={handleIngredientChange} />
                                        <input type="text" placeholder="Unit" className="w-1/3 border-b-2 border-support-gray" name="unit" onChange={handleIngredientChange} />
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className="border-2 border-support-gray rounded-2xl px-2 py-1 group" onClick={addIngredient}><i aria-hidden className="fa-solid fa-plus group-hover:text-strong-orange" title="Add Ingredient"></i></button>
                        </div>
                        <div className="flex place-content-center col-span-2 mt-4 lg:col-span-1 lg:self-start">
                            <input type="text" placeholder="Cooking time" name="time" className="border-b-2 border-support-gray" onChange={handleChange} />
                        </div>
                    </article>

                </section>

                <section className="w-[65%] mx-auto flex flex-col pt-6">
                    <h2 className="text-2xl mb-2">Pasos:</h2>
                    {recipeData.steps.map((ingredient) => (
                        <article key={ingredient.id} id={ingredient.id.toString()} className="mb-8 w-full">
                            <div className="flex mb-2">
                                <span>{ingredient.id}.&nbsp;</span>
                                <input type="text" name="title" className="border-b-2 border-black w-full" placeholder="Step title" onChange={handleStepChange} />
                            </div>

                            {ingredient.id % 2 == 0 ?
                                <div className="border-2 border-black flex flex-col p-2 sm:grid sm:grid-cols-[auto_auto] sm:grid-rows-[auto] items-center gap-4">
                                    <textarea name="description" cols={50} rows={5} placeholder="Step description" className="w-full" onChange={handleStepChange}></textarea>
                                    <div className="relative flex flex-col items-center gap-2">
                                        <p>Imagen del paso:</p>
                                        <label htmlFor={'image' + ingredient.id} className="p-2 border-2 border-support-gray rounded cursor-pointer hover:text-strong-red text-center"><i aria-hidden className="fa-solid fa-upload mr-2"></i>Seleccionar archivo</label>
                                        <input type="file" id={'image' + ingredient.id} name="image" onChange={handleStepChange} className="overflow-hidden absolute w-0 z-[-1]" />
                                    </div>
                                </div> :
                                <div className="border-2 border-black flex flex-col p-2 sm:grid sm:grid-cols-[auto_auto] sm:grid-rows-[auto] items-center gap-4">
                                    <div className="relative flex flex-col items-center gap-2">
                                        <p>Imagen del paso:</p>
                                        <label htmlFor={'image' + ingredient.id} className="p-2 border-2 border-support-gray rounded cursor-pointer hover:text-strong-red text-center"><i aria-hidden className="fa-solid fa-upload mr-2"></i>Seleccionar archivo</label>
                                        <input type="file" id={'image' + ingredient.id} name="image" onChange={handleStepChange} className="overflow-hidden absolute w-0 z-[-1]" />
                                    </div>
                                    <textarea name="description" cols={50} rows={5} placeholder="Step description" className="w-full" onChange={handleStepChange}></textarea>
                                </div>}
                        </article>
                    ))}
                    <button type="button" className="border-2 border-support-gray rounded-2xl px-2 py-1 group self-start" onClick={addStep}><i aria-hidden className="fa-solid fa-plus group-hover:text-strong-orange" title="Add Step"></i></button>

                </section>
                <section className="flex flex-col place-content-center">
                    <button type="submit" className="mx-auto border-2 border-support-gray rounded-xl p-3 text-lg hover:bg-strong-red hover:text-white">Crear Receta</button>
                    {serverResponse && <p className="text-center text-lg my-2">{serverResponse}</p>}
                </section>
            </form>
        </main>
    )
}