
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
 
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'

const CheckBox = ({ selected, onPress, style, textStyle, size = 30, color = 'grey', disabled = false, text = '', ...props }) => (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} disabled={disabled} {...props}>

        <Icon
            size={size}
            color={selected ? '#FDBB64' : color} style={{ backgroundColor: 'white', borderRadius: 15, height: 30, width: 30 }}
            name={selected ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
        />


        <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
)

export default CheckBox


const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',


    }
})