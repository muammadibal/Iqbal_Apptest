import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { subtitleStyle, titleStyle } from '../utils/constant'
import Lottie from 'lottie-react-native';

const EmptyState = () => {
    return (
        <View style={styles.container}>
            <Lottie source={require('../assets/EmptyData.json')} style={styles.lottieStyle} autoPlay loop />
        </View>
    )
}

export default EmptyState

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieStyle: {
        height: 300,
        marginTop: -50
    }
})