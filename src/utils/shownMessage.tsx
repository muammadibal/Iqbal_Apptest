import { showMessage, MessageType } from 'react-native-flash-message';
import { colors, fonts, gapSize } from './constant';


interface shownMessageProps {
    title?: string
    description: string
    type?: MessageType
}

export const shownMessage = ({ title, description, type = 'danger' }: shownMessageProps) => {
    showMessage({
        message: type === 'success'
            ? 'Yeay..!'
            : type === 'warning'
                ? 'Hmm..'
                : 'Ooppss..!',
        description,
        type: type,
        floating: true,
        duration: type === 'success' ? 2500 : 10000,
        animationDuration: 300,
        autoHide: true, //type === 'success' ? true : false,
        icon: {
            icon:
                type === 'success'
                    ? 'success'
                    : type === 'warning'
                        ? 'warning'
                        : 'danger',
            position: 'left',
        },
        titleStyle: {
            fontFamily: fonts.bold,
        },
        textStyle: {
            fontFamily: fonts.regular,
        },
        style: {
            alignSelf: 'center',
            width: '95%',
            paddingRight: 2 * gapSize,
            backgroundColor:
                type === 'success'
                    ? colors.green
                    : type === 'warning'
                        ? colors.yellow
                        : colors.red,
        },
    });
};
