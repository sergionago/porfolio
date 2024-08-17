import { FormEvent, MouseEventHandler, useState } from "react";
import { signIn } from "../services/userService";

export default function RegisterModal({ onClose }: { onClose: MouseEventHandler<HTMLButtonElement> }) {
    const [userData, setUserData] = useState({
        mail: '',
        pass: ''
    });
    const [serverResponse, setServerResponse] = useState({
        message: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await signIn(userData);
        setServerResponse(response);
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    return (
        <dialog className="absolute m-auto z-50 bg-blue-50 backdrop:backdrop-brightness-50 rounded" id="register-modal">
            <form onSubmit={handleSignIn} className="flex flex-col items-center gap-4 px-6 py-5">
                <button type="button" onClick={onClose} className="text-xl py-1 px-[0.35rem] self-start border-2 border-transparent hover:border-black rounded">X</button>
                <div className="flex w-full">
                    <label htmlFor="mailm" className="block w-1/2">Correo electrónico</label>
                    <input type="mail" id="mailm" name="mail" onChange={handleChange} className="block w-1/2" />
                </div>
                <div className="flex w-full">
                    <label htmlFor="passm" className="block w-1/2">Contraseña</label>
                    <input type="password" id="passm" name="pass" onChange={handleChange} className="block w-1/2" />
                </div>
                <div>
                    <button type="submit" className="border-2 border-black p-2 rounded mt-2 hover:bg-red-200">Finalizar registro</button>
                </div>

            </form>
            {serverResponse && <p className="text-center m-2 text-xl">{serverResponse.message}</p>}
        </dialog>
    )
}