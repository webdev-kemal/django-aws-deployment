import React from "react";
import { useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import { Link } from "react-router-dom";

const EndScreen = () => {
  const { score } = useContext(QuizContext);

  return (
    <div>
      <br />
      Doğru cevap sayısı: <h2>{score}</h2>
      Eğitmen: <h2>Ali Haydar Göksoy</h2>
      <Link
        to="/"
        className=" btn mt-3 btn-md bg-success text-white"
        onClick={() => {}}
      >
        Teslim Et
      </Link>
    </div>
  );
};

export default EndScreen;
