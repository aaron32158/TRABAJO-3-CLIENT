import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/authService";

const SneakerContext = createContext()

const SneakerProvider = ({ children }) => {

    const [sneakers, setSneakers] = useState([])

    const getSneakers = () => {

        get('/sneakers')
            .then((response) => {
                console.log("Sneakers", response.data)
                setSneakers(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <SneakerContext.Provider value={{ sneakers, getSneakers}}>
            {children}
        </SneakerContext.Provider>
    )
}

export { SneakerContext, SneakerProvider }