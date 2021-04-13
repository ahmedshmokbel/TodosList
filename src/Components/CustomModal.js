import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native'
const { width, height } = Dimensions.get('window');

export default CustomModal = ({ visible, close, children, extraStyle }) => (
   <TouchableWithoutFeedback onPress={close}>
     <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
     >
      <View style={[styles.modalView, extraStyle]}>
        {/* modal content placed here */}
        {children}
      </View>
    </Modal>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
   

  modalView: {
    
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: height

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
   
  
})
