import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MainHome from "../components/MainHome"

const Home = () => {

    const [valor, setValor] = useState("")

    const getValor = (newValor) => {
        setValor(newValor)
    }

    return(
        <div>
            <Header getValor={getValor}/>
            <MainHome valor={valor}/>
            <Footer/>
        </div>
    )
}

export default Home