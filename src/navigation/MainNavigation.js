import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TodosScreen from '../Screens/TodosScreen'
import AddNewTodo from '../Screens/AddNewTodo';
const TodosStack = createStackNavigator()
var Theme = ''

export const MainNav = (props) => (
    <TodosStack.Navigator headerMode='none' >
        <TodosStack.Screen name='Books'
            component={TodosScreen}
            //if using the default header
            options={{
                title: 'Todo',
                headerTintColor: Theme === 'light' ? '#000000DD' : 'white',
                headerStyle: { backgroundColor: Theme === 'light' ? 'white' : '#000000DD', },
                headerBackTitleVisible: false,

            }} />


        <TodosStack.Screen name='NewTodo'
            component={AddNewTodo}

            options={{
                title: 'New Todo',
                headerTintColor: Theme === 'light' ? '#000000DD' : 'white',
                headerStyle: { backgroundColor: Theme === 'light' ? 'white' : '#000000DD', },
                headerBackTitleVisible: false,
            }} />


    </TodosStack.Navigator>
)

