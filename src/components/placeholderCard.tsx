import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, gapSize } from '../utils/constant'

const PlaceHolderCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardImage} />
            <View style={{ flex: 1 }}>
                <View style={styles.cardTitle} />
                <View style={styles.cardSubtitle} />
            </View>
        </View>
    )
}

export default PlaceHolderCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        padding: gapSize / 2,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    cardImage: {
        height: 40,
        width: 40,
        borderRadius: 40,
        marginRight: gapSize / 2,
        backgroundColor: 'lightgrey'
    },
    cardTitle: {
        height: 10,
        width: '60%',
        borderRadius: gapSize,
        backgroundColor: 'lightgrey',
        marginBottom: gapSize / 3
    },
    cardSubtitle: {
        height: 10,
        width: '40%',
        borderRadius: gapSize,
        backgroundColor: 'lightgrey'
    }
})