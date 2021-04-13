import { ADD_TODO, DELETE_TODO, FINISH_TODO} from '../Types';





export const AddNewTodoAction = (date, Description) => async dispatch => {

    var todo = { TodoDate: date, description: Description,selected:false }
    dispatch({
        type: ADD_TODO,
        Todo: todo,
    });

}




export const FinishTodoAction = (date,) => async dispatch => {

   
    dispatch({
        type: FINISH_TODO,
        todoDate: date,
    });

}




export const DeleteTodoAction = (date) => async dispatch => {

   
    dispatch({
        type: DELETE_TODO,
        todoDate: date,
    });

}