import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors, gapSize } from '../utils/constant'

const PlaceHolderDetailItem = () => {
    return <View style={{ marginHorizontal: gapSize / 2 }}>
        <View style={{ height: 150, borderRadius: gapSize, backgroundColor: 'lightgrey', marginBottom: gapSize / 2 }} />
        <View style={{ height: 15, width: '40%', borderRadius: gapSize, backgroundColor: 'lightgrey', marginBottom: gapSize / 2 }} />
        <View style={{ height: 15, width: '60%', borderRadius: gapSize, backgroundColor: 'lightgrey', marginBottom: gapSize / 2 }} />
        <View style={{ height: 15, width: '40%', borderRadius: gapSize, backgroundColor: 'lightgrey', marginBottom: gapSize / 2 }} />
        <View style={{ height: 100, borderRadius: gapSize, backgroundColor: 'lightgrey', marginBottom: gapSize / 2 }} />
    </View>
}

export default PlaceHolderDetailItem