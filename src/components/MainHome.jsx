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
    const [seleccionarPersonaje, setSeleccionarPersonaje] = useState(null);

    const getPersonajes = async () => {
    try {
        const resp = await axios.get(BASE_URL_CHARACTERS);
        setPersonajes(resp.data.items);
        setLoading(false);
        setPrev(resp.data.links.previous);
        setNext(resp.data.links.next);
    } catch (error) {
        console.error(error);
    }
    };


    const getCharacterName = async () => {
        try {
            setLoading(true);
            let resp;

            if (valor.trim() === "") {
            setPersonajes([]);
            setLoading(false);
            return;
            }

            resp = await axios.get(`${BASE_URL_CHARACTERS}?race=${valor}`);

            if (!resp.data.items?.length && !resp.data.length) {
            resp = await axios.get(`${BASE_URL_CHARACTERS}?name=${valor}`);
            }

            // Detectar si la respuesta es array o tiene .items
            const personajesData = Array.isArray(resp.data)
            ? resp.data
            : resp.data.items || [];

            setPersonajes(personajesData);

            // Prev y Next solo si existen
            setPrev(resp.data?.links?.previous || null);
            setNext(resp.data?.links?.next || null);

            setLoading(false);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setPersonajes([]);
            setLoading(false);
        }
        };



    const handlePrev = async () => {
        try {
            let resp = await axios.get(prev)
            setPersonajes(resp.data.items)
            setPrev(resp.data.links.previous) 
            setNext(resp.data.links.next)    
        } catch (error) {
            console.log("Error en la peticion", error);
        }
    }

    const handleNext = async () => {
        let resp = await axios.get(next)
        setPersonajes(resp.data.items)
        setPrev(resp.data.links.previous) 
        setNext(resp.data.links.next)
    }

    const handleUltimo = async () => {
        let resp = await axios.get("https://dragonball-api.com/api/characters?page=6")
        console.log(resp.data);
        setPersonajes(resp.data.items)
        setPrev(resp.data.links.previous) 
        setNext(resp.data.links.next)
    }

    const handlePrimera = async () => {
        let resp = await axios.get("https://dragonball-api.com/api/characters?page=1")
        console.log(resp.data);
        setPersonajes(resp.data.items)
        setPrev(resp.data.links.previous) 
        setNext(resp.data.links.next)
    }

    useEffect(() => {
        !valor ? getPersonajes() : getCharacterName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [valor]);

    return (
        <div className="bg-yellow-200">
            <div className="p-5 text-center items-center mx-auto">
                {prev && <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handlePrev}>Anterior</button>}
                {next && <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleNext}>Siguiente</button>}
            </div>
        {seleccionarPersonaje && (
            <div className="fixed inset-0 bg-black/70 backdrop-filter backdrop-saturate-150 backdrop-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSeleccionarPersonaje(null)}>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-2xl w-full relative"
                    onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => setSeleccionarPersonaje(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                >
                    &times;
                </button>
                <img
                    src={seleccionarPersonaje.image}
                    alt={seleccionarPersonaje.name}
                    className="w-full h-96 object-contain mb-4 transition-transform duration-300 ease-in-out hover:scale-110"
                    title={`${seleccionarPersonaje.name}`}
                />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    #{seleccionarPersonaje.id} - {seleccionarPersonaje.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300"><span className="text-black text-lg font-semibold">Género:</span> {seleccionarPersonaje.gender}</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="text-black text-lg font-semibold">Ki:</span> {seleccionarPersonaje.ki}</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="text-black text-lg font-semibold">Raza:</span> {seleccionarPersonaje.race}</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="text-black text-lg font-semibold">Afiliacion:</span> {seleccionarPersonaje.affiliation}</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="text-black text-lg font-semibold">Descripción:</span> {seleccionarPersonaje.description}</p>
                </div>
            </div>
            )}

            <div className="grid gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {loading ? <Skeleton /> : personajes.map((personaje) => (
                <Gallery key={personaje.id} {...personaje} setSeleccionarPersonaje={setSeleccionarPersonaje} />
            ))}
            </div>

            <div className="mt-2 text-center items-center mx-auto">
                {prev && <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handlePrev}>Anterior</button>}
                {next && <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleNext}>Siguiente</button>}
            </div>
            <div className="mt-2 text-center items-center mx-auto">
                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handlePrimera}>Primera pagina</button>
                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleUltimo}>Ultima pagina</button>
            </div>
            
        </div>
    );
};

export default MainHome;
