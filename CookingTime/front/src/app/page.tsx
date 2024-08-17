'use client'
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { logIn, signIn } from "./services/userService";
import RegisterModal from "./components/register-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({
    mail: '',
    pass: ''
  });
  const [serverResponse, setServerResponse] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('sessionToken')) {
      router.push('./pages/recipes-list');
    } else {
      setIsRedirecting(false);
    }
  }, [router]);

  if (isRedirecting) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await logIn(formData);
    setServerResponse(response.message);

    if (response.token) {
      localStorage.setItem('sessionToken', response.token);
      setTimeout(() => {
        router.push('./pages/recipes-list');
      }, 1000);
    }
  }

  const activateModal = () => {
    const dialog: HTMLDialogElement | null = document.querySelector("#register-modal");
    if (dialog) dialog.showModal();
  }

  const closeModal = () => {
    const dialog: HTMLDialogElement | null = document.querySelector("#register-modal");
    if (dialog) dialog.close();
  };


  return (
    <main className="w-screen h-screen flex place-content-center items-center relative loginPage">
      <RegisterModal onClose={closeModal} />
      <Image
        src='/images/background-login-img.jpg'
        alt="Background Image"
        fill
        style={{ opacity: '0.4', zIndex: '-1' }}
        unoptimized={true}
      />

      <section className="bg-blue-400 rounded w-[40%] py-5 flex place-content-center items-center shadow-black shadow">
        <form method="POST" onSubmit={handleLogin} className="flex flex-col gap-3 sm:w-[80%] lg:w-1/2">
          <div className="flex flex-col">
            <label htmlFor="mail">Email</label>
            <input type="mail" id="mail" name="mail" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pass">Contraseña</label>
            <input type="password" id="pass" name="pass" onChange={handleChange} />
          </div>

          <div className="flex place-content-around mt-3">
            <button type="submit" className="border-2 border-black rounded p-1 hover:bg-orange-200">Iniciar Sesión</button>
            <button type="button" className="border-2 border-black rounded p-1 hover:bg-orange-200" onClick={activateModal}>Registro</button>
          </div>
          {serverResponse && <p className="text-center text-lg my-2">{serverResponse}</p>}
        </form>

      </section>

    </main>
  );
}
