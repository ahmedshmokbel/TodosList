import {
    ADD_TODO, FINISH_TODO, DELETE_TODO
} from '../Types';

const initialState = {

    Todos: [],


};
const TodosReducer = (state = initialState, action) => {

    switch (action.type) {


        case ADD_TODO:

            return {
                ...state,
                Todos: [...state.Todos, action.Todo]
            }

        case FINISH_TODO:
            {
                var editedState = [...state.Todos]

                let TodoIndex = editedState.findIndex((obj => obj.TodoDate == action.todoDate));
                let SelectedItem = editedState[TodoIndex]
                SelectedItem.selected = !SelectedItem.selected


                state.Todos = editedState

            }


            return {
                ...state
            }




        case DELETE_TODO:
            {
                var editedState = [...state.Todos]

                let TodoIndex = editedState.findIndex((obj => obj.TodoDate == action.todoDate));

                if (TodoIndex !== -1) {
                    editedState.splice(TodoIndex, 1);
                    state.Todos = editedState
                }

            }


            return {
                ...state
            }
        default:
            return state;
    }
};



export default TodosReducer;