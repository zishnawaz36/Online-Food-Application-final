import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Loading from "./Loading";
import "./Style/App.css";
import Header from "./Header";
import { addItem } from "./Utilis/cartSlice";
import { useParams } from "react-router-dom";

export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

function Resturantmenu({ tokenAdmin }) {
    const [storehotel, setStorehotel] = useState(null);
    const [storemenu, setStoremenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const { resid } = useParams();
    const dispatch=useDispatch();
    const addToCartHandler = (item) => {
        console.log("Data : ", item);
       dispatch(addItem(item));
        console.log("Admin Token:", tokenAdmin);
    };
    useEffect(() => {
        const fetchmenu = async () => {
            try {
                const { data } = await axios.get(
                    `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5743545&lng=88.3628734&restaurantId=${resid}`
                );

                const hotelnames = data?.data?.cards?.[2]?.card?.card?.info || null;
                const menunames = data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card?.itemCards || [];

                setStorehotel(hotelnames);
                setStoremenu(menunames);
                setLoading(false);
            } catch (err) {
                console.log("Error connecting to API:", err.message);
                setLoading(false);
            }
        };
        fetchmenu();
    }, [resid]);

    return (
        <>
            <Header />
            {loading ? (
                <Loading />
            ) : (
                <div className="menudetails">
                    <div className="flex justify-center">
                        {storehotel ? (
                            <>
                                <h1 className="text-2xl font-bold mt-4 text-center">{storehotel.name}</h1>
                                <div className="flex flex-col h-40 w-[700px] my-20 bg-gray-50 shadow-md rounded-xl p-4">
                                    <p>Cuisines: {storehotel.cuisines?.join(", ")} - {storehotel.costForTwoMessage}</p>
                                    <p className="font-bold text-orange-500">{storehotel.name}</p>
                                    <p className="text-green-500">Rating: {storehotel.avgRating}⭐</p>
                                    <p>Locality: {storehotel.areaName}</p>
                                    <p className="font-bold text-orange-400">{storehotel.sla.maxDeliveryTime}-{storehotel.sla.minDeliveryTime} mins</p>
                                </div>
                            </>
                        ) : (
                            <h1>Hotel information not available</h1>
                        )}
                    </div>
                    <div className="flex flex-col w-[800px]">
                        {storemenu.length > 0 ? (
                            storemenu.map((item, index) => (
                                <div key={index} className="shadow-lg flex justify-between my-10 p-4 rounded-lg">
                                    <div className="flex flex-col ml-5">
                                        <h2 className="font-bold text-orange-400 mb-1">{item?.card?.info?.name}</h2>
                                        <h3 className="font-bold">Price: ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}</h3>
                                        <p className="my-2 line-clamp-2">{item?.card?.info?.description?.slice(0, 60)}...</p>
                                    </div>
                                    <div className="relative">
                                        <img className="h-32 w-40 object-cover mb-4 rounded-md" src={`${CDN_URL}${item?.card?.info?.imageId}`} alt={item?.card?.info?.name} />
                                        <button className="absolute bottom-2 right-2 bg-black text-white py-1 px-3 rounded-md shadow-lg hover:bg-orange-600 transition-all" onClick={() => addToCartHandler(item)}>Add +</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center my-10 p-4 border border-gray-300 rounded-lg">
                                <h2 className="text-xl font-semibold">No menu available</h2>
                                <p className="text-gray-500">It seems there are currently no items available on the menu.</p>
                                <p className="text-gray-500">Please check back later or contact the restaurant for more information.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Resturantmenu;
