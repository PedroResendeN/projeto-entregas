import "./TravelTimeForm.css";
import React, { useState } from "react";
import axios from "axios";

const TravelTimeForm = ({ onTravelTimeCalculated }) => {
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [itens, setItens] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [error, setError] = useState("");

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
  };

  const handleItensChange = (e) => {
    setItens(e.target.value);
  };

  const handleCepSubmit = async (e) => {
    e.preventDefault();

    if (!cep || !numero) {
      setError("Por favor, forneça um CEP válido e número residencial.");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        setError("CEP inválido. Por favor, tente novamente.");
        return;
      }

      const { logradouro, bairro, localidade } = response.data;
      setEndereco({ logradouro, bairro, localidade });
      setError("");
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      setError("Erro ao buscar o CEP.");
    }
  };

  const handleTravelTimeSubmit = async (e) => {
    e.preventDefault();

    if (!endereco || !numero || !itens) {
      setError(
        "Por favor, consulte o CEP, forneça o número residencial e preencha os itens."
      );
      return;
    }

    try {
      const destination = `${endereco.logradouro}, ${numero} - ${endereco.bairro}, ${endereco.localidade}`;

      const response = await axios.get("http://localhost:3000/directions", {
        params: { destination },
      });

      const travelTimeText = response.data.travelTime;
      const expandedTimeInMinutes = calculateExpandedTime(travelTimeText);

      onTravelTimeCalculated({ travelTime: expandedTimeInMinutes, itens });
      setError("");

      // Limpar o formulário
      setCep("");
      setNumero("");
      setItens("");
      setEndereco(null);
    } catch (error) {
      console.error("Erro ao buscar o tempo de viagem:", error);
      setError("Erro ao buscar o tempo de viagem.");
    }
  };

  const calculateExpandedTime = (timeText) => {
    const timeParts = timeText.split(" ");
    let totalMinutes = 0;

    for (let i = 0; i < timeParts.length; i++) {
      const part = timeParts[i];
      if (part === "hour" || part === "hours") {
        totalMinutes += parseInt(timeParts[i - 1], 10) * 60;
      } else if (part === "min" || part === "mins") {
        totalMinutes += parseInt(timeParts[i - 1], 10);
      }
    }

    totalMinutes += 30;
    return totalMinutes;
  };

  return (
    <div>
      <form id="form-dados" onSubmit={handleCepSubmit}>
        <label>
          <h2 className="icone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#000"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>
          </h2>
          Descrição do pedido:
          <input
            type="text"
            value={itens}
            onChange={handleItensChange}
            placeholder="Digite seu pedido"
            required
          />
        </label>
        <hr />
        <h2 className="icone">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#000"
          >
            <path d="M428-520h-70 150-80ZM200-200q-83 0-141.5-58.5T0-400q0-83 58.5-141.5T200-600h464l-80-80H440v-80h143q16 0 30.5 6t25.5 17l139 139q78 6 130 63t52 135q0 83-58.5 141.5T760-200q-83 0-141.5-58.5T560-400q0-18 2.5-35.5T572-470L462-360h-66q-14 70-69 115t-127 45Zm560-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm-560 0q38 0 68.5-22t43.5-58H200v-80h112q-13-36-43.5-58T200-520q-50 0-85 35t-35 85q0 50 35 85t85 35Zm198-160h30l80-80H358q15 17 25 37t15 43Z" />
          </svg>
        </h2>
        <label>
          CEP:
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            placeholder="Digite o CEP"
            required
          />
        </label>
        <label>
          Número Residencial:
          <input
            type="text"
            value={numero}
            onChange={handleNumeroChange}
            placeholder="Digite o número residencial"
            required
          />
        </label>
        <button type="submit">Confirmar</button>
      </form>
      {endereco && (
        <div id="dados-cep">
          <p>
            <strong>Rua:</strong> {endereco.logradouro}
          </p>
          <p>
            <strong>Bairro:</strong> {endereco.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {endereco.localidade}
          </p>
        </div>
      )}
      {endereco && (
        <form id="form-comprar" onSubmit={handleTravelTimeSubmit}>
          <button type="submit">Comprar</button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TravelTimeForm;
