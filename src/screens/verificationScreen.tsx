import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { blue, gray, green, white } from "../theme/colors";
import screens from "../types/params/screens";

const VerificationScreen = () => {
  const [code, setCode] = useState("");

  const navigation: NavigationProp<screens> = useNavigation();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
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
          <Text style={styles.heading}>Verification</Text>
        </View>
        <Text style={styles.text}>Enter your verification code below.</Text>
        <View style={styles.verificationSection}>
          <Text style={styles.field}>Code</Text>
          <TextInput
            placeholder="000000"
            value={code}
            onChangeText={setCode}
            style={styles.input}
            placeholderTextColor={gray}
            inputMode="numeric"
          />
        </View>
        <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate("Password")}
            style={styles.button}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  verificationSection: {
    width: "80%",
    justifyContent: "space-around",
  },
  field: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 25,
    paddingTop: "10%",
    color: white,
  },
  input: {
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 20,
    color: white,
    width: "100%",
    paddingTop: "5%",
    borderBottomColor: white,
    borderBottomWidth: 2,
    alignSelf: "center",
  },
  button: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 25,
    color: green,
    alignSelf: "center",
    paddingTop: "10%",
    paddingBottom: "20%",
  },
});

export default VerificationScreen;
