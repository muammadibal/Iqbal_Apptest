import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen')

export const widthSize = width
export const heightSize = height
export const gapSize = 24

export const fonts = {
    regular: 'Nunito-Regular',
    light: 'Nunito-Light',
    semibold: 'Nunito-SemiBold',
    bold: 'Nunito-Bold',
    800: 'Nunito-ExtraBold',
    900: 'Nunito-Black',
};

export const colors = {
    blue: '#0e6bce',
    yellow: '#ce9b0e',
    black: '#050a0f',
    grey: '#576675',
    white: '#dae2ea',
}

export const titleStyle = {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black
}

export const subtitleStyle = {
    fontFamily: fonts.light,
    fontSize: 14,
    color: colors.grey
}