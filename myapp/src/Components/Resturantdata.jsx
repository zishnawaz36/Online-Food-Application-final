import { CDN_URL } from "./Utilis/constraint";

function Resturantdata({
    cloudinaryImageId,
    name,
    locality,
    costForTwo,
    cuisines,
    avgRating,
    deliveryTime,
}) {
    return (
        <div className="flex flex-col items-center p-4 m-12 bg-white shadow-md rounded-lg w-64 h-96 overflow-hidden transition-transform transform hover:scale-105 my-4"> 
            <img
                className="w-full h-40 object-cover rounded-lg"
                src={CDN_URL + cloudinaryImageId}
                alt={`${name} restaurant`}
            />
            <h2 className="mt-2 my-2 text-lg font-semibold text-gray-800 py-1 w-full whitespace-nowrap overflow-hidden text-ellipsis">{name}</h2>
            <h3 className="text-sm my-2 text-gray-600 w-full whitespace-nowrap overflow-hidden text-ellipsis">Locality: {locality}</h3>
            <h3 className="text-sm my-2 text-gray-600 w-full whitespace-nowrap overflow-hidden text-ellipsis">Cost for Two: ₹{costForTwo}</h3>
            <h3 className="text-sm my-2 text-gray-600 w-full whitespace-nowrap overflow-hidden text-ellipsis">Cuisines: {cuisines.join(", ")}</h3>
            <h3 className="flex items-center my-2 text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis text-green-500">
                Avg Rating: {avgRating} <span className="ml-1 text-yellow-500">⭐</span>
            </h3>
            <h3 className="text-sm text-orange-600 font-bold w-full whitespace-nowrap overflow-hidden text-ellipsis">Delivery Time: {deliveryTime} mins</h3>
        </div>
    );
}

export default Resturantdata;
