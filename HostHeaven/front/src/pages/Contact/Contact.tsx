import './_Contact.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ResponseData } from './types';
import ServerResponse from '../../components/ServerResponse/ServerResponse';
import { useState } from 'react';
import { sendEmail } from '../../services/EmailService';

function Contact() {

    const imgUrl = require("../../assets/images/header/contact-header.jpg");
    const [responseData, setResponseData] = useState<ResponseData>({
        status: 0,
        response: ""
    });


    const handleEmailSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        let formObject: any = {};

        formData.forEach((value, key) => {
            formObject[key] = value
        });

        if (formObject.subject !== "false") {
            formObject.receiver = process.env.REACT_APP_EMAIL_REMITENT;


            let resStatus = 0;

            setResponseData({
                status: resStatus,
                response: ""
            });
            sendEmail(formObject).then((res: Response) => {
                resStatus = res.status;
                return res.json();
            }).then((data) => {
                setResponseData({
                    status: resStatus,
                    response: data.message
                });
            })
        }
    }

    return (
        <>
            <Header imagePath={imgUrl} />
            <main id="contact-page">
                <section id="contact-info">
                    <p>Llámanos al teléfono +34 675865845</p>
                    <p>O utiliza el formulario de contacto y nuestro equipo responderá en menos de 24 horas</p>
                </section>
                <section id="contact-form">
                    <form onSubmit={handleEmailSubmit} className='flex flex-col gap-y-8'>

                        <article id="form-data-1" className='flex flex-col sm:flex-row gap-10'>
                            <div className='form-group'>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" placeholder=' ' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="telf">Teléfono</label>
                                <input type="tel" id="telf" placeholder=' ' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="mail">Correo electrónico</label>
                                <input type="email" id="mail" name="sender" placeholder=' ' required />
                            </div>

                        </article>
                        <article id="form-data-2" className='flex flex-col gap-6 sm:flex-row sm:justify-between sm:gap-0'>
                            <div className='form-group-select'>
                                <label htmlFor="motiv">Motivo</label>
                                <select name="subject" id="motiv" required defaultValue={'false'}>
                                    <option value="false" disabled>Seleccione un asunto...</option>
                                    <option value="doubt">Dudas y sugerencias</option>
                                    <option value="comercial">Información Comercial</option>
                                    <option value="other">Otro</option>
                                </select>
                            </div>
                            <div className='form-group-select'>
                                <label htmlFor="client">¿Eres cliente?</label>
                                <select name="esCliente" id="client" defaultValue={'false'}>
                                    <option value="false" disabled>Seleccione una opción...</option>
                                    <option value="yes">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                        </article>
                        <article id="form-data-3" className='col-span-2 row-start-3'>
                            <textarea name="message" rows={8} required></textarea>
                            <button type="submit">Enviar</button>
                        </article>

                    </form>
                </section>

            </main>
            {responseData.status !== 0 && <ServerResponse responseStatus={responseData.status} response={responseData.response} />}

            <Footer />
        </>
    )
}

export default Contact;