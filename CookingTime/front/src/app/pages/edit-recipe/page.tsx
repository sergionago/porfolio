'use client'
import { getRecipe, updateRecipe } from "@/app/services/recipeService";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    const [serverResponse, setServerResponse] = useState('');
    const [recipeData, setRecipeData] = useState({
        _id: '',
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
    const SERVER_URI = process.env.SERVER_URI;

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const recipeId = urlParams.get('recipeId');
        if (recipeId) getRecipeData(recipeId);
    }, [])


    const getRecipeData = async (recipeId: string) => {
        const response = await getRecipe(recipeId);
        setRecipeData(response.recipe);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRecipeData({ ...recipeData, [name]: value })
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
        const { name, value } = event.target;
        setRecipeData((prevData) => ({
            ...prevData, ingredients: prevData.ingredients.map((ingredient) =>
                ingredient.id.toString() == fatherId ? { ...ingredient, [name]: value } : ingredient
            )
        }))
    }

    // Comentado, en el futuro añadir funcionalidad para editar las imagenes, tanto la final como la de cada paso, así como subir
    // las imagenes de los nuevos pasos que se puedan crear
    // const addStep = () => {
    //     const newStep = {
    //         id: recipeData.steps[recipeData.steps.length - 1].id + 1,
    //         title: '',
    //         image: '',
    //         description: ''
    //     }
    //     setRecipeData({ ...recipeData, steps: [...recipeData.steps, newStep] });
    // }

    const handleStepChange = (event: React.ChangeEvent<any>) => {
        const fatherId = event.target.closest("article")?.id;
        const { name, value } = event.target;
        setRecipeData((prevData) => ({
            ...prevData, steps: prevData.steps.map((step) =>
                step.id.toString() == fatherId ? { ...step, [name]: value } : step
            )
        }))

    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        delete (recipeData as Partial<any>)._id; // Delete the _id property, mongo tries to update the inmutable property _id if it is in the sended object
        const response = await updateRecipe(recipeData);
        setServerResponse(response.message);
        setTimeout(() => {
            router.push('./recipes-list');
        }, 1000);
    }

    return (
        <main className="w-[90vw] h-screen bg-white mx-auto relative">
            <Link href={`/pages/view-recipe?recipeId=${recipeData._id}`} className="text-xl border-2 border-support-gray absolute top-4 left-4 px-2 py-1 rounded hover:text-strong-red" title="Return to recipe view">
                <i aria-hidden className="fa-solid fa-arrow-left"></i>
            </Link>
            <form onSubmit={handleSubmit} className="flex flex-col p-6 bg-inherit">
                <section className="border-b-2 border-black flex flex-col items-center gap-3 pb-4">
                    <article>
                        <input type="text" placeholder="Nombre de la receta" name="name" className="border-b-2 border-support-gray text-xl text-center" onChange={handleChange} value={recipeData.name} />
                    </article>
                    <article className="gap-4 w-[90%] grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] lg:grid lg:grid-cols-[35%_30%_35%] lg:grid-rows-[auto]">
                        <div className="self-start flex flex-col items-center gap-2">
                            <p className="text-lg">Plato terminado:</p>
                            <Image
                                src={SERVER_URI + 'back' + recipeData.finalImage}
                                alt="Finished recipe"
                                width={120}
                                height={100}
                                priority
                                style={{ height: 'auto', width: 'auto' }}
                                unoptimized={true}
                            />
                        </div>
                        <div className="border-2 border-black p-3">
                            <p className="text-lg">Ingredientes:</p>
                            <ul className="ingredients">
                                {recipeData.ingredients.map((ingredient) => (
                                    <li key={ingredient.id} id={ingredient.id.toString()} className="flex items-center place-content-start my-2 ingredient gap-1">
                                        <input type="text" placeholder="Producto" className="w-1/3 border-b-2 border-support-gray" name="product" onChange={handleIngredientChange} value={ingredient.product} />
                                        <p>:</p>
                                        <input type="text" placeholder="Cantidad" className="w-1/3 border-b-2 border-support-gray" name="quantity" onChange={handleIngredientChange} value={ingredient.quantity} />
                                        <input type="text" placeholder="Unidad" className="w-1/3 border-b-2 border-support-gray" name="unit" onChange={handleIngredientChange} value={ingredient.unit} />
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className="border-2 border-support-gray rounded-2xl px-2 py-1 group" onClick={addIngredient}><i aria-hidden className="fa-solid fa-plus group-hover:text-strong-orange" title="Add Ingredient"></i></button>
                        </div>
                        <div className="self-start flex flex-col items-center col-span-2 mt-2 lg:col-span-1">
                            <label htmlFor="text" className="text-lg">Tiempo de preparación:</label>
                            <input type="text" id="time" placeholder="Tiempo de preparación" name="time" className="border-b-2 border-support-gray" onChange={handleChange} value={recipeData.time} />
                        </div>
                    </article>

                </section>

                <section className="w-[65%] mx-auto flex flex-col pt-6">
                    <h2 className="text-2xl mb-2">Pasos:</h2>
                    {recipeData.steps.map((step) => (
                        <article key={step.id} id={step.id.toString()} className="mb-8 w-full">
                            <div className="mb-2 flex text-lg">
                                <span>{step.id}.&nbsp;</span>
                                <input type="text" name="title" className="border-b-2 border-black" placeholder="Step title" onChange={handleStepChange} value={step.title} />
                            </div>

                            {step.id % 2 == 0 ?
                                <div className="border-2 border-black grid grid-cols-[auto_auto] grid-rows-[auto]">
                                    <textarea name="description" cols={50} rows={5} placeholder="Step description" onChange={handleStepChange} value={step.description} className="m-auto p-4 w-full"></textarea>
                                    <Image
                                        src={SERVER_URI + 'back' + step.image}
                                        alt="Step image"
                                        width={150}
                                        height={100}
                                        style={{ justifySelf: 'end', height: 'auto', width: 'auto' }}
                                        priority
                                        unoptimized={true}
                                    />
                                </div>
                                :
                                <div className="border-2 border-black grid grid-cols-[auto_auto] grid-rows-[auto]">
                                    <Image
                                        src={SERVER_URI + 'back' + step.image}
                                        alt="Step image"
                                        width={150}
                                        height={100}
                                        style={{ justifySelf: 'start', height: 'auto', width: 'auto' }}
                                        priority
                                        unoptimized={true}
                                    />
                                    <textarea name="description" cols={50} rows={5} placeholder="Step description" onChange={handleStepChange} value={step.description} className="m-auto p-4 w-full"></textarea>
                                </div>}
                        </article>
                    ))}
                    {/* <button type="button" className="border-2 border-support-gray rounded-2xl px-2 py-1 group self-start" onClick={addStep}><i aria-hidden className="fa-solid fa-plus group-hover:text-strong-orange" title="Add Step"></i></button> */}

                </section>
                <section className="flex flex-col place-content-center">
                    <button type="submit" className="mx-auto border-2 border-support-gray rounded-xl py-3 px-6 text-lg hover:bg-strong-red hover:text-white text-nowrap">Editar Receta</button>
                    {serverResponse && <p className="text-center text-lg my-2">{serverResponse}</p>}
                </section>
            </form>
        </main>
    )

}