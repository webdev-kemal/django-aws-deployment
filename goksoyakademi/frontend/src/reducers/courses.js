import {
  COURSES_REQUEST,
  COURSES_FAIL,
  COURSES_SUCCESS,
  COURSE_DETAIL_REQUEST,
  COURSE_DETAIL_SUCCESS,
  COURSE_DETAIL_FAIL,
} from "../store/constants";

const coursesState = {
  loading: false,
  error: null,
  courses: [],
};

const courseDetailState = {
  loading: false,
  error: null,
  course: { reviews: [] },
};
//CREATE REDUCER
// const coursesReducer = (state = { courses: [] }, action) => {
//   switch (action.type) {
//     case COURSES_REQUEST:
//       return { loading: true, courses: [] };
//     case COURSES_SUCCESS:
//       return { loading: false, courses: action.payload };
//     case COURSES_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export const coursesReducer = (state = coursesState, action) => {
  switch (action.type) {
    case COURSES_REQUEST:
      return { ...state, loading: true };
    case COURSES_SUCCESS:
      return { ...state, loading: false, courses: action.payload };
    case COURSES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//CREATE REDUCER
export const courseDetailReducer = (state = courseDetailState, action) => {
  switch (action.type) {
    case COURSE_DETAIL_REQUEST:
      return { loading: true, ...state };
    case COURSE_DETAIL_SUCCESS:
      return { loading: false, course: action.payload };
    case COURSE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export default coursesReducer;
