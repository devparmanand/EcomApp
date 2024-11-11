// import { type } from "@testing-library/user-event/dist/type";
import {
  CREATE_WISHLIST,
  GET_WISHLIST,
  DELETE_WISHLIST,
  // UPDATE_WISHLIST,
} from "../Constant";

export function createWishlist(data) {
  return {
    type: CREATE_WISHLIST,
    payload: data,
  };
}

export function getWishlist() {
  return {
    type: GET_WISHLIST,
  };
}

// export function updateWishlist(data) {
//   return {
//     type: UPDATE_WISHLIST,
//     payload: data,
//   };
// }
export function deleteWishlist(data) {
  return {
    type: DELETE_WISHLIST,
    payload: data,
  };
}
