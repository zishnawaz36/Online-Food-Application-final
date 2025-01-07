import axios from "axios";
import "./Style/App.css";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import Resturantdata from "./Resturantdata";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Body({ tokenAdmin }) {
    const [restrodata, setRestrodata] = useState([]);
    const [original, setOriginal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await axios.get(
                    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
                );
                console.log("Full API Response:", data);

                const restaurants =
                    data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
                console.log("Restaurants Data:", restaurants);
                setRestrodata(restaurants);
                setOriginal(restaurants);
                setLoading(false);
            } catch (err) {
                console.log("Error connecting:", err.message);
            }
        };
        fetchdata();
    }, []);

    const filteredData = restrodata.filter((item) =>
        item.info.name.toLowerCase().includes(search.toLowerCase())
    );

    const filterrating = () => {
        const greaterrating = original.filter((item) => item.info.avgRating >= 4);
        setRestrodata(greaterrating);
    };
    const filterveg = () => {
        const pureveg = original.filter((item) => item.info.veg);
        setRestrodata(pureveg);
    };
    const backtohome = () => {
        setRestrodata(original);
    };

    const delivery = () => {
        const filtered = original.filter((item) => item.info.sla.deliveryTime < 30);
        setRestrodata(filtered);
    };

    return (
        <div className="body">
            <Header search={search} setSearch={setSearch} />
            <div className="flex justify-around my-10">
                <button onClick={filterrating} className="shadow-md py-1 px-4 rounded-lg bg-orange-400 text-white font-bold hover:bg-orange-800">
                    Rating 4.0+
                </button>
                <button onClick={filterveg} className="shadow-md py-1 px-4 rounded-lg bg-orange-400 text-white font-bold  hover:bg-orange-800">
                    Pure Veg
                </button>
                <button onClick={delivery} className="shadow-md py-1 px-4 rounded-lg bg-orange-400 text-white font-bold  hover:bg-orange-800">
                    Fast Delivery
                </button>
                <button onClick={backtohome} className="shadow-md py-1 px-4 rounded-lg bg-orange-400 text-white font-bold  hover:bg-orange-800">
                    Back to Original
                </button>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-wrap justify-center gap-4 p-4">
                    {filteredData.map((item) => {
                        console.log(item);
                        const {
                            cloudinaryImageId,
                            name,
                            locality,
                            costForTwo,
                            cuisines,
                            avgRating,
                            sla,
                        } = item.info;
                        const deliveryTime = sla?.deliveryTime;
                        return (
                            <Link to={`/restaurant/${item.info.id}`} key={item.info.id}>

                                <Resturantdata
                                    cloudinaryImageId={cloudinaryImageId}
                                    name={name}
                                    locality={locality}
                                    costForTwo={costForTwo}
                                    cuisines={cuisines}
                                    avgRating={avgRating}
                                    deliveryTime={deliveryTime}
                                    tokenAdmin={tokenAdmin}
                                />
                            </Link>
                        );
                    })}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Body;
