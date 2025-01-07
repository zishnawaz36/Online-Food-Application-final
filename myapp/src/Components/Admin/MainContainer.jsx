import MainHeader from "./HeaderMain";
import FoodItem from "./Foodite";
import LocationFinder from "./LocationFinder";
function MainContinerLayout() {
  return (
    <>
    <div
      className="w-full bg-cover bg-center relative"
      style={{
        height: "40vh",
        backgroundImage: `url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')`,
      }}
    >
     
      <MainHeader />
      <div className="flex flex-col">
      <div className="flex justify-center items-center font-bold text-white text-3xl mt-5">
        <h1 className="animate-bounce">Welcome to Delicious Food & Feels like home</h1>
      </div>
      <div className="flex justify-center items-center font-bold text-white text-lg ">
        <LocationFinder/>
      </div>
      </div>
      
    </div>
    <FoodItem/>
   
    </>
  );
}

export default MainContinerLayout;
