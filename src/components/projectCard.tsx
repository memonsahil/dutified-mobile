import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { black, green, white } from "../theme/colors";
import navProps from "../types/props/components/navProps";
import projectCardProps from "../types/props/components/projectCardProps";

const ProjectCard = (props: projectCardProps & navProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.nav.navigate("Project", {
            projectId: props.projectId,
          })
        }
      >
        <Text style={styles.projectName} numberOfLines={1} ellipsizeMode="tail">
          {props.projectName}
        </Text>
        <Text
          style={styles.projectCategory}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {props.category}
        </Text>
        <View style={styles.jobsSection}>
          {props.availableJobs !== 0 || props.takenJobs !== 0 ? (
            <>
              {props.availableJobs !== 0 ? (
                <Text style={styles.jobs}>{props.availableJobs} Available</Text>
              ) : null}
              {props.takenJobs !== 0 ? (
                <Text style={styles.jobs}>{props.takenJobs} Taken</Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.jobs}>No Jobs</Text>
          )}
        </View>
        <Text style={styles.projectDesc} numberOfLines={4} ellipsizeMode="tail">
          {props.projectDesc}
        </Text>
        <Text
          style={styles.projectCreator}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {props.projectCreator}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 5,
    marginLeft: 25,
    width: 325,
    overflow: "hidden",
  },
  projectName: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 24,
    color: black,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  projectCategory: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 18,
    color: black,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  jobsSection: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },
  jobs: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 15,
    color: black,
    backgroundColor: green,
    marginLeft: 10,
    padding: 5,
  },
  projectDesc: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "IBMPlexSans-Regular",
    fontSize: 16,
    color: black,
    height: 90,
  },
  projectCreator: {
    fontFamily: "IBMPlexSans-Bold",
    fontSize: 18,
    color: black,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
});

export default ProjectCard;
