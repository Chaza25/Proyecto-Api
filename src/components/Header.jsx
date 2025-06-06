import { useState } from "react"
import NavBar from "./NavBar"

const Header = (props) => {

    const [nombre, setNombre] = useState("Agustin")

    const handleSubmit = (e) => {
        e.preventDefault()
        props.getValor(nombre)
    }

    return(
        <div className="bg-amber-400">
            <NavBar/>
            <br />
            <h1 className="text-blue-500 text-2xl text-center font-bold">Dragon Ball Z</h1>
            <br />
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Buscar</label>
                <input type="search" placeholder="Valor a buscar" onChange={(e)=>setNombre(e.target.value)}/>
                <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Buscar</button>
            </form>
            <br />
        </div>
    )
}

export default Header