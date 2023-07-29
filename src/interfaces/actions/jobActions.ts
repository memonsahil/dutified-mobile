import requestStatus from "../../enums/requestStatus";
import jobState from "../state/jobState";

export default interface jobActions {
  getJobResults: (searchQuery: string) => Promise<{
    status: requestStatus;
    errorCode?: string;
    data?: jobState[];
  }>;
  getProjectJobs: (projectId: string) => Promise<{
    status: requestStatus;
    errorCode?: string;
    data?: jobState[];
  }>;
  getJob: (jobId: string) => Promise<{
    status: requestStatus;
    errorCode?: string;
    data?: jobState;
  }>;
  findPreferredJobs: (details: {
    preferredCategories: string[];
    totalJobs: string;
  }) => Promise<{
    status: requestStatus;
    errorCode?: string;
    data?: jobState[];
  }>;
}
