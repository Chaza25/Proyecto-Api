const Footer = () => {
    return(
        <div className="bg-yellow-200 p-4">
            <footer className="bg-zinc-600 rounded-lg shadow-sm dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-md font-thin text-white sm:text-center dark:text-gray-400">© 2025 Agustin Chazarreta Cruz™. Todos los derechos reservados.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://agustinchazacruz.netlify.app/"target="_blank" rel="noopener noreferrer" className="hover:underline">Contacto</a>
                    </li>
                </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer