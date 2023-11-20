import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import AddRestaurant from "./routes/AddRestaurant";
import ApiDocs from "./routes/ApiDocs";
import Developers from "./routes/Developers";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route exact path="/restaurants/:id" element={<RestaurantDetailPage />} />
            <Route exact path="/AddRestaurant" element={<AddRestaurant />} />
            <Route exact path="/ApiDocs" element={<ApiDocs />} />
            <Route exact path="/Developers" element={<Developers/>} />
          </Routes>
        </div>
      </Router>
    </RestaurantsContextProvider>
  );
};

export default App;
