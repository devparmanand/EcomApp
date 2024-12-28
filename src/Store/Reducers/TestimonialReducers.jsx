import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constant";

export default function TestimonialReducer(state=[],action){
let newState,index
    switch(action.type){
        case CREATE_TESTIMONIAL_RED:
            newState=[...state]
            newState.push(action.payload)
            return newState

        case GET_TESTIMONIAL_RED:
            return action.payload

        case UPDATE_TESTIMONIAL_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            state[index].name=action.payload.name
            state[index].message=action.payload.message
            state[index].pic=action.payload.pic
            state[index].active=action.payload.active
            return state
        case DELETE_TESTIMONIAL_RED:
            return  newState= state.filter((x)=>x._id!== action.payload._id)

    
    default:
        return state

}

}