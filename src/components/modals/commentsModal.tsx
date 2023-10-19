import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native'
import commentsModalProps from '../props/commentsModalProps'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'

const CommentsModal = (props: commentsModalProps) => {
    const [comment, setComment] = useState<string>('')

    return (
        <Modal transparent visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Comments</Text>
                        <TouchableOpacity onPress={props.onClose}>
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.commentContainer}>
                        <TextInput
                            placeholder="Any thoughts?"
                            value={comment}
                            onChangeText={setComment}
                            style={styles.commentTextInput}
                            placeholderTextColor={themeColors.SILVER}
                            inputMode="text"
                            multiline
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: themeColors.WHITE,
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingHorizontal: '5%',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.BLACK,
    },
    commentContainer: {
        backgroundColor: themeColors.WHITE,
        height: 250,
        borderRadius: 20,
        marginTop: '5%',
        padding: 10,
    },
    commentTextInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        padding: 5,
        textAlignVertical: 'top',
    },
})

export default CommentsModal
