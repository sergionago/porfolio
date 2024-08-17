'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { getRecipe } from "@/app/services/recipeService";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const SERVER_URI = process.env.SERVER_URI;
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
    });

    useEffect(() => {
        const recipeId = searchParams.get('recipeId');
        if (recipeId) getRecipeData(recipeId);
    }, []);

    const getRecipeData = async (recipeId: string) => {
        const response = await getRecipe(recipeId);
        setRecipeData(response.recipe);
    }

    const editRecipe = () => {
        router.push(`/pages/edit-recipe?recipeId=${recipeData.recipeId}`);
    }

    return (
        <main className="w-[90vw] h-screen bg-white mx-auto">
            <section className="bg-white p-6 relative">
                <Link href={'/pages/recipes-list'} className="text-xl border-2 border-support-gray absolute top-4 left-4 px-2 py-1 rounded hover:text-strong-red" title="Return to recipe list">
                    <i aria-hidden className="fa-solid fa-arrow-left"></i>
                </Link>
                <section className="border-b-2 border-black flex flex-col items-center gap-3 pb-4">
                    <article>
                        <p className="border-b-2 border-support-gray text-xl text-center">{recipeData.name}</p>
                    </article>
                    <article className="gap-4 w-[90%] grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] lg:grid lg:grid-cols-[35%_30%_35%] lg:grid-rows-[auto]">
                        <div className="self-start flex flex-col items-center gap-2">
                            <p className="text-lg">Plato terminado:</p>
                            <Image
                                src={SERVER_URI + 'back' + recipeData.finalImage}
                                alt="Finished Recipe"
                                width={120}
                                height={100}
                                priority
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                        <div className="border-2 border-black p-3">
                            <p className="text-lg">Ingredientes:</p>
                            <ul className="ingredients">
                                {recipeData.ingredients.map((ingredient) => (
                                    <li key={ingredient.id} className="flex items-center place-content-start my-2 ingredient gap-1">
                                        <input type="text" readOnly placeholder="Producto" className="w-1/3 border-b-2 border-support-gray outline-none" value={ingredient.product}/>
                                        <p>:</p>
                                        <input type="text" readOnly placeholder="Cantidad" className="w-1/3 border-b-2 border-support-gray outline-none" value={ingredient.quantity}/>
                                        <input type="text" readOnly placeholder="Unidad" className="w-1/3 border-b-2 border-support-gray outline-none" value={ingredient.unit}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center place-content-around col-span-2 lg:flex lg:flex-col lg:items-center lg:self-start lg:col-span-1 lg:gap-8">
                            <div className="flex flex-col items-center">
                                <p className="text-lg">Tiempo de preparación:</p>
                                <p>{recipeData.time}</p>
                            </div>

                            <div className="flex flex-col items-center p-2 border-2 border-black rounded-lg cursor-pointer group" title="Edit recipe" onClick={editRecipe}>
                                <p>Editar receta</p>
                                <span><i aria-hidden className="fa-solid fa-pen-to-square group-hover:text-strong-red"></i></span>
                            </div>
                        </div>

                    </article>

                </section>

                <section className="w-[65%] mx-auto flex flex-col pt-6">
                    <h2 className="text-2xl mb-2">Pasos:</h2>
                    {recipeData.steps.map((step) => (
                        <article key={step.id} className="mb-8 w-full">
                            <div className="mb-2 flex text-lg">
                                <span>{step.id}.&nbsp;</span>
                                <p className="border-b-2 border-black">{step.title}</p>
                            </div>

                            {step.id % 2 == 0 ?
                                <div className="border-2 border-black grid grid-cols-[auto_auto] grid-rows-[auto] gap-4 items-center">
                                    <p className="p-4">{step.description}</p>
                                    <Image
                                        src={SERVER_URI + 'back' + step.image}
                                        alt="Step image"
                                        width={150}
                                        height={100}
                                        priority
                                        style={{ justifySelf: 'end', width: 'auto', height: 'auto' }}
                                    />
                                </div>
                                :
                                <div className="border-2 border-black grid grid-cols-[auto_auto] grid-rows-[auto] gap-4 items-center">
                                    <Image
                                        src={SERVER_URI + 'back' + step.image}
                                        alt="Step image"
                                        width={150}
                                        height={100}
                                        priority
                                        style={{ justifySelf: 'start', width: 'auto', height: 'auto' }}
                                    />
                                    <p className="p-4">{step.description}</p>
                                </div>
                            }
                        </article>
                    ))}
                </section>
            </section>
        </main>
    )
}