import { useEffect, useState } from "react";
import Gallery from "./Gallery";
import Skeleton from "./Skeleton";
import { BASE_URL_CHARACTERS } from "../constants/constants";
import axios from "axios"

const MainHome = ({valor}) => {
    const [personajes, setPersonajes] = useState([]);

    const [loading, setLoading] = useState(true)

    const [prev, setPrev] = useState("")
    const [next, setNext] = useState("")

    const getPersonajes = () => {
        fetch(BASE_URL_CHARACTERS)
        .then((resp) => resp.json())
        .then((resp) => {
            console.log(resp.items);
            setPersonajes(resp.items);  
            setLoading(false)
            setPrev(resp.links.previous)
            setNext(resp.links.next)
        })
        .catch((err) => console.error(err));
    };

    const getCharacterName = async() => {
        let resp = await axios.get(`${BASE_URL_CHARACTERS}?race=${valor}`)
        console.log(resp.data);
        setPersonajes(resp.data)
        setLoading(false)
        setPrev(resp.data.links.previous) //revisar
        setNext(resp.data.links.next) //revisar
    }

    const handlePrev = async () => {
        console.log("Disparo prev");
        let resp = await axios.get(prev)
        setPersonajes(resp.items)
        setPrev(resp.data.links.previous) //revisar
        setNext(resp.data.links.next)
    }

    const handleNext = async () => {
        console.log("disparo next");
        let resp = await axios.get(next)
        console.log(resp.data);
        setPersonajes(resp.data.items)
        setPrev(resp.data.links.previous) //revisar
        setNext(resp.data.links.next)
    }

    const handleUltimo = async () => {
        let resp = await axios.get("https://dragonball-api.com/api/characters?page=6")
        console.log(resp.data);
        setPersonajes(resp.data.items)
        setPrev(resp.data.links.previous) //revisar
        setNext(resp.data.links.next)
    }

    const handlePrimera = async () => {
        let resp = await axios.get("https://dragonball-api.com/api/characters?page=1")
        console.log(resp.data);
        setPersonajes(resp.data.items)
        setPrev(resp.data.links.previous) //revisar
        setNext(resp.data.links.next)
    }

    useEffect(() => {
        !valor ? getPersonajes() : getCharacterName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [valor]);

    return (
        <>
            <div className="grid grid-cols-3 gap-2 mt-2">
                {loading ? <Skeleton/> : personajes.map((personaje) => <Gallery key={personaje.id} {...personaje}/>)}
            </div>
            <div>
                {prev && <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handlePrev}>Anterior</button>}
                {next && <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleNext}>Siguiente</button>}

                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handlePrimera}>Primera pagina</button>
                
                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleUltimo}>Ultima pagina</button>

            </div>
        </>
    );
};

export default MainHome;
