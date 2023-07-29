import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useJobStore from "../stores/useJobStore";
import useAuthStore from "../stores/useAuthUserStore";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import { black, blue, green, white } from "../theme/colors";
import screens from "../types/params/screens";
import jobScreenProps from "../types/props/screens/jobScreenProps";

const JobScreen = ({ route }: jobScreenProps) => {
  const { jobId } = route.params;

  const [jobName, setJobName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [jobCreatorId, setJobCreatorId] = useState<string>("");
  const [jobCreator, setJobCreator] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { getJob } = useJobStore((state) => state);
  const { userDetails } = useAuthStore((state) => state);

  const navigation: NavigationProp<screens> = useNavigation();

  useEffect(() => {
    getJob(jobId)
      .then((result) => {
        setJobName(result.data?.jobName!);
        setCategory(result.data?.category!);
        setPayment(result.data?.payment!);
        setStatus(result.data?.status!);
        setDeadline(result.data?.deadline!);
        setJobDesc(result.data?.jobDesc!);
        setProjectId(result.data?.projectId!);
        setProjectName(result.data?.projectName!);
        setJobCreatorId(result.data?.jobCreatorId!);
        setJobCreator(result.data?.jobCreator!);

        setLoading(false);
      })
      .catch(() => {
        Alert.alert(
          "Error Occurred",
          "An error occurred, please try again or contact our support team.",
          [
            {
              text: "Dismiss",
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
        );
      });
  }, [jobId]);

  return (
    <View style={styles.container}>
      {loading === false ? (
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
            <Text style={styles.heading} numberOfLines={1} ellipsizeMode="tail">
              {jobName}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <View>
              <Text style={styles.info}>{category}</Text>
            </View>
            <View style={styles.jobsSection}>
              <Text style={styles.info}>${payment}</Text>
              <Text style={styles.info}>{status}</Text>
            </View>
          </View>
          <Text style={styles.deadline}>{deadline}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Project", {
                projectId: projectId,
              })
            }
          >
            <Text style={styles.button} numberOfLines={1} ellipsizeMode="tail">
              {projectName}
            </Text>
          </TouchableOpacity>
          <Text style={styles.jobDesc}>{jobDesc}</Text>
          <TouchableOpacity
            onPress={() =>
              jobCreator === `${userDetails.firstName} ${userDetails.lastName}`
                ? navigation.navigate("Profile")
                : navigation.navigate("User", {
                    userId: jobCreatorId,
                  })
            }
          >
            <Text style={styles.button} numberOfLines={1} ellipsizeMode="tail">
              {jobCreator}
            </Text>
          </TouchableOpacity>
          {jobCreator !== `${userDetails.firstName} ${userDetails.lastName}` ? (
            <View style={styles.buttonSection}>
              <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                <Text style={styles.sectionButton}>Chat</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <Progress.Bar
            width={250}
            height={25}
            borderRadius={20}
            indeterminate={true}
            color={green}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "flex-start",
    paddingBottom: "20%",
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
  infoSection: {
    alignItems: "flex-start",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
  },
  info: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 15,
    color: black,
    backgroundColor: green,
    marginRight: 10,
    padding: 5,
  },
  jobsSection: {
    flexDirection: "row",
    paddingTop: 10,
  },
  jobDesc: {
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 18,
    color: white,
    width: "80%",
    paddingBottom: 20,
    alignSelf: "center",
  },
  button: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 25,
    color: green,
    paddingLeft: 30,
    paddingRight: 100,
    paddingBottom: 20,
  },
  deadline: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 25,
    color: white,
    paddingLeft: 30,
    paddingRight: 100,
    paddingBottom: 20,
  },
  buttonSection: {
    alignSelf: "center",
    paddingBottom: "5%",
  },
  sectionButton: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 25,
    color: green,
  },
});

export default JobScreen;
