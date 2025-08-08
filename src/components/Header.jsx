import { useState } from "react"

const Header = (props) => {

    const [nombre, setNombre] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        props.getValor(nombre)
    }

    return(
        <div className="bg-zinc-600">
            <br />
            <h1 className="text-yellow-300 text-3xl text-center font-bold">Dragon Ball Z API</h1>
            <br />
            <form action="" onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <label htmlFor="" className="text-xl font-semibold">Buscar personaje o personajes</label>
                <input type="search" placeholder="Buscar por nombre o raza" className="rounded-sm border-2 bg-white w-60 h-8 text-center" onChange={(e)=>setNombre(e.target.value)}/>
                <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Buscar</button>
            </form>
            <br />
        </div>
    )
}

export default Header