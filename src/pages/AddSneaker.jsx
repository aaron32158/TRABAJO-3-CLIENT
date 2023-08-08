import { useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"

import { useNavigate } from "react-router-dom"

import { post } from "../services/authService"


const AddSneaker = () => {

    const { user } = useContext(AuthContext)
    
    const [sneaker, setSneaker] = useState({
            owner: user?._id,
            type: "", 
            image : "",
            brand : "",
            size : "",
            usage : "",
            details : "",
            material : "",
            color: "",
            cost: 0,

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
            <label>name</label>
            <input type="text" name="type" value={sneaker.type} onChange={handleTextChange} />
            <label>brand</label>
            <input type="text" name="brand" value={sneaker.brand} onChange={handleTextChange} />
            <label>size</label>
            <input type="text" name="size" value={sneaker.size} onChange={handleTextChange} />
            <label>usage</label>
            <input type="text" name="usage" value={sneaker.usage} onChange={handleTextChange} />
            <label>details</label>
            <input type="text" name="details" value={sneaker.details} onChange={handleTextChange} />
            <label>material</label>
            <input type="text" name="material" value={sneaker.material} onChange={handleTextChange} />
            <label>color</label>
            <input type="text" name="color" value={sneaker.color} onChange={handleTextChange} />
            <label>cost</label>
            <input type="number" name="cost" value={sneaker.cost} onChange={handleNumberChange} />
           
           
           
            
            <button type="submit">List Sneaker</button>

        </form>
    </div>
  )
}

export default AddSneaker

