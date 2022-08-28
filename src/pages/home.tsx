import BottomSheet from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Image, RefreshControl, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../components/emptyState'
import PlaceHolderCard from '../components/placeholderCard'
import { getContacts, getDetailContacts } from '../redux/actions/contactAction'
import { colors, gapSize, subtitleStyle, titleStyle, widthSize } from '../utils/constant'
import { useKeyboard } from '../utils/keyboard'

let initSearchStyle = { backgroundColor: colors.white, width: widthSize - gapSize, marginVertical: gapSize / 2, borderRadius: gapSize, }

interface HomeProps {
    navigation: any
}

const Home = ({ navigation }: HomeProps) => {
    const dispatch = useDispatch()
    const { isKeyboardVisible } = useKeyboard()
    const searchRef = useRef<any>(null)
    const detailRef = useRef<any>(null);
    const { lists, loading, detail, detailLoading } = useSelector((state: any) => state.contact)
    const [searchNumber, setSearchNumber] = useState<string>('')
    const [searchStyle, setSearchStyle] = useState<any>(initSearchStyle)
    const [openSearch, setOpenSearch] = useState<boolean>(false)
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
                    value={searchNumber}
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


                <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Create')}>
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
                        <Text style={[titleStyle, { marginTop: gapSize / 4 }]}>{`About :`}</Text>
                        <Text style={subtitleStyle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora odit ullam ipsa non fugiat corrupti accusamus? Nostrum temporibus iure optio culpa, eaque excepturi consequatur amet libero nobis esse aspernatur a?</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => { }}>
                        <Text style={[titleStyle, { color: 'white' }]}>Edit Contact</Text>
                    </TouchableOpacity>
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
        flexGrow: 1
    },
    contentContainer: {
        flexGrow: 1,
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
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: colors.blue,
        height: 50,
        marginVertical: gapSize / 2,
        marginHorizontal: gapSize,
        borderRadius: gapSize,
        alignItems: 'center',
        justifyContent: 'center',
    }
})