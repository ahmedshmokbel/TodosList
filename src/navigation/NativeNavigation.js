export const TodoListStack = {
    children: [
        {
            component: {
                name: 'TodosScreen',
                options: {
                    topBar: {
                        visible: false,

                    },
                    bottomTab: { text: 'Todos List' }
                }
            },
        },
    ],
};




export const FilteredTodoListStack = {
    children: [
        {
            component: {
                name: 'Filtered',
                options: {
                    topBar: {
                        visible: false,

                    },
                    bottomTab: { text: 'Filtered List' }
                }
            },
        },
    ],
};