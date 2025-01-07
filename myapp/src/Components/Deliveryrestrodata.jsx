import { CDN_URL } from "./Utilis/constraint";

function DeliveryRestrodata({ cloudinaryImageId, name, locality, costForTwoString, cuisines, avgRating }) {
  return (
    <div className="extract">
      <div className="inner">
        <img
          className="resturant-img"
          src={CDN_URL + cloudinaryImageId}
          alt={`${name} restroimage`}
        />
        <h1 className="text-orange-400">{name}</h1>
        <h2>Locality : {locality}</h2>
        <h2>{costForTwoString}</h2>
        <h2>Cuisines : {cuisines}</h2> 
        <h2>Rating : {avgRating} ⭐</h2>
      </div>
    </div>
  );
}

export default DeliveryRestrodata;
