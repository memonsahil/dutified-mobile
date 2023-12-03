import { useState } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native'
import commentsModalProps from '../props/commentsModalProps'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import commentType from '../../data/types/commentType'
import * as Crypto from 'expo-crypto'

const CommentsModal = (props: commentsModalProps) => {
    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState<Array<commentType>>([
        {
            commentId: '1',
            comment:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deleniti, quisquam molestiae laboriosam facilis molestias asperiores nulla unde aliquid eligendi ex delectus odit soluta ipsa perspiciatis maxime tenetur enim voluptas!',
        },
        {
            commentId: '2',
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            commentId: '3',
            comment:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deleniti, quisquam molestiae laboriosam facilis molestias asperiores nulla unde aliquid eligendi ex delectus odit soluta ipsa perspiciatis maxime tenetur enim voluptas!',
        },
        {
            commentId: '4',
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            commentId: '5',
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            commentId: '6',
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            commentId: '7',
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
    ])

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
                    <ScrollView contentContainerStyle={styles.commentsSection}>
                        <View style={styles.commentInputContainer}>
                            <TextInput
                                placeholder="Enter your comment."
                                value={comment}
                                onChangeText={setComment}
                                style={styles.commentTextInput}
                                placeholderTextColor={themeColors.BLACK}
                                inputMode="text"
                                returnKeyType="done"
                                onSubmitEditing={() => {
                                    setComments([
                                        {
                                            commentId: Crypto.randomUUID(),
                                            comment: comment,
                                        },
                                        ...comments,
                                    ])
                                    setComment('')
                                }}
                            />
                        </View>
                        {comments.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    No comments yet.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {comments.map((comment) => (
                                    <View
                                        key={comment.commentId}
                                        style={styles.commentContainer}
                                    >
                                        <Text style={styles.commentText}>
                                            {comment.comment}
                                        </Text>
                                    </View>
                                ))}
                            </>
                        )}
                    </ScrollView>
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingHorizontal: '5%',
        paddingBottom: '5%',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.BLACK,
    },
    commentsSection: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: '20%',
    },
    commentInputContainer: {
        backgroundColor: themeColors.SILVER,
        height: 60,
        width: '90%',
        borderRadius: 20,
        padding: 10,
    },
    commentTextInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        width: '100%',
        height: '100%',
        overflow: 'visible',
    },
    commentContainer: {
        backgroundColor: themeColors.SILVER,
        width: '90%',
        borderRadius: 20,
        marginTop: '5%',
        padding: 10,
    },
    commentText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        paddingTop: '10%',
        paddingBottom: '10%',
        textAlign: 'center',
    },
})

export default CommentsModal
