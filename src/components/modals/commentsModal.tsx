import { Modal, View, Text, TouchableOpacity } from 'react-native'
import commentsModalProps from '../props/commentsModalProps'

const CommentsModal = (props: commentsModalProps) => {
    return (
        <Modal transparent visible={props.visible} animationType="slide">
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <Text>This is your modal content.</Text>
                    <TouchableOpacity onPress={props.onClose}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CommentsModal
