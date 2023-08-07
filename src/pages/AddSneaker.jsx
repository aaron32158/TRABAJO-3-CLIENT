import { useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"

import { useNavigate } from "react-router-dom"

import { post } from "../services/authService"


const AddSneaker = () => {

    const { user } = useContext(AuthContext)
    
    const [sneaker, setSneaker] = useState({
        owner: user._id,
        type,
            image : " ",
            brand : " ",
            size : " ",
            usage : " ",
            details : " ",
            material : " ",
            color: 0
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/sneakers/new-sneaker', sneaker)
            .then((response) => {
                console.log("New Sneaker", response.data)
                navigate('/all-sneakers')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleTextChange = (e) => {
        setSneaker((prev) => ({...prev, [e.target.name]: e.target.value}))
      }

    const handleNumberChange = (e) => {
        setSneaker((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    }
      
  return (
    <div id="add-sneaker" >
        <h1>Sell Your Sneaker</h1>

        <form onSubmit={handleSubmit}>

            <label>Image</label>
            <input type="text" name="image" value={sneaker.image} onChange={handleTextChange} /> 
            <label>Image</label>
            <input type="text" name="type" value={sneaker.type} onChange={handleTextChange} />
            <label>Image</label>
            <input type="text" name="brand" value={sneaker.brand} onChange={handleTextChange} />
            <label>Image</label>
            <input type="text" name="size" value={sneaker.size} onChange={handleTextChange} />
            <label>Image</label>
            <input type="text" name="usage" value={sneaker.usage} onChange={handleTextChange} />
           
           
           
            <label>Cost</label>
            <input type="number" name="cost" value={sneaker.cost} onChange={handleNumberChange} /> 

            <button type="submit">List Sneaker</button>

        </form>
    </div>
  )
}

export default AddSneaker

