import React, { useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import "../../pages/quiz/Quiz.css";
const MainMenu = () => {
  const { gameState, setGameState } = useContext(QuizContext);

  return (
    <div>
      <div className="menu ">
        <br />
        <strong>Sorular: </strong>8<br />
        <strong>Süre: </strong>10 DK
        <br />
        <button
          className=" btn mt-3 btn-md bg-success text-white"
          onClick={() => {
            setGameState("quiz");
          }}
        >
          Teste Başla!
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
