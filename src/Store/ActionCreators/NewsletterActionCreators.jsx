// import { type } from "@testing-library/user-event/dist/type";
import {
  CREATE_NEWSLETTER,
  GET_NEWSLETTER,
  DELETE_NEWSLETTER,
  UPDATE_NEWSLETTER,
} from "../Constant";

export function createNewsletter(data) {
  return {
    type: CREATE_NEWSLETTER,
    payload: data,
  };
}

export function getNewsletter() {
  return {
    type: GET_NEWSLETTER,
  };
}

export function updateNewsletter(data) {
  return {
    type: UPDATE_NEWSLETTER,
    payload: data,
  };
}
export function deleteNewsletter(data) {
  return {
    type: DELETE_NEWSLETTER,
    payload: data,
  };
}
