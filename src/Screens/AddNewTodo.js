import React, { useState, useEffect, useRef, } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform, } from "react-native";
import { useColorScheme } from 'react-native-appearance';
import { useDispatch, } from 'react-redux';
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomText from '../Components/CustomText'
import CustomButton from '../Components/CustomBotton'
import CustomTextInput from '../Components/CustomTextInput'
import ErrorText from '../Components/ErrorText'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Formik } from 'formik';
import { validateTodoData } from '../Constants/validationSchema/addTodoValidation';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import { AddNewTodoAction, } from '../Redux/Actions/TodosAction';
import { ThemeStyle } from '../Utilities/Theme';



const TodosScreen = (props) => {
    const colorScheme = useColorScheme()
    const [date, setDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false);

    const dispatch = useDispatch()

    const formikRef = useRef();


    const onDateSelected = (selectedDate) => {

        setShowDate(Platform.OS === 'ios');
        if (selectedDate === undefined) {
            setShowDate(false)
        }
        setDate(selectedDate);
        setShowDate(false)
        console.log(selectedDate);
    };
    const showDatepicker = () => {
        setShowDate(!showDate);
    };



    const _AddNewTodo = (Description) => {
        
        dispatch(AddNewTodoAction(date, Description)).then(() => {
            props.onAdd(false)
        })

    }

    return (
        <View style={[{}, colorScheme == 'light' ? ThemeStyle.lightContainer : ThemeStyle.darkContainer]}>

            <ScrollView >

                <Formik
                    initialValues={{
                        date: '', Description: ''
                    }}
                    innerRef={formikRef}
                    enableReinitialize={true}
                    validationSchema={validateTodoData}
                    onSubmit={(values, actions) => {
                        _AddNewTodo(values.Description)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                        <React.Fragment>



                            <View style={{
                                width: wp(85), alignSelf: 'center', justifyContent: 'center', marginVertical: hp(4), padding: 5, paddingTop: 0,
                            }}>

                                <TouchableOpacity
                                    onPress={() => setShowDate(true)}
                                    style={[styles.DropList,
                                    {
                                        flexDirection: 'row', justifyContent: 'space-between',
                                        marginHorizontal: wp(15),
                                        height: 45,
                                        width: wp(50),
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
                                    mode='datetime'
                                    date={date}
                                    onConfirm={onDateSelected}
                                    onCancel={showDatepicker}
                                />
                                <CustomTextInput

                                    onChangeText={(e) => setFieldValue('Description', e)}
                                    value={values.Description}
                                    style={[styles.BorderShadow, {
                                        marginVertical: 16,
                                        borderWidth: 1, borderColor: errors.Description ? 'red' : '#F8F8F8', alignSelf: 'center',
                                    }]}
                                    placeholder={'Description'}
                                    placeholderTextColor={'grey'}
                                    firstChild={null} secondChild={null} />

                                {errors.Description &&
                                    <View style={{ marginHorizontal: wp(6), top: Platform.OS == 'ios' ? hp(15.4) : hp(15.4), position: 'absolute', zIndex: 200 }} >
                                        <ErrorText message={errors.Description} />
                                    </View>
                                }



                            </View>


                            <CustomButton
                                onPress={(e) => {
                                    handleSubmit(e)

                                }}
                                containerStyle={{ alignSelf: 'center', width: wp(40), height: Platform.OS == "ios" ? hp('6.5%') : hp('7.5%'), }}
                                extraStyle={[styles.BorderShadow, { width: wp(40), backgroundColor: '#d11a2a', }]}
                                textStyle={{ alignSelf: 'center', textAlign: 'center', top: hp('0.3%'), color: '#fff', fontWeight: 'bold', fontSize: (18) }}
                                title={'Add new Todo'}
                                hasIcon={false} />


                        </React.Fragment>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );

}

export default TodosScreen 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 200,
    },

    BorderShadow: {

        backgroundColor: 'white',
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

    DropList: {
        alignSelf: 'center',

        alignItems: 'center',

        backgroundColor: 'white',
        width: wp(90),
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
