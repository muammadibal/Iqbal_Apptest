import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors, gapSize, titleStyle, widthSize } from '../utils/constant'
import { addContacts } from '../redux/actions/contactAction'
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import { shownMessage } from '../utils/shownMessage'

interface CreateProps {
    navigation: any
}

const Create = ({ navigation }: CreateProps) => {
    const dispatch = useDispatch()
    const { postContactLoading } = useSelector((state: any) => state.contact)
    const [value, setValue] = useState<any>({
        firstName: '',
        lastName: '',
        age: ''
    })
    const [image, setImage] = useState<string>('')

    const onSubmit = () => {
        if (value.firstName.length === 0 || value.lastName.length === 0 || value.age.length === 0) {
            return shownMessage({ type: 'warning', description: 'Field cannot empty' })
        }

        const payload = {
            ...value,
            photo: image
        }

        dispatch<any>(addContacts(payload, navigation))
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
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={titleStyle}>{'<'}</Text></TouchableOpacity>
                <Text style={[titleStyle, { marginLeft: gapSize }]}>Add New Contact</Text>
            </View>

            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => pickImage()} style={{ marginVertical: gapSize }}>
                    <>
                        {image.length === 0 ? <View style={{ width: 150, height: 150, borderRadius: 150, backgroundColor: 'grey' }} /> : <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 150 }} />}
                        <TouchableOpacity onPress={() => setImage('')} style={{ height: 25, width: 25, borderRadius: 25, backgroundColor: 'red', position: 'absolute', right: 15, bottom: 5 }}>
                            <Text>-</Text>
                        </TouchableOpacity>
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
                    keyboardType="phone-pad"
                    value={value.age}
                    onChangeText={e => setValue({
                        ...value,
                        age: e
                    })} style={styles.inputStyle}
                />
                <TouchableOpacity style={styles.btn} onPress={() => onSubmit()} disabled={postContactLoading}>
                    <Text style={[titleStyle, { color: 'white' }]}>{postContactLoading ? 'Loading...' : 'Submit'}</Text>
                </TouchableOpacity>

            </ScrollView>
        </View >
    )
}

export default Create

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
    }
})