// import { type } from "@testing-library/user-event/dist/type";
import {
  CREATE_TESTIMONIAL,
  GET_TESTIMONIAL,
  DELETE_TESTIMONIAL,
  UPDATE_TESTIMONIAL,
} from "../Constant";

export function createTestimonial(data) {
  return {
    type: CREATE_TESTIMONIAL,
    payload: data,
  };
}

export function getTestimonial() {
  return {
    type: GET_TESTIMONIAL,
  };
}

export function updateTestimonial(data) {
  return {
    type: UPDATE_TESTIMONIAL,
    payload: data,
  };
}
export function deleteTestimonial(data) {
  return {
    type: DELETE_TESTIMONIAL,
    payload: data,
  };
}
