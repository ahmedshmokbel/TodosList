import React from 'react';
import { Navigation } from "react-native-navigation";
import { AppRegistry } from 'react-native';
import App from "./App";
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/Redux/Store';
import TodosScreen from "./src/Screens/TodosScreen";
import { FilteredTodoListStack, TodoListStack } from './src/navigation/NativeNavigation'
import FiltertedTodos from './src/Screens/FiltertedTodos';

function WrappedComponent(Component) {
    return function inject(props) {
        const EnhancedComponent = () => (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...props} />
                </PersistGate>
            </Provider>
        );
        return <EnhancedComponent />;
    };
}
AppRegistry.registerComponent(appName, () => WrappedComponent(TodosScreen));
Navigation.registerComponent('TodosScreen', () => WrappedComponent(TodosScreen));
Navigation.registerComponent('Filtered', () => WrappedComponent(FiltertedTodos));

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
                        stack:
                            TodoListStack
                    },
                    {
                        stack:
                            FilteredTodoListStack
                    }
                ]
            }
        }
    });
});