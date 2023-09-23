import {
  COURSES_REQUEST,
  COURSES_FAIL,
  COURSES_SUCCESS,
  COURSE_DETAIL_REQUEST,
  COURSE_DETAIL_SUCCESS,
  COURSE_DETAIL_FAIL,
} from "../store/constants";
import axios from "axios";

export const ListCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSES_REQUEST });
    const { data } = await axios.get("http://127.0.0.1:8000/api/courses/main");

    dispatch({ type: COURSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// async function getCourses() {
//     const course = await axios.get(`http://127.0.0.1:8000/api/courses/${id}`);
//     setCourseData(course);
//   }

export const ListCourseDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAIL_REQUEST });
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/courses/main/${id}`
    );

    dispatch({ type: COURSE_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
