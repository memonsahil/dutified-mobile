type homeNavigatorParamList = {
  Home: undefined;
  Chats: undefined;
  Chat: undefined;
  AddJob: {
    projectId: string;
    projectName: string;
    jobCreatorId: string;
    jobCreator: string;
  };
  Project: {
    projectId: string;
  };
  Job: {
    jobId: string;
  };
  User: {
    userId: string;
  };
};

export default homeNavigatorParamList;
