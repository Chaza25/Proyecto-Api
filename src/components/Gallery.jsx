const Gallery = ({ name, id, image, race, ki, gender, affiliation, description, setSeleccionarPersonaje }) => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden">
        <div className="w-full h-90 bg-white flex items-center justify-center relative overflow-relative">
            <img src={image} alt={name} title={`${name}`} onClick={() => setSeleccionarPersonaje({ name, id, image, race, ki, gender, affiliation, description })} className="max-h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110 absolute z-10" />
        </div>
        <div className="p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            #{id} - {name}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">Género: {gender}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Ki: {ki}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Raza: {race}</p>
            <button
            onClick={() => setSeleccionarPersonaje({ name, id, image, race, ki, gender, affiliation, description })}
            className="w-full flex justify-center items-center gap-2 text-sm text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg"
            >
            Ver más
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            </button>
        </div>
        </div>
    );
};


export default Gallery