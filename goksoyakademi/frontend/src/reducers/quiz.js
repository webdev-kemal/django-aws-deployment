//1
//CREATE STATE
const quizQuestions = [
  {
    id: 1,
    question: "By the time she arrives, we ___ for over an hour.",
    choices: {
      a: "will be waiting",
      b: "will have waited",
      c: "are waiting",
    },
    correctAnswer: "b",
  },
  {
    id: 3,
    question: "Had they known about the traffic, they ___ earlier.",
    choices: {
      a: "would leave",
      b: "would have left",
      c: "will have left",
    },
    correctAnswer: "b",
  },
  {
    id: 3,
    question: "She said she ___ coming to the party.",
    choices: {
      a: "is",
      b: "was",
      c: "were",
    },
    correctAnswer: "b",
  },
  {
    id: 4,
    question: "He's the man ___ car was stolen.",
    choices: {
      a: "who's",
      b: "whose",
      c: "whom",
    },
    correctAnswer: "b",
  },
  {
    id: 5,
    question: "She would have come if you ___ her.",
    choices: {
      a: "invite",
      b: "invited",
      c: "had invited",
    },
    correctAnswer: "c",
  },
  {
    id: 6,
    question: "I’m tired because I ___ all day.",
    choices: {
      a: "work",
      b: "worked",
      c: "have been working",
    },
    correctAnswer: "c",
  },
  {
    id: 5,
    question: "I ___ to the cinema tonight, but I’m not sure yet.",
    choices: {
      a: "might be going",
      b: "must go",
      c: "should go",
    },
    correctAnswer: "a",
  },
];

// Add more questions as needed

//CREATE REDUCER
const quizReducer = (state = quizQuestions, action) => {
  switch (action.type) {
    case "ADD_QUESTION":
      return [...state, action.questionData];
    //payload olması lazım... questionData yanlış
    case "DELETE_QUESTION":
      return state.filter(({ id }) => {
        return id !== action.id;
      });
    case "EDIT_QUESTION":
      return state.map((question) => {
        if (question.id === action.id) {
          return { ...question, ...action.changes };
        } else {
          return question;
        }
      });
    default:
      return state;
  }
};

export default quizReducer;
