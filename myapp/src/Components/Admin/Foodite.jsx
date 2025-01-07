import { useEffect, useState } from "react";

function FoodItem() {
  const foodItem = ["Biryani", "Cake", "Momo", "Pizza", "Chinese", "Rolls", "Burger", "Noodles", "Cutlet", "Pakoda", "Pure Veg", "Samosa"];
  const [callFood, setCallFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const foodData = [];
      for (let i = 0; i < foodItem.length; i++) {
        const item = foodItem[i];
        const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/${item}.png`;
        foodData.push({ name: item, image: imageUrl });
      }
      setCallFood(foodData);
    };

    fetchData();
  }, []);

  // Divide the items into two rows
  const halfIndex = Math.ceil(foodItem.length / 2);
  const firstRow = callFood.slice(0, halfIndex);
  const secondRow = callFood.slice(halfIndex);

  return (
    <div className="p-4">
      {callFood.length > 0 ? (
        <>
          {/* Render the first row */}
          <div className="flex justify-center space-x-16 mb-4 rounded-lg ">
            {firstRow.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[150px] p-2 border rounded shadow-lg animate-moveX "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            ))}
          </div>

          {/* Render the second row */}
          <div className="flex justify-center space-x-16">
            {secondRow.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[150px] p-2 border rounded shadow-lg animate-moveX"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FoodItem;
