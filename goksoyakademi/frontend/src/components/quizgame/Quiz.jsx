import React, { useState, useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import { connect } from "react-redux";

const QuizGame = (props) => {
  const { score, setScore, setGameState } = useContext(QuizContext);
  const [currQuestion, setCurrQuestion] = useState(0);
  const questionsArray = [...props.quizQuestions];
  const [optionChosen, setOptionChosen] = useState("");
  const [isAnswered, setIsAnswered] = useState(
    Array(questionsArray.length).fill(false)
  );
  const [isCorrect, setIsCorrect] = useState(
    Array(questionsArray.length).fill("empty")
  );
  const [correctButtonClass, setCorrectButtonClass] = useState(
    Array(questionsArray.length).fill("choice")
  );
  const [disableOthers, setDisableOthers] = useState(
    Array(questionsArray.length).fill("choice")
  );
  //showSolution
  const handleChoiceClick = (choice) => {
    setOptionChosen(choice);

    if (questionsArray[currQuestion].correctAnswer === choice) {
      //check if the question was answered before
      if (!isAnswered[currQuestion]) {
        setCorrectButtonClass((prevState) => {
          const newState = [...prevState];
          newState[currQuestion] = "choice true-button";
          return newState;
        });

        setDisableOthers((prevState) => {
          const newState = [...prevState];
          newState[currQuestion] = "choice disabled-choice";
          return newState;
        });
        setIsCorrect((prevState) => {
          const newState = [...prevState];
          newState[currQuestion] = "correct";
          return newState;
        });

        setScore(score + 1);
      }
    } else {
      setCorrectButtonClass((prevState) => {
        const newState = [...prevState];
        newState[currQuestion] = "highlighted-choice choice";
        return newState;
      });
      setDisableOthers((prevState) => {
        const newState = [...prevState];
        newState[currQuestion] = "choice false-button";
        return newState;
      });
    }
  };

  const nextQuestion = () => {
    //check we're not on last question
    if (currQuestion !== questionsArray.length - 1) {
      //check if correct
      if (questionsArray[currQuestion].correctAnswer === optionChosen) {
        //check if the question was answered before
        if (!isAnswered[currQuestion]) {
          setIsAnswered((prevState) => {
            const newState = [...prevState];
            newState[currQuestion] = true;
            return newState;
          });
          setOptionChosen(
            "RESETED CHOSEN OPTION IN CASE NEXT QUESTION'S ANSWER IS THE SAME, THEREFORE USER CANT GET A FREE POINT FROM PASSING BY"
          );
        }
      }

      setCurrQuestion(currQuestion + 1);
    }
    //check if we're on last question
    else if (currQuestion === questionsArray.length - 1) {
      //check if the question was answered before
      if (!isAnswered[currQuestion]) {
        setIsAnswered((prevState) => {
          const newState = [...prevState];
          newState[currQuestion] = true;
          return newState;
        });
      }
      finishQuiz();
    }
  };
  const prevQuestion = () => {
    if (currQuestion > 0) {
      setCurrQuestion(currQuestion - 1);
    } else if (currQuestion === 0) {
      return;
    }
  };
  const finishQuiz = () => {
    setIsCorrect(Array(questionsArray.length).fill("empty"));
    setIsAnswered(Array(questionsArray.length).fill(false));

    setGameState("endScreen");
  };

  useState(console.log(optionChosen), [optionChosen]);

  return (
    <div className="container m-auto w-75 h-320">
      <div className="d-flex justify-content-between">
        <div
          onClick={prevQuestion}
          className={
            currQuestion === 0
              ? "fw-bold question-nav disabled-button "
              : "fw-bold question-nav"
          }
        >
          ÖNCEKİ
        </div>
        {isCorrect[currQuestion] === "correct" && (
          <div className=""> DOĞRU CEVAP!</div>
        )}
        <div onClick={nextQuestion} className="fw-bold question-nav">
          {currQuestion === questionsArray.length - 1 ? "--BİTİR--" : "SONRAKİ"}
        </div>
      </div>
      <h2 className="quizGame">
        Question [{currQuestion + 1} / {questionsArray.length}]
      </h2>
      <div className="mb-3"> {questionsArray[currQuestion].question} </div>
      <div className="choices">
        {Object.entries(questionsArray[currQuestion].choices).map(
          ([choiceKey, choiceValue]) =>
            // cevap dogru mu? aşağıdaki kod : classname: disabled-choice choice
            choiceKey === questionsArray[currQuestion].correctAnswer ? (
              <div>
                <div
                  key={choiceKey}
                  className={correctButtonClass[currQuestion]}
                  onClick={() => handleChoiceClick(choiceKey)}
                >
                  {choiceValue}
                </div>
              </div>
            ) : (
              <div>
                <div
                  key={choiceKey}
                  className={disableOthers[currQuestion]}
                  onClick={() => handleChoiceClick(choiceKey)}
                >
                  {choiceValue}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    //quizQuestions yerine başka isim de verebiliriz)
    quizQuestions: state.quiz,
  };
};

export default connect(mapStateToProps)(QuizGame);
// export default QuizGame;
//verilen şıklardan ve sorulardan yeni array oluşturulacak sadece yanlış soruların etiketlerini alıp o konularda zayıf oldugunu göste
