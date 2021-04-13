import React from 'react'
import { StyleSheet, Text, View, Platform, I18nManager, Alert } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useColorScheme } from 'react-native-appearance';

const Header = (props) => {

    const colorScheme = useColorScheme();

    return (
        <View style={[styles.HeaderContainer, { backgroundColor: colorScheme === 'light' ? 'white' : 'black' }]}>
            <View style={{ flexDirection: 'row' }}>
                {props.hasLeft ?
                    <TouchableOpacity onPress={props.goBack}
                        style={{ marginTop: Platform.OS == 'ios' ? hp('6%') : hp('0%'), marginLeft: wp(5) }}>
                        <Icon name={'arrow-back'} size={30} color={colorScheme === 'light' ? 'black' : 'white'} />
                    </TouchableOpacity>
                    :
                    <View style={{ marginRight: wp(5) }} />
                }
                <Text style={[styles.headerText, { marginHorizontal: props.hasLeft ? wp(4) : wp(0), color: colorScheme === 'light' ? 'black' : 'white' }]}>{props.title}</Text>
            </View>
            {props.hasRight ?
                <TouchableOpacity onPress={props.onPress}

                    style={{ marginTop: Platform.OS == 'ios' ? hp('7%') : hp('0%'), marginRight: wp(5) }}>
                    <Icon name={'add'} size={30} color={colorScheme === 'light' ? 'black' : 'white'} />

                </TouchableOpacity>
                :
                <View style={{ marginRight: wp(15) }} />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    HeaderContainer: {
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? hp('13%') : hp('10%'),
        //position:'absolute'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        alignItems: 'center',

        marginTop: Platform.OS == 'ios' ? hp('6%') : 0

    }
})

export default Header
