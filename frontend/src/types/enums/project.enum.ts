export type Project = {
  id: string;
  name: string;
  description: string;
  dueDate:Date;
  status: ProjectStatus;
  colour: string;
  members: {
    id: string;
    fullName: string;
    avatar?: {
      url: string;
      localPath: string;
    };
  }[];
  createdBy: {
    id: string;
    fullName: string;
    avatar?: {
      url: string;
      localPath: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};


export enum ProjectStatus {
  ALL="all",
  ACTIVE = "active",
  ARCHIVED = "archived",
  COMPLETED = "completed",
}


export type availableProjects={
  id:string;
  name:string;
}