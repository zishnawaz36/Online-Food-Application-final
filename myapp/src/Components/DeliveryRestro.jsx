import axios from "axios";
import { useEffect, useState } from "react";
import DeliveryRestrodata from "./Deliveryrestrodata";
import { Link } from "react-router-dom";

function DeliveryRestro() {
  const [deliverydata, setDeliverydata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        console.log(data);
        const restaurants = data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setDeliverydata(restaurants);
      } catch (err) {
        console.log("Error connecting:", err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="box">
      <div className="box2">
        {deliverydata.map((i) => {
          const { cloudinaryImageId, name, locality, costForTwoString, cuisines, avgRating, id } = i.info; 

          return (
            <Link key={id} to={`/resturant/${id}`}>
              <DeliveryRestrodata
                cloudinaryImageId={cloudinaryImageId}
                name={name}
                locality={locality}
                costForTwoString={costForTwoString}
                cuisines={cuisines}
                avgRating={avgRating}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default DeliveryRestro;
