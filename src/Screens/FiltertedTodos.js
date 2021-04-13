
import React, { useState, useEffect, useCallback, ReactNode, } from 'react';
import { View, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, useColorScheme, } from "react-native";
import { useDispatch, useSelector, } from 'react-redux';
import { ThemeStyle } from '../Utilities/Theme';
import TodoComponent from '../Components/TodosComponent/TodoComponent'
import Header from '../Components/Header'
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomText from '../Components/CustomText'
import moment from 'moment'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import { DeleteTodoAction, FinishTodoAction } from '../Redux/Actions/TodosAction';

const FiltertedTodos = () => {

    const dispatch = useDispatch()
    const Todos = useSelector((state) => state.todo).Todos;
    const [todos, setTodos] = useState([])
    const [date, setDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false);
    const [visible, setVisible] = useState(false);

    const colorScheme = useColorScheme();


    const onDateSelected = (selectedDate) => {

        setShowDate(Platform.OS === 'ios');
        if (selectedDate === undefined) {
            setShowDate(false)
        }
        setDate(selectedDate);
        _onFilter(moment(selectedDate).format("DD-MM-YYYY"))
        setShowDate(false)
    };
    const showDatepicker = () => {
        setShowDate(!showDate);
    };

    const _onSelected = (value) => {

        dispatch(FinishTodoAction(value))
    }

    const _onDelete = (value) => {

        dispatch(DeleteTodoAction(value))
    }

    const _onFilter = (date) => {
    
        var todo = Todos.filter(t => moment(t.TodoDate).format("DD-MM-YYYY") == date)
        
        setTodos(todo)
    }
    const _renderItem = ({ item, index }) => {

        return (
            <TodoComponent

                index={index}
                onSelected={_onSelected}
                onDelete={_onDelete}
                initialNumToRender={10}
                {...item}
            />

        );
    }




    return (

        <TouchableWithoutFeedback style={[styles.container, colorScheme === 'light' ? ThemeStyle.lightContainer : ThemeStyle.darkContainer]} >
            <View style={styles.container}>
                <Header title={'Filtered Todo List'} hasRight={false} hasLeft={false} />
                <CustomText extraStyle={{ marginHorizontal: wp(5), color: colorScheme == 'light' ? 'black' : 'white', fontSize: Platform.OS == 'ios' ? (14) : 13, textAlign: "left" }} text={'Are you ready to complete you tasks?'} />
                <TouchableOpacity
                    onPress={() => setShowDate(true)}
                    style={[styles.DropList,
                    {
                        top: hp(2),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: wp(15),
                        height: 45,
                        backgroundColor: '#fff',
                        justifyContent: 'center'
                    },]}
                >

                    <CustomText extraStyle={{
                        color: colorScheme == 'light' ? 'black' : 'white',
                        fontSize: Platform.OS == 'ios' ? (14) : 13, textAlign: "left"
                    }}
                        text={moment(date).format("DD MMM YYYY")} />


                    <Icon name='calendar-month' size={25} color='darkred' />
                </TouchableOpacity>


                <DateTimePicker
                    isVisible={showDate}
                    mode='date'
                    date={date}
                    onConfirm={onDateSelected}
                    onCancel={showDatepicker}
                />
                <View style={{ justifyContent: 'center', flex: 1, marginTop: hp(1), backgroundColor: 'white' }}>

                    {
                        todos.length > 0 ?
                            <FlatList

                                data={todos}
                                extraData={todos}
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


            </View>
        </TouchableWithoutFeedback >

    );

}
export default FiltertedTodos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    DropList: {
        alignSelf: 'center',

        alignItems: 'center',

        backgroundColor: 'white',
        width: wp(30),
        borderRadius: 30,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
            },
            android: {
                elevation: 3,
            },
        }),
    },


});
