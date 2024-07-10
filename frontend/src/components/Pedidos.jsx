import "./Pedidos.css";
import React from "react";
import CountdownTimer from "./CountdownTimer";

const Pedidos = ({ pedidos }) => {
  return (
    <div id="container-pedidos">
      <h2>Pedidos</h2>
      <ul>
        {pedidos.map((pedido, index) => (
          <li key={index}>
            <p id="itens-comprados">
              <strong>Compra:</strong> {pedido.itens}
            </p>
            <div id="timer">
              <CountdownTimer minutes={pedido.travelTime} />
              <span id="aviso">(Incluso 30min de preparo)</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedidos;
