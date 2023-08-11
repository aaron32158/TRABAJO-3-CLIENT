import { useContext, useEffect } from "react"
import { SneakerContext } from "../context/sneaker.context"
import { Link } from "react-router-dom"

const AllSneakers = () => {

    const { sneakers, getSneakers } = useContext(SneakerContext)

    useEffect(() => {

        getSneakers()

    }, [])

    return (
        <div id="all-sneakers" className="all-sneakers">
    <h1> Sneakers for Sale</h1>
    

            {
                sneakers.map((sneaker) => {
                    return (
                        <Link to={`/sneaker-details/${sneaker._id}`} key={sneaker._id}>
                            <div>
                                <h3> {sneaker.type} </h3>

                                <img id="preview" src={sneaker.image} alt="sneaker" />
                               
                                <p>Size: {sneaker.size}</p>
                                <p>cost :{sneaker.cost}</p>

                            </div>
                        </Link>
                    )
                })
            }
        </div>
        
    )
}

export default AllSneakers