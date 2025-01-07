import { useSelector } from "react-redux";
import { clearItem } from "./Utilis/cartSlice";
import { removeItem } from "./Utilis/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

function Cart() {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const clearIteams = () =>{
        dispatch(clearItem());
    }
    const removeitems = () =>{
        dispatch(removeItem());
    }
    return (
        <div className="flex justify-center flex-col items-center m-5 p-5">
            <h1 className="font-bold text-2xl mb-5">My Cart</h1>
            <div className="flex justify-between gap-x-10">
            <button className="m-2 p-2 bg-red-500 text-white rounded-md justify-start hover:bg-red-800" onClick={clearIteams}>Clear Item</button>
            <button className="p-2 m-2 px-5 bg-green-500 text-white rounded-md justify-center hover:bg-green-800"><Link to={"/"}>Home</Link></button>
            <button className="m-2 p-2 bg-orange-500 text-white rounded-md text-center hover:bg-orange-800"><Link to={"/checkout"}>Checkout</Link></button>
            </div>
            <div>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="shadow-lg flex justify-between my-10 p-4 rounded-lg ">
                            <div className="flex flex-col ml-5">
                                <h2 className="font-bold text-orange-400 mb-1">{item?.card?.info?.name}</h2>
                                <h3 className="font-bold">Price: ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}</h3>
                                <p className="my-2 line-clamp-2">{item?.card?.info?.description?.slice(0, 60)}...</p>
                            </div>
                            <div className="relative flex flex-col">
                                <img className="h-32 w-40 object-cover mb-4 rounded-md" src={`${CDN_URL}${item?.card?.info?.imageId}`} alt={item?.card?.info?.name} />
                                <button className="m-2 p-2 bg-purple-500 text-white rounded-md justify-end hover:bg-red-800" onClick={removeitems}>Remove Item</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center my-10 p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-xl font-semibold">Your cart is empty</h2>
                        <p className="text-gray-500">Add items to your cart from the menu.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
