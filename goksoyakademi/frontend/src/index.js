import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AlertProvider, useAlertContext } from "./context/AlertContext";
// import { addQuestion, deleteQuestion, editQuestion } from "./actions/quiz";
import { ThemeProvider } from "./context/ThemeContext";

// store.subscribe(() => {
//   console.log(store.getState());
// });

// //CALL ACTION
// const question1 = store.dispatch(
//   addQuestion("Which one is abstract?", "Flowers", "Animals", "Languages", "c")
// );
// const question2 = store.dispatch(
//   addQuestion("Which one is solid?", "Stone", "Sponge", "Smoke", "b")
// );

// // store.dispatch(deleteQuestion(question2.questionData.id));
// store.dispatch(
//   editQuestion(question1.questionData.id, { title: "güncellenmiş başlık" })
// );

//store - theme - chakra - alert - 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <ThemeProvider>
            <AlertProvider>
              <App />
            </AlertProvider>
      </ThemeProvider>
);
