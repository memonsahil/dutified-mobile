import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { blue, green, white } from "../theme/colors";
import screens from "../types/params/screens";

const AboutScreen = () => {
  const navigation: NavigationProp<screens> = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <AntDesign
            name="caretleft"
            size={30}
            color={green}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.heading}>About</Text>
        </View>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </Text>
        <View style={styles.aboutSection}>
          <TouchableOpacity onPress={() => navigation.navigate("TOS")}>
            <Text style={styles.button}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("PP")}>
            <Text style={styles.button}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.version}>1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSection: {
    flexDirection: "row",
    paddingTop: "20%",
    paddingLeft: 30,
    paddingRight: 30,
    height: 150,
    width: 400,
    alignItems: "center",
  },
  heading: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 30,
    color: white,
    paddingLeft: 20,
    paddingRight: 30,
  },
  text: {
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 18,
    color: white,
    paddingTop: "5%",
    width: "80%",
  },
  aboutSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "5%",
  },
  button: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 25,
    paddingTop: "10%",
    color: green,
  },
  version: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 14,
    marginTop: "10%",
    color: white,
    paddingBottom: "20%",
  },
});

export default AboutScreen;
