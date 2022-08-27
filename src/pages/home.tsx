import { FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getContacts } from '../redux/actions/contactAction'
import { useDispatch, useSelector } from 'react-redux'
import { colors, gapSize, subtitleStyle, titleStyle, widthSize } from '../utils/constant'
import { useKeyboard } from '../utils/keyboard'

let initSearchStyle = { backgroundColor: colors.white, width: widthSize - gapSize, marginVertical: gapSize / 2, borderRadius: gapSize, }

const Home = () => {
    const dispatch = useDispatch()
    const { isKeyboardVisible } = useKeyboard()
    const searchRef = useRef<any>(null)
    const { lists } = useSelector((state: any) => state.contact)
    const [searchNumber, setSearchNumber] = useState<string>('')
    const [searchStyle, setSearchStyle] = useState<any>(initSearchStyle)
    const [openSearch, setOpenSearch] = useState<boolean>(false)

    useEffect(() => {
        dispatch<any>(getContacts())
    }, [])

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
        let value = lists?.filter((val: any) => val.firstName.toLowerCase().includes(searchNumber.toLowerCase()) || val.lastName.toLowerCase().includes(searchNumber.toLowerCase()))
        return value
    }, [searchNumber])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar animated backgroundColor={openSearch ? colors.white : 'grey'} />
            <TextInput ref={searchRef}
                placeholder="Search..."
                placeholderTextColor={colors.grey}
                onChangeText={e => setSearchNumber(e)} style={{ ...searchStyle, alignSelf: 'center', paddingHorizontal:gapSize}} onFocus={() => {
                    setSearchStyle({ backgroundColor: colors.white, width: widthSize, marginTop: 0, marginBottom: gapSize / 2, })
                    setOpenSearch(true)
                }} onBlur={() => {
                    setSearchStyle(initSearchStyle)
                    setOpenSearch(false)
                }} />
            <FlatList
                data={searchContact}
                renderItem={({ item, index }) => {
                    return <TouchableOpacity style={{ backgroundColor: 'white', padding: gapSize / 2, borderBottomWidth: 0.5, borderBottomColor: colors.white, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: `https://ui-avatars.com/api/?name=${item?.firstName}+${item?.lastName}&color=fff&background=random` }} style={{ height: 40, width: 40, borderRadius: 40, marginRight: gapSize / 2 }} />
                        <View>
                            <Text style={titleStyle}>{`${item?.firstName} ${item?.lastName}`}</Text>
                            <Text style={subtitleStyle}>{`Age : ${item?.age}`}</Text>
                        </View>
                    </TouchableOpacity>
                }}
            />

            <TouchableOpacity style={{ position: 'absolute', right: 24, bottom: 50, width: 50, height: 50, borderRadius: 25, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[titleStyle, { color: colors.white, fontSize: 22 }]}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})