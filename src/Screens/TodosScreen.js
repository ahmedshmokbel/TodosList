import React, { useState, useEffect, useCallback, ReactNode, } from 'react';
import { View, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, useColorScheme, } from "react-native";
import { useDispatch, useSelector, } from 'react-redux';
import { ThemeStyle } from '../Utilities/Theme';
import TodoComponent from '../Components/TodosComponent/TodoComponent'
import Header from '../Components/Header'
import CustomText from '../Components/CustomText'
import FloatingAddButtom from '../Components/FloatingAddButton'
import CustomModal from '../Components/CustomModal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AddNewTodo from './AddNewTodo'
import SearchBar from '../Components/SearchBar'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import { DeleteTodoAction, FinishTodoAction } from '../Redux/Actions/TodosAction';

export default TodosScreen = () => {

    const dispatch = useDispatch()
    const Todos = useSelector((state) => state.todo).Todos;
    const [todos, setTodos] = useState([])
    const [filterTodo, setFilterTodo] = useState([])
    const [search, setSearch] = useState('')

    const [visible, setVisible] = useState(false);

    const colorScheme = useColorScheme();

    useEffect(() => {

        if (search === '') {
            GetTodos()
        }


    });


    const GetTodos = () => {

        var toDos = Todos.sort(function (a, b) { return new Date(b.TodoDate) - new Date(a.TodoDate) });
        setTodos(toDos)
        setFilterTodo(toDos)
    }


    const _onSelected = (value) => {

        dispatch(FinishTodoAction(value))
    }

    const _onDelete = (value) => {

        dispatch(DeleteTodoAction(value))
    }




    const Search = (searchText) => {

        setSearch(searchText)
        let filteredData = todos.filter(function (item) {
            return item.description.includes(searchText);
        });

        setFilterTodo(filteredData)
    }

    const onClear = () => {

        setSearch('')
        let filteredData = todos.filter(function (item) {
            return item.description.includes('');
        });

        setFilterTodo(todos)
    }
    const _renderItem = ({ item, index }) => {

        return (
            <TodoComponent

                index={index}
                onSelected={_onSelected}
                onDelete={_onDelete}
                initialNumToRender={10}
                //   navigation={navigation}
                {...item}
            />

        );
    }

    const _OnAddNew = (value) => {
        setVisible(value)
    }


    return (

        <TouchableWithoutFeedback style={[styles.container, colorScheme === 'light' ? ThemeStyle.lightContainer : ThemeStyle.darkContainer]} >
            <View style={styles.container}>
                <Header title={'Todo List'} hasRight={false} hasLeft={false} />
                <CustomText extraStyle={{ marginHorizontal: wp(5), color: colorScheme == 'light' ? 'black' : 'white', fontSize: Platform.OS == 'ios' ? (14) : 13, textAlign: "left" }} text={'Are you ready to complete you tasks?'} />
                <SearchBar value={search} onChangeText={(text) => Search(text)} onClear={onClear} />

                <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'white' }}>
                    <FloatingAddButtom setVisible={() => setVisible(!visible)} />

                    {
                        filterTodo.length > 0 ?
                            <FlatList

                                data={filterTodo}
                                extraData={filterTodo}
                                contentContainerStyle={{ paddingBottom: hp(15.5) }}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={_renderItem}
                                onEndReachedThreshold={1}

                            />
                            :
                            <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
                                <CustomText extraStyle={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', color: colorScheme == 'light' ? 'black' : 'white', fontSize: Platform.OS == 'ios' ? (14) : 13, textAlign: "left" }} text={'There are no Tasks for you'} />
                            </View>
                    }
                </View>

                <CustomModal visible={visible} close={() => console.log('mdmdmdm')} extraStyle={{}}>
                    <View style={{
                        alignItems: 'flex-start',
                        backgroundColor: "white",
                        height: hp(60),
                        borderRadius: 20,
                        padding: 10,
                    }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', right: wp(2.5), top: hp(1), position: 'absolute', zIndex: 100 }} onPress={() => setVisible(false)} >
                            <Icon name='close-circle' size={25} color='darkred' />
                        </TouchableOpacity>
                        <AddNewTodo onAdd={_OnAddNew} />
                    </View>
                </CustomModal>
            </View>
        </TouchableWithoutFeedback >

    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

});
