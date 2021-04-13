import React from 'react';
import { Text, Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ThemeStyle } from '../../Utilities/Theme';
import CheckBox from '../CheckBox'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import moment from 'moment';

var colorSchemeStyle
const TodoComponent = (props) => {
    const colorScheme = useColorScheme()
    colorSchemeStyle = colorScheme
    return (
        <View onPress={props.onPress} style={[styles.rederItems, { backgroundColor: colorScheme === 'light' ? 'white' : 'grey', height: hp(10) }]}
            key={props.index}>

            <CheckBox selected={props.selected == undefined ? false : props.selected} onPress={() => props.onSelected(props.TodoDate)} />
            <View>
                <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginTop: hp(1) }} >
                    <Text numberOfLines={6} lineBreakMode='clip' ellipsizeMode='clip'
                        style={[{ width: wp(70), textAlign: 'left', fontSize: Platform.OS == 'ios' ? 20 : 19, fontWeight: 'bold', },
                        colorScheme === 'light' ? ThemeStyle.lightThemeText : ThemeStyle.darkThemeText]}>{props.description}</Text>


                </View>

                <View style={styles.footer}>

                    <Text style={[{ textAlign: 'left', fontSize: 15, fontWeight: 'bold', marginRight: wp(5) }, colorScheme === 'light' ? ThemeStyle.lightThemeText : ThemeStyle.darkThemeText]}>{moment(props.TodoDate).format('YYYY-MM-DD')}</Text>
                    <Text style={[{ textAlign: 'left', fontSize: 15, fontWeight: 'bold', }, colorScheme === 'light' ? ThemeStyle.lightThemeText : ThemeStyle.darkThemeText]}>{moment(props.TodoDate).format('hh:mm:ss a')}</Text>


                </View>
            </View>
            <TouchableOpacity style={{ alignSelf: 'flex-end', right: wp(2.5), top: hp(1), position: 'absolute', zIndex: 100 }} onPress={() => props.onDelete(props.TodoDate)} >
                <Icon name='close-circle' size={25} color='darkred' />
            </TouchableOpacity>
        </View>

    )
}

export default TodoComponent
const styles = StyleSheet.create({

    rederItems: {
        marginTop: hp(2),
        marginHorizontal: wp(5.5),
        paddingHorizontal: wp(5),
        borderRadius: 10,
        flexDirection: 'row',



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


                elevation: 3.5,

            },
        }),
    },

    Img: {

        top: hp(2),

        borderRadius: 10,
        ...Platform.select({
            ios: {
                width: wp(40),

            },
            android: {
                width: wp(40),
            },
        }),

    },


    footer: {

        flexDirection: 'row',

        alignItems: 'flex-start',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,




    }
    ,


});
