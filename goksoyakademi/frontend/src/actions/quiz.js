//3  DISPATCH ACTIONS
import { v4 as uuid } from "uuid";
//CREATE ACTIONS
export const addQuestion = (
  //PARAMS BY DEFAULT
  question = "",
  a = "A",
  b = "B",
  c = "C",
  d = "D",
  correct = "a"
) => ({
  //THE ARROW FUNCTION RETURNS THIS OBJECT => ({})!
  type: "ADD_QUESTION",
  questionData: {
    id: uuid(),
    question: question,
    choices: {
      a: a,
      b: b,
      c: c,
    },
    correctAnswer: correct,
  },
});

//another action
export const deleteQuestion = (id) => ({
  type: "DELETE_QUESTION",
  id: id,
});
export const editQuestion = (id, changes) => ({
  type: "EDIT_QUESTION",
  id,
  changes,
});
