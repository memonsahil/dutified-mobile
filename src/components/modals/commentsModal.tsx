import { useEffect, useState } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native'
import commentsModalProps from '../props/commentsModalProps'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import post from '../../data/classes/post'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'
import commentType from '../../data/types/commentType'
import * as Progress from 'react-native-progress'
import * as Crypto from 'expo-crypto'
import authStore from '../../state/stores/authStore'

const CommentsModal = (props: commentsModalProps) => {
    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState<commentType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const commentId = Crypto.randomUUID()

    const currentUser = authStore((state) => state.currentUser)

    useEffect(() => {
        post.getComments({ postId: props.postId }).then(
            (response: promiseType) => {
                if (response.status === requestStatus.SUCCESS) {
                    setComments(response.data)
                    setLoading(false)
                } else {
                    setComments([])
                    setLoading(false)
                }
            }
        )
    }, [props.postId])

    return (
        <Modal transparent visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Comments</Text>
                        <TouchableOpacity onPress={props.onClose}>
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={28}
                                color={themeColors.GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.commentsSection}>
                        <>
                            <View style={styles.commentInputContainer}>
                                <TextInput
                                    placeholder="Enter your comment here."
                                    value={comment}
                                    onChangeText={setComment}
                                    style={styles.commentTextInput}
                                    placeholderTextColor={themeColors.BLACK}
                                    inputMode="text"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    if (comment !== '') {
                                        setLoading(true)
                                        post.createComment({
                                            comment: {
                                                commentId: commentId,
                                                postId: props.postId,
                                                userId: currentUser?.userId!,
                                                userName:
                                                    currentUser?.userName!,
                                                userAvatar:
                                                    currentUser?.userAvatar!,
                                                comment: comment,
                                            },
                                        }).then((response: promiseType) => {
                                            if (
                                                response.status ===
                                                requestStatus.SUCCESS
                                            ) {
                                                setComments([
                                                    ...comments,
                                                    {
                                                        commentId: commentId,
                                                        postId: props.postId,
                                                        userId: currentUser?.userId!,
                                                        userName:
                                                            currentUser?.userName!,
                                                        userAvatar:
                                                            currentUser?.userAvatar!,
                                                        comment: comment,
                                                    },
                                                ])
                                                setComment('')
                                                setLoading(false)
                                            } else {
                                                setLoading(false)
                                                Alert.alert(
                                                    'Error Occurred',
                                                    'Please contact our support team.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            }
                                        })
                                    } else {
                                        Alert.alert(
                                            'No Comment',
                                            'Please describe your comment first.',
                                            [
                                                {
                                                    text: 'Dismiss',
                                                    onPress: () => {},
                                                },
                                            ]
                                        )
                                    }
                                }}
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="comment-plus"
                                    size={28}
                                    color={themeColors.GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Comment</Text>
                            </TouchableOpacity>
                        </>
                        {loading !== true && comments?.length !== 0 ? (
                            <>
                                {comments?.map((comment) => (
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
                        ) : loading !== true && comments?.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    No comments yet.
                                </Text>
                            </View>
                        ) : loading === true ? (
                            <View style={styles.loadingContainer}>
                                <Progress.Bar
                                    width={250}
                                    height={25}
                                    borderRadius={20}
                                    indeterminate={true}
                                    color={themeColors.GREEN}
                                />
                            </View>
                        ) : null}
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
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '10%',
        alignSelf: 'center',
    },
    iconButton: {
        marginRight: '3%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.GREEN,
        alignSelf: 'center',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentContainer: {
        backgroundColor: themeColors.SILVER,
        width: '90%',
        borderRadius: 20,
        marginBottom: '5%',
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
        textAlign: 'center',
    },
})

export default CommentsModal
