import React from "react";
import RestaurantList from "../components/RestaurantList";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <RestaurantList />
    </div>
  );
};

export default Home;