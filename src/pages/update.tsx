import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, gapSize, titleStyle, widthSize } from '../utils/constant'
import { addContacts, editContacts } from '../redux/actions/contactAction'
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import { shownMessage } from '../utils/shownMessage'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface CreateProps {
    navigation: any
    route: any
}

const Update = ({ navigation, route }: CreateProps) => {
    const { data } = route?.params
    const dispatch = useDispatch()
    const { updateContactLoading } = useSelector((state: any) => state.contact)
    const [value, setValue] = useState<any>({
        firstName: data.firstName,
        lastName: data.lastName,
        age: `${data.age}`
    })
    const [image, setImage] = useState<string>(data.photo)

    const onSubmit = () => {
        if (value.firstName.length === 0 || value.lastName.length === 0 || value.age.length === 0 || image.length === 0) {
            return shownMessage({ type: 'warning', description: 'Field cannot empty' })
        }

        const payload = {
            ...value,
            photo: image
        }

        dispatch<any>(editContacts(payload, data.id, navigation))
    }

    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            mediaType: 'photo'
        }).then(image => {
            setImage(`data:image/png;base64,${image.data}`)
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <View style={{ height: 60, width: '100%', backgroundColor: 'white', elevation: 4, flexDirection: 'row', alignItems: 'center', paddingHorizontal: gapSize }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" color={colors.black} size={20} />
                </TouchableOpacity>
                <Text style={[titleStyle, { marginLeft: gapSize }]}>Edit Contact</Text>
            </View>

            <TouchableOpacity onPress={() => pickImage()} style={{ marginVertical: gapSize }}>
                <>
                    {image.length === 0 ? <View style={styles.avatarPlaceholder}>
                        <AntDesign name="user" size={70} color={colors.white} />
                    </View> : <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 150 }} />}
                    {image.length > 0 && <TouchableOpacity onPress={() => setImage('')} style={styles.removeAvatar}>
                        <AntDesign name="minus" size={20} color='white' />
                    </TouchableOpacity>}
                </>
            </TouchableOpacity>

            <TextInput
                placeholder="Firstname..."
                placeholderTextColor={colors.grey}
                value={value.firstName}
                onChangeText={e => setValue({
                    ...value,
                    firstName: e
                })} style={styles.inputStyle}
            />
            <TextInput
                placeholder="Lastname..."
                placeholderTextColor={colors.grey}
                value={value.lastName}
                onChangeText={e => setValue({
                    ...value,
                    lastName: e
                })} style={styles.inputStyle}
            />
            <TextInput
                placeholder="Age..."
                placeholderTextColor={colors.grey}
                value={value.age}
                onChangeText={e => setValue({
                    ...value,
                    age: e
                })} style={styles.inputStyle}
            />
            <TouchableOpacity style={styles.btn} onPress={() => onSubmit()} disabled={updateContactLoading}>
                <Text style={[titleStyle, { color: 'white' }]}>{updateContactLoading ? 'Loading...' : 'Submit'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Update

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: colors.white,
        width: widthSize - gapSize,
        marginVertical: gapSize / 2,
        borderRadius: gapSize,
        alignSelf: 'center',
        paddingHorizontal: gapSize
    },
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
    avatarPlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 150,
        backgroundColor: colors.grey,
        alignItems: 'center',
        justifyContent: 'center'
    },
    removeAvatar: {
        height: 25,
        width: 25,
        borderRadius: 25,
        backgroundColor: 'red',
        position: 'absolute',
        right: 15,
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})