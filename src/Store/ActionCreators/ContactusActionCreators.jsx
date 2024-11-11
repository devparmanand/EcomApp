// import { type } from "@testing-library/user-event/dist/type";
import { CREATE_CONTACT_US,GET_CONTACT_US,DELETE_CONTACT_US,UPDATE_CONTACT_US } from "../Constant";
export function createContact(data) {
  return {
    type: CREATE_CONTACT_US,
    payload: data,
  };
}

export function getContact() {
  return {
    type: GET_CONTACT_US,
  };
}

export function updateContact(data) {
  return {
    type: UPDATE_CONTACT_US,
    payload: data,
  };
}
export function deleteContact(data) {
  return {
    type: DELETE_CONTACT_US,
    payload: data,
  };
}
