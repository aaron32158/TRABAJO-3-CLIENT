import { useContext, useEffect } from "react"
import { SneakerContext } from "../context/sneaker.context"
import { Link } from "react-router-dom"

const AllSneakers = () => {

    const { sneakers, getSneakers } = useContext(SneakerContext)

    useEffect(() => {

        getSneaekrs()

    }, [])

    return (
        <div id="all-sneakers">
            <h1>Used Sneakers for Sale</h1>

            {
                sneakers.map((sneaker) => {
                    return (
                        <Link to={`/sneaker-details/${sneaker._id}`} key={sneaker._id}>
                            <div>

                                <img id="preview" src={sneaker.image} alt="sneaker" />
                                <p>{sneaker.size}</p>
                                <p>{sneaker.cost}</p>

                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default AllSneakers