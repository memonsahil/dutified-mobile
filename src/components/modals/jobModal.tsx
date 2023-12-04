import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import jobModalProps from '../props/jobModalProps'
import globalStore from '../../state/stores/globalStore'

const JobModal = (props: jobModalProps) => {
    const { setShowAgreementModal } = globalStore((state) => state)

    return (
        <Modal transparent visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Job</Text>
                        <TouchableOpacity
                            onPress={() => {
                                props.onClose()
                                setShowAgreementModal(true)
                            }}
                        >
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
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
})

export default JobModal
