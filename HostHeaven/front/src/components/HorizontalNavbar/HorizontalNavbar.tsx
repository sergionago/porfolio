import { useState } from 'react';
import './_HorizontalNavbar.scss';
import User from './User/User';
import { Link } from 'react-router-dom';

function HorizontalNavbar() {

    const [menuVisibility, setMenuVisibility] = useState(false);

    const handleMenu = () => {
        const navBar: HTMLElement | null = document.querySelector("nav#main-navBar");
        if (navBar) {
            if (!menuVisibility) {
                navBar.style.left = '0%';
                setMenuVisibility(true);
            } else {
                navBar.style.left = '-60%';
                setMenuVisibility(false);
            }
        }
    }

    return (
        <>
            <i className="fa-solid fa-bars block lg:hidden" title='Abrir menú' onClick={handleMenu}></i>
            <nav id="main-navBar" className='flex flex-col absolute left-[-60%] top-[3rem] gap-6 items-center h-full lg:flex-row lg:relative lg:left-0 lg:top-0 lg:h-[10%] lg:justify-between'>
                <Link to="/"><i className="fa-solid fa-house"></i></Link>
                <ul className='outer-list flex flex-col lg:flex-row'>
                    <li><Link to="/glosary">Glosario</Link></li>
                    <li><Link to="/hostingPlans">Planes de hosting</Link></li>
                    <li><Link to="/hostingPlans#custom-creator-container">Personaliza tu plan</Link></li> {/*Añadir # para que navegue directamente al formulario de plan personalizado*/}
                    <li><Link to="/about">Sobre nosotros</Link></li>
                    <li><Link to="/contact">Contáctanos</Link></li>
                </ul>
                <User />
            </nav>
        </>
    )
}

export default HorizontalNavbar;