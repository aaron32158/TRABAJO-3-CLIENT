import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart.context";
import { post } from "../services/authService";
import SneakerPreview from "../components/SneakerPreview";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const removeSneaker = (id) => {
    console.log("Removing", id);

    post(`/cart/remove-sneaker/${id}`, cart)
      .then((response) => {
        console.log("Removed", response.data);
        setCart(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="YourCart">
      <h1>Your Cart</h1>

      {cart ? (
        <div >
          {cart.sneakers.length === 0 ? (
            <div>
              <h3>Your cart is empty</h3>
              <p>
                See all the merchandise and <Link to="/sneakers">add something</Link>.
              </p>
            </div>
          ) : (
            <div>
              {cart.sneakers.map((sneaker) => (
                <div key={sneaker._id}>
                  <SneakerPreview sneaker={sneaker} />
                  <button onClick={() => removeSneaker(sneaker._id)}>Remove</button>
                </div>
              ))}
              <h5>Subtotal: ${cart.subtotal}</h5>
              <h5>Shipping: $ 10</h5>
              <h4>Total: ${cart.total.toFixed(2)}</h4>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cart;