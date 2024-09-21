import './_Glosary.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ConceptView from './ConceptView/ConceptView';
import { getAllConcepts } from '../../services/GlosaryService';
import { useEffect, useState } from 'react';
import { Concept } from './types';



function Glosary() {

    const imgUrl = require("../../assets/images/header/glosary-header.jpg");
    const [concepts, setConcepts] = useState<Concept[]>([]);
    const [seeConcept, setSeeConcept] = useState<Concept | null>(null);

    useEffect(() => {
        getAllConcepts().then((res: Response) => {
            return res.json();
        }).then((data: Concept[]) => {
            setConcepts(data);
        })
    }, []);



    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        const selectedConcept = concepts.find(concept => concept.id_concept === parseInt(event.currentTarget.id))
        if (selectedConcept) {
            setSeeConcept(selectedConcept);
        }

    }


    return (
        <>
            <Header imagePath={imgUrl} />

            <main id="glosary-page" className='grid grid-rows-[auto_auto_auto] grid-cols-[1fr_2fr] md:grid-rows-[auto_auto]'>
                <h3 className='row-start-1 col-span-3'>El hosting puede resultar complejo. Deja que te ayudemos</h3>
                <aside id="concept-names-container" className='row-start-2 col-span-2 overflow-x-hidden md:overflow-x-auto md:col-start-1 md:col-span-1'>
                    <ul className='flex w-full overflow-x-scroll md:flex-col md:w-auto md:h-[20rem] md:overflow-y-scroll'>
                        {concepts.map((concept) => (
                            <li key={concept.id_concept} id={concept.id_concept.toString()} onClick={handleClick}>{concept.concept_name}</li>
                        ))
                        }
                    </ul>
                </aside>
                <section id="description-containers" className='row-start-3 col-span-2 md:row-start-2 md:col-start-2'>
                    <ConceptView concept={seeConcept} />
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Glosary;