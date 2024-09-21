import React, { useEffect, useState } from "react";
import './_myTickets.scss';
import { getTickets } from "../../../services/EmailService";

interface Ticket {
    id_email_request: number;
    sender: string;
    receiver: string;
    subject: string;
    message: string;
    state: string;
    id_user: number;
    response: string | null;
}


function MyTickets({ user_id }: { user_id: number }) {

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket>();

    useEffect(() => {
        getTickets(user_id).then((res: Response) => {
            if (res && res.ok) {
                return res.json();
            }
        }).then((data: Ticket[]) => {
            if (data) {
                setTickets(data);
            }
        });
    }, [user_id]);



    const viewDetail = (event: React.MouseEvent<HTMLLIElement>) => {
        let selectedTicket = tickets.find((ticket: Ticket) => ticket.id_email_request == parseInt(event.currentTarget.id));
        setSelectedTicket(selectedTicket);
    }


    return (
        <article id="user-tickets" className="flex flex-col gap-4 md:grid md:grid-rows-[auto] md:grid-cols-[15%_85%] md:h-[20rem] md:items-center">
            {tickets.length > 0 && <div>
                <ul className="flex overflow-x-scroll gap-2 md:flex-col md:overflow-y-scroll md:h-[15rem]">
                    {tickets.map((ticket: Ticket) => (
                        <li key={ticket.id_email_request} className={`${ticket.response === null ? "not-resolved" : "resolved"} ${ticket.id_email_request === selectedTicket?.id_email_request ? "active" : ""}`} id={ticket.id_email_request.toString()} onClick={viewDetail}>Ticket {ticket.id_email_request}</li>
                    ))}
                </ul>
            </div>}


            {tickets.length > 0 ? (
                <div className="flex flex-col w-[70%] sm:w-full">
                    {selectedTicket ? (
                        <>
                            <div>
                                <p><strong>Solicitud</strong></p>
                                <p>{selectedTicket.message}</p>
                            </div>
                            {selectedTicket.response && (
                                <div>
                                    <p><strong>Respuesta</strong></p>
                                    <p>{selectedTicket.response}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <p><em>Seleccione un ticket para visualizarlo en detalle</em></p>
                    )}
                </div>
            ) : (
                <p>Aún no ha enviado ningún ticket al equipo de soporte</p>
            )}
        </article>
    )
}

export default MyTickets;