// import { type } from "@testing-library/user-event/dist/type";
import {
  CREATE_PRODUCT,
  GET_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_QUANTITY,
} from "../Constant";

export function createProduct(data) {
  return {
    type: CREATE_PRODUCT,
    payload: data,
  };
}

export function getProduct() {
  return {
    type: GET_PRODUCT,
  };
}

export function updateProduct(data) {
  return {
    type: UPDATE_PRODUCT_QUANTITY,
    payload: data,
  };
}

export function updateProductQuantity(data) {
  return {
    type: UPDATE_PRODUCT,
    payload: data,
  };
}

export function deleteProduct(data) {
  return {
    type: DELETE_PRODUCT,
    payload: data,
  };
}
