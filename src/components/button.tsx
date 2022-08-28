import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, gapSize, titleStyle, widthSize } from '../utils/constant'

interface ButtonProps {
    loading: boolean
    onPress: () => void
}

const Button = ({ loading, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress} disabled={loading}>
            <Text style={[titleStyle, { color: 'white' }]}>{loading ? 'Loading...' : 'Submit'}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        backgroundColor: colors.blue,
        height: 50,
        width: widthSize - gapSize,
        marginVertical: gapSize / 2,
        borderRadius: gapSize,
        alignItems: 'center',
        justifyContent: 'center',
    },
})