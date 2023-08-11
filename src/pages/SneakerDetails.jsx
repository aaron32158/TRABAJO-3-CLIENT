import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { SneakerContext } from "../context/sneaker.context" 
import { AuthContext } from "../context/auth.context"
import { CartContext } from "../context/cart.context"

import { post } from "../services/authService"


const SneakerDetails = () => {

    const [sneaker, setSneaker] = useState(null)

    const { sneakers, getSneakers, setSneakers } = useContext(SneakerContext)

    const { user } = useContext(AuthContext)

    const { cart, setCart } = useContext(CartContext)

    const { sneakerId } = useParams()

    const navigate = useNavigate()

    const isOwner = () => {
        return user._id === sneaker.owner
    }

    const deleteSneaker = () => {

        post(`/sneakers/delete-sneaker/${sneakerId}`, sneaker)
            .then((response) => {
                let newSneakers = sneakers.filter(sneaker => sneaker._id !== response.data._id)
                setSneakers(newSneakers)
                navigate('/all-sneakers')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addToCart = () => {
                
        if(cart.message) {
            
            const body = {
                sneakerId,
                sneakerCost: sneaker.cost,
                
            }

            console.log("Body", body)

            console.log("User", user)

            post('/cart/create', body)
                .then((response) => {
                    console.log("New cart", response.data)
                    setCart(response.data)
                    navigate('/cart')
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            const body = {
                sneakerId,
                sneakerCost: sneaker.cost,
                cartId: cart._id
            }

            console.log("CART EXISTS", cart.message)

            post('/cart/update', body)
            .then((response) => {
                console.log("Updated cart", response.data)
                setCart(response.data)
                navigate('/cart')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    
    }

    useEffect(() => {

        if(!sneakers.length) {
            getSneakers()
        }

        let thisSneaker = sneakers.find((sneaker) => sneaker._id === sneakerId)

        setSneaker(thisSneaker)

    }, [sneakerId, sneakers])


  return (
    <div id="sneaker-details" class="sneaker-details">
       <div id="sneakerscolordetails"> <h1>Sneaker Details</h1></div>

        {
            sneaker ?

            <div>

                {

                    user &&


                        <>
                        
                            {isOwner() &&  
                                <>
                                    <Link to={`/edit-sneaker/${sneaker._id}`}><button>Edit Sneaker</button></Link>
                                    <button onClick={deleteSneaker}>Remove Listing</button>
                                </>
                            }
                            {!isOwner() &&  
                                <>
                                    <button onClick={addToCart} >Add to Cart</button>
                                </>
                            }
                        
                        </>                    

                }

                <img id="preview" src={sneaker.image} alt="sneaker" />
                <div id="sneakerdetailssize">
                <p>size:{sneaker.size}</p>
                <p>material:{sneaker.material}</p>
                <p>color:{sneaker.color}</p>
                <p>Details: {sneaker.details}</p>
                <h5>${sneaker.cost}</h5>
                <h6>Sold by: {sneaker.owner}</h6>
                </div>
                    <>

                            {

                                sneaker.comments.length ? (

                                    <>
                                        {
                                            sneaker.comments.map((comment) => {
                                                return (
                                                    <>
                                                        <p>{comment.comment}</p>
                                                        <h6>-{comment.author.username}</h6>
                                                    </>
                                                )
                                            })
                                        }
                                    </>                                    

                                ) : null

  

                            }
                    </>
            </div>

            : <p>Loading...</p>

        }
    

    </div>

  )
}

export default SneakerDetails



