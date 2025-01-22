// import { type } from "@testing-library/user-event/dist/type";
import {
  CREATE_CHECKOUT,
  GET_CHECKOUT,
  DELETE_CHECKOUT,
  UPDATE_CHECKOUT,
} from "../Constant";

export function createCheckout(data) {
  
  
  return {
    type: CREATE_CHECKOUT,
    payload: data,
  };
}

export function getCheckout() {
  return {
    type: GET_CHECKOUT,
  };
}

export function updateCheckout(data) {
  return {
    type: UPDATE_CHECKOUT,
    payload: data,
  };
}
export function deleteCheckout(data) {
  return {
    type: DELETE_CHECKOUT,
    payload: data,
  };
}
