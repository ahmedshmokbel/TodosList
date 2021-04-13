import React from 'react';
import { StyleSheet, TouchableOpacity, View, I18nManager } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons'
const isRTL = I18nManager.isRTL;

const FloatingAddButton = (props) => {
    return (
        <TouchableOpacity onPress={props.setVisible} style={styles.floatingContainer}>
            <Icon name='add-circle' size={60}  color='orange'/>
        </TouchableOpacity>
    )
}

export default FloatingAddButton;

const styles = StyleSheet.create({
    floatingContainer: {
        position: 'absolute',
        zIndex: 100,
        bottom: hp('4%'),
        ...(!isRTL && { right: wp('4%') }),
        ...(isRTL && { right: wp('4%') })
    }
})
