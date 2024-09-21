import './_Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {

    const logo = require('../../assets/logo/logo.png');
    return (
        <footer className='grid grid-rows-[auto_auto] grid-cols-[0.5fr_1fr]'>
            <section id="footer-logo">
                <img src={logo} alt="Logo HostHeaven" />
            </section>
            <section id="footer-social" className='gap-2 sm:gap-[2rem]'>
                <article id="footer-social-icons">
                    <ul className='flex gap-2 sm:gap-6'>
                        <li><i className="fa-brands fa-facebook" title="Facebook"></i></li>
                        <li><i className="fa-brands fa-x-twitter" title="X"></i></li>
                        <li><i className="fa-brands fa-instagram" title="Instagram"></i></li>
                        <li><i className="fa-brands fa-linkedin" title="Linkedin"></i></li>
                    </ul>
                </article>
                <article id="footer-social-links">
                    <ul className='flex flex-col sm:flex-row sm:gap-4'>
                        <li><Link to="/conditions">Términos y Condiciones</Link></li>
                        <li><Link to="/privacy">Política de Privacidad</Link></li>
                        <li><Link to="/cookies">Política de Cookies</Link></li>
                    </ul>
                </article>
            </section>
            <section id="footer-copy">
                <p>HostHeaven &copy; | 2024 | Made By Sergio Navarro</p>
            </section>
        </footer>
    );
};
export default Footer;