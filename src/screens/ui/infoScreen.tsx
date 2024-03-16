import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import themeColors from '../../enums/themeColors'
import screens from '../params/screens'
import { s, vs } from 'react-native-size-matters'
import Carousel from 'react-native-snap-carousel'

const MainScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    const carouselItems: { title: string; image: string; text: string }[] = [
        {
            title: 'Item 1',
            image: '',
            text: 'Text 1',
        },
        {
            title: 'Item 2',
            image: '',
            text: 'Text 2',
        },
        {
            title: 'Item 3',
            image: '',
            text: 'Text 3',
        },
        {
            title: 'Item 4',
            image: '',
            text: 'Text 4',
        },
    ]

    const _renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    height: vs(200),
                    padding: s(20),
                    marginLeft: s(0),
                    marginRight: s(0),
                }}
            >
                <Text style={{ fontSize: 30 }}>{item.title}</Text>
                <Text>{item.text}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Carousel
                layout={'default'}
                data={carouselItems}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
                onSnapToItem={(index) => {}}
                snapToAlignment={'center'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default MainScreen
