import { useEffect, useState } from 'react';
import './_User.scss';
import { Link } from 'react-router-dom';
import LogInForm from '../LogInForm/LogInForm';
import { jwtDecode } from 'jwt-decode';


function User() {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showLogIn, setShowLogIn] = useState<boolean>(false);
    const [isLogedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const token: string | null = localStorage.getItem("sessionToken");
        if (token) {
            setIsLoggedIn(true);
            const decodedToken: any = jwtDecode(token);
            const userName: string = decodedToken.name;
            setUserName(userName);
        }
    }, [])


    const handleVisibility = (): void => {
        setIsVisible(!isVisible);
    }


    const showLogInModal = (): void => {
        setShowLogIn(true);
    }

    const closeLogInModal = (): void => {
        setShowLogIn(false);
    }

    const closeSession = (): void => {
        localStorage.removeItem("sessionToken");
        window.location.reload();
    }

    return (
        <>
            <div id="user-icon" onClick={handleVisibility}>
                {isLogedIn ? <i className="fa-solid fa-user-check"></i> : <i className="fa-solid fa-user-xmark"></i>}
                {isVisible && !isLogedIn ? (
                    <div id='logIng-signIn-buttons' className='flex flex-col absolute bottom-[-3rem] left-[6rem] p-2 lg:flex-row lg:top-[2.2rem] lg:bottom-auto lg:left-auto lg:right-[-1rem] lg:p-4'>
                        <button type="button" onClick={showLogInModal}>Inicia Sesión</button>
                        <button type="button"><Link to="/register">Regístrate</Link></button>
                    </div>
                ) : isVisible && isLogedIn ? (
                    <div id="loged-container" className='top-[-6.5rem] left-[4rem] lg:top-[2.7rem] lg:right-[-1rem] lg:left-auto'>
                        <p>Bienvenido {userName.charAt(0).toUpperCase() + userName.slice(1)}!</p>
                        <button type="button"><Link to="/userArea"><i className="fa-solid fa-clipboard-user"></i>Área de usuario</Link></button>
                        <button type="button" onClick={closeSession}><i className="fa-solid fa-arrow-right-from-bracket"></i>Cerrar Sesión</button>
                    </div>
                ) : null}

            </div>
            {showLogIn && <LogInForm onClose={closeLogInModal} />}
        </>
    )
}

export default User;