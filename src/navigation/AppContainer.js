import React, { useState, useEffect, } from 'react';
import { NavigationContainer, } from "@react-navigation/native";

import { MainNav } from './MainNavigation';
import { useColorScheme } from 'react-native-appearance';

export default AppContainer = (props) => {
    //state 

    const colorScheme = useColorScheme()
    return (
        <NavigationContainer >

            <MainNav theme={colorScheme} />
        </NavigationContainer >
    )
}


