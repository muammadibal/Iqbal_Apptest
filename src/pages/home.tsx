import { FlatList, Image, RefreshControl, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getContacts, getDetailContacts } from '../redux/actions/contactAction'
import { useDispatch, useSelector } from 'react-redux'
import { colors, gapSize, subtitleStyle, titleStyle, widthSize } from '../utils/constant'
import { useKeyboard } from '../utils/keyboard'
import { LineChart } from 'react-native-chart-kit'
import BottomSheet from '@gorhom/bottom-sheet';
import PlaceHolderCard from '../components/placeholderCard'
import EmptyState from '../components/emptyState'
import { useFocusEffect } from '@react-navigation/native'

let initSearchStyle = { backgroundColor: colors.white, width: widthSize - gapSize, marginVertical: gapSize / 2, borderRadius: gapSize, }

let dataValue: any = {
    labels: [...Array(7).fill('').map((_, i) => i + 1)],
    datasets: [
        {
            data: [...Array(7).fill('').map((_, i) => Math.floor(Math.random() * 11))],
            color: (opacity = 1) => `rgba(25,82, 252, ${opacity})`,
            strokeWidth: 2
        }
    ],
}

const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#f7f9fa",
    backgroundGradientTo: "#f7f9fa",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(25, 82, 252, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    barPercentage: 0.5,
    fillShadowGradientFrom: '#1e55fc',
    fillShadowGradientFromOpacity: 0.1,
    fillShadowGradientTo: '#5a83fc',
    fillShadowGradientToOpacity: 0,
    propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: colors.white,
    }
};


const Home = () => {
    const dispatch = useDispatch()
    const { isKeyboardVisible } = useKeyboard()
    const searchRef = useRef<any>(null)
    const detailRef = useRef<any>(null);
    const { lists, loading, detail, detailLoading } = useSelector((state: any) => state.contact)
    const [searchNumber, setSearchNumber] = useState<string>('')
    const [searchStyle, setSearchStyle] = useState<any>(initSearchStyle)
    const [openSearch, setOpenSearch] = useState<boolean>(false)
    const [chartValue, setChartValue] = useState<any>(null)
    const [refreshing, setRefreshing] = useState(false)

    useFocusEffect(useCallback(
        () => {
            getData()
        }, [],
    ))

    useEffect(() => {
        if (detail?.id) {
            detailRef?.current?.snapToIndex(1)
        }
    }, [detail])

    useEffect(() => {
        if (!isKeyboardVisible) {
            setSearchStyle(initSearchStyle)
            setOpenSearch(false)
            searchRef?.current?.blur()
        } else {
            setSearchStyle({ backgroundColor: colors.white, width: widthSize, marginTop: 0, marginBottom: gapSize / 2, })
            setOpenSearch(true)
        }
    }, [isKeyboardVisible])

    const searchContact = useMemo(() => {
        let value = lists?.filter((val: any) => val?.firstName?.toLowerCase().includes(searchNumber.toLowerCase()) || val?.lastName?.toLowerCase().includes(searchNumber.toLowerCase()))
        return value
    }, [searchNumber, lists])

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const getData = () => {
        dispatch<any>(getContacts())
    }

    const onRefresh = () => {
        setRefreshing(true)
        getData()
        setRefreshing(false)
    }

    const getDetail = useCallback((id: any) => {
        dispatch<any>(getDetailContacts(id))
    }, [])

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar animated backgroundColor={openSearch ? colors.white : 'grey'} />
                <TextInput ref={searchRef}
                    placeholder="Search..."
                    placeholderTextColor={colors.grey}
                    onChangeText={e => setSearchNumber(e)} style={{ ...searchStyle, alignSelf: 'center', paddingHorizontal: gapSize }} onFocus={() => {
                        setSearchStyle({ backgroundColor: colors.white, width: widthSize, marginTop: 0, marginBottom: gapSize / 2, })
                        setOpenSearch(true)
                    }} onBlur={() => {
                        setSearchStyle(initSearchStyle)
                        setOpenSearch(false)
                    }} />

                {loading ? Array(10)
                    .fill('')
                    .map((item, index) => {
                        return <PlaceHolderCard key={index} />
                    }) : <FlatList
                    data={searchContact}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}
                    ListEmptyComponent={<EmptyState />}
                    renderItem={({ item, index }: any) => {
                        return <TouchableOpacity onPress={() => {
                            getDetail(item?.id)
                        }} style={styles.renderItemContainer}>
                            <Image source={{ uri: item?.photo === 'N/A' ? `https://ui-avatars.com/api/?name=${item?.firstName}+${item?.lastName}&color=fff&background=random` : item?.photo }} style={styles.renderItemAvatar} />
                            <View>
                                <Text style={titleStyle}>{`${item?.firstName} ${item?.lastName}`}</Text>
                                <Text style={subtitleStyle}>{`Age : ${item?.age}`}</Text>
                            </View>
                        </TouchableOpacity>
                    }}
                />}


                <TouchableOpacity style={styles.fab}>
                    <Text style={[subtitleStyle, { color: colors.white }]}>Add Contact</Text>
                </TouchableOpacity>
            </View>

            <BottomSheet
                ref={detailRef}
                index={-1}
                snapPoints={snapPoints}
                bottomInset={20}
                detached
                style={styles.sheetContainer}
                handleStyle={styles.bottomSheetHandle}
                enablePanDownToClose
            >
                <View style={styles.contentContainer}>
                    <Image source={{ uri: detail?.photo === 'N/A' ? `https://ui-avatars.com/api/?name=${detail?.firstName}+${detail?.lastName}&color=fff&background=random` : detail?.photo }} style={{ height: 150, width: '90%', borderRadius: gapSize, alignSelf: 'center' }} />
                    <View style={{ flex: 1, backgroundColor: '#f7f9fa', padding: gapSize / 2, borderBottomLeftRadius: gapSize, borderBottomRightRadius: gapSize }}>
                        <Text style={titleStyle}>{`Name : ${detail?.firstName} ${detail?.lastName}`}</Text>
                        <Text style={subtitleStyle}>{`Age : ${detail?.age}`}</Text>
                    </View>
                </View>
            </BottomSheet>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    sheetContainer: {
        marginHorizontal: 24,
        backgroundColor: '#f7f9fa',
        borderRadius: gapSize,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#f7f9fa',
        borderBottomLeftRadius: gapSize,
        borderBottomRightRadius: gapSize
    },
    chartValue: {
        position: 'absolute',
        zIndex: 9999,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3,
        paddingHorizontal: 5,
        paddingVertical: 3,
        top: 10,
        left: -7,
        fontSize: 10
    },
    renderItemContainer: {
        backgroundColor: 'white',
        padding: gapSize / 2,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center'
    },
    renderItemAvatar: {
        height: 40,
        width: 40,
        borderRadius: 40,
        marginRight: gapSize / 2
    },
    bottomSheetHandle: {
        backgroundColor: '#f7f9fa',
        borderTopLeftRadius: gapSize,
        borderTopRightRadius: gapSize
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 50,
        borderRadius: gapSize / 1.5,
        padding: gapSize / 2,
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4
    }
})