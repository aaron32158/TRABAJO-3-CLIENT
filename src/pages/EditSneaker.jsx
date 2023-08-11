import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SneakerContext } from "../context/sneaker.context" 

import { get, post } from "../services/authService"


const EditSneaker = () => {

    const [sneaker, setSneaker] = useState(null)

    const { sneakers, setSneakers } = useContext(SneakerContext)

    const { sneakerId } = useParams()

    const navigate = useNavigate()


    const handleTextChange = (e) => {
        setSneaker((prev) => ({...prev, [e.target.name]: e.target.value}))
      }

    const handleNumberChange = (e) => {
        setSneaker((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        post(`/sneakers/sneaker-update/${sneakerId}`, sneaker)
            .then((response) => {

                let newSneakers = [...sneakers]
                let sneakerIndex = sneakers.findIndex(sneaker => sneaker._id === response.data._id)
                newSneakers[sneakerIndex] = response.data
                
                setSneakers(newSneakers)

                navigate(`/sneaker-details/${response.data._id}`)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    useEffect(() => {

        if(!sneakers.length) {

            get(`/sneakers/sneaker-detail/${sneakerId}`)
                .then((response) => {
                    console.log("Found sneaker", response.data)
                    setSneaker(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {

            let thisSneaker = sneakers.find((sneaker) => sneaker._id === sneakerId)
    
            setSneaker(thisSneaker)
        }

    }, [])

  return (
    <div>
       <h1>Edit Sneaker</h1>

       {sneaker ? 
       
       <form onSubmit={handleSubmit}>

            <label>type</label>
            <input type="text" name="type" value={sneaker.type} onChange={handleTextChange} /> 
<br />
            <label> Image</label>
            <input type="text" name="image" value={sneaker.image} onChange={handleTextChange} /> 
            <br />
            <label>Brand</label>
            <input type="text" name="brand" value={sneaker.brand} onChange={handleTextChange} /> 
            <br />
            <label>Size</label>
            <input type="number" name="size" value={sneaker.size} onChange={handleNumberChange} /> 
            <br />
            <label>usage</label>
            <input type="text" name="usage" value={sneaker.usage} onChange={handleTextChange} /> 
           <br />
            <button type="submit">Update sneaker</button>

           
            <label>details</label>
            <input type="text" name="details" value={sneaker.details} onChange={handleTextChange} /> 
            <br />
            <label>Material</label>
            <input type="text" name="material" value={sneaker.material} onChange={handleTextChange} /> 
            <br />
            <label>Color</label>
            <input type="text" name="color" value={sneaker.color} onChange={handleTextChange} /> 
            <br />
            <label>Cost</label>
            <input type="number" name="cost" value={sneaker.cost} onChange={handleNumberChange} /> 
       </form>
      

       : <p>Loading...</p>
       
       }

    </div>
  )
}

export default EditSneaker