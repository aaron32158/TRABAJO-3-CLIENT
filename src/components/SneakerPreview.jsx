import { Link } from "react-router-dom";

const SneakerPreview = ({ sneaker }) => {
    
  return (


        <Link to={`/sneaker-details/${sneaker._id}`}>
          <div>
            <img id="preview" src={sneaker.image} alt="sneaker" />
            <p>{sneajer.size}</p>
            <p>{sneaker.cost}</p>
          </div>
        </Link>


  );
};

export default SneakerPreview;