/* eslint-disable */
//@constant variables;
// import {

//     UPDATE_ALARM_DATA,
//     UPDATE_ALARM_ACKNOWLEDGE_INFO
// } from "../utils/constants";

const initialState = {
    todos: [
      { id: 0, text: 'Learn React', completed: true },
      { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
      { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
    ],
    filters: {
      status: 'All',
      colors: []
    }
  }

function TableGamesReducer(state = initialState, action = {}) {
    // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}

export default TableGamesReducer;