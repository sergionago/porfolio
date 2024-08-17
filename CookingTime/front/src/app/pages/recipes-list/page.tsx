'use client'
import { FormEvent, useEffect, useState } from "react"
import { getRecipeList, deleteRecipe, getRecipesByRegexp } from "@/app/services/recipeService";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const [searchedRecipe, setSearchedRecipe] = useState('');
    const [recipeList, setRecipeList] = useState([]);
    const [userToken, setUserToken] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        token ? getRecipes(token) : router.push('/');
    }, [searchedRecipe]);


    const getRecipes = async (token: string) => {
        let decodedToken: any;
        decodedToken = await jwtDecode(token);
        setUserToken(decodedToken.id);
        let response;

        if (searchedRecipe) {
            response = await getRecipesByRegexp(searchedRecipe, decodedToken.id);//implementar debounce para limitar la cantidad de llamadas
        } else {
            response = await getRecipeList(decodedToken.id);
        }
        setRecipeList(response.recipes);
    }

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchedRecipe(searchedRecipe);
    }

    const handleSearchTyping = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedRecipe(event.target.value);
    }

    const viewRecipe = (recipeId: string) => {
        router.push(`/pages/view-recipe?recipeId=${recipeId}`);
    }

    const delRecipe = async (recipeId: string, recipeName: string) => {
        let deleteObj = {
            recipeId: recipeId,
            userId: userToken
        }
        if (confirm(`¿Desea eliminar la receta ${recipeName}?`)) {
            const response = await deleteRecipe(deleteObj);
            setServerResponse(response.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    return (
        <main className="w-screen h-screen flex flex-col items-center">
            <section className="flex flex-col gap-5 bg-white p-5 my-2 sm:w-[80%] lg:w-[60%] xl:w-1/2">
                <article>
                    <h1 className="text-center text-2xl">Mis recetas</h1>
                </article>
                <article className="flex place-content-between">
                    <form className="flex items-center gap-3 flex-grow-[0.3]" onSubmit={handleSearchSubmit}>
                        <input type="text" placeholder="Search by recipe name" className="w-[100%] border-b-2 border-support-gray" onChange={handleSearchTyping} />
                        <button type="submit" title="Search Recipe"><i aria-hidden className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <div className="flex" title="Add Recipe">
                        <Link href={'./add-recipe'} target="_blank" className="flex flex-col items-center group">
                            <p>Añadir receta</p>
                            <i aria-hidden className="fa-solid fa-plus group-hover:text-strong-red"></i>
                        </Link>
                    </div>
                </article>
                <article className="border-2 border-black">
                    <table className="w-full">
                        <thead className="border-b-2 border-black ">
                            <tr>
                                <th></th>
                                <th className="text-start">Nombre</th>
                                <th className="text-start">Tiempo de preparación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipeList && recipeList.length > 0 && recipeList.map((recipe: any) => (
                                <tr key={recipe._id} id={recipe._id} className="cursor-pointer group">
                                    <td onClick={() => delRecipe(recipe._id, recipe.name)} title="Delete recipe" className="peer hover:text-strong-red"><i aria-hidden className="fa-solid fa-trash-can"></i></td>
                                    <td className="peer-hover:bg-white group-hover:bg-gray-100" onClick={() => { viewRecipe(recipe._id) }} title="View recipe">{recipe.name}</td>
                                    <td className="peer-hover:bg-white group-hover:bg-gray-100" onClick={() => { viewRecipe(recipe._id) }} title="View recipe">{recipe.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {serverResponse && <p>{serverResponse}</p>}
                </article>
            </section>
        </main>
    )
}