import userState from "./userState";

export default interface authUserState extends userState {
  workSetup: {
    preferredCategories: string[];
    totalJobs: string;
  };
}
