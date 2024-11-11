// import { type } from "@testing-library/user-event/dist/type";
import {
    CREATE_MAINCATEGORY,
    GET_MAINCATEGORY,
    DELETE_MAINCATEGORY,
    UPDATE_MAINCATEGORY,
  } from "../Constant";
  
  export function createMaincategory(data) {
    return {
      type: CREATE_MAINCATEGORY,
      payload: data,
    };
  }
  
  export function getMaincategory() {
    return {
      type: GET_MAINCATEGORY,
    };
  }
  
  export function updateMaincategory(data) {
    return {
      type: UPDATE_MAINCATEGORY,
      payload: data,
    };
  }
  export function deleteMaincategory(data) {
    return {
      type: DELETE_MAINCATEGORY,
      payload: data,
    };
  }
  