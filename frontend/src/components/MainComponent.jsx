import "./MainComponent.css";
import React, { useState } from "react";
import TravelTimeForm from "./TravelTimeForm";
import Pedidos from "./Pedidos";

const MainComponent = () => {
  const [pedidos, setPedidos] = useState([]);

  const handleTravelTimeCalculated = (pedido) => {
    setPedidos([pedido, ...pedidos]);
  };

  return (
    <main>
      <div id="main-container">
        <TravelTimeForm onTravelTimeCalculated={handleTravelTimeCalculated} />
        <Pedidos pedidos={pedidos} />
      </div>
    </main>
  );
};

export default MainComponent;
