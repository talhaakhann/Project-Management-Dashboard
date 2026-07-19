export interface availableMembers {
    id: string,
    fullName: string
}
export interface availableAssignees {
    id: string,
    fullName: string
}

export interface User {
  fullName: string;
  email: string;
  password:string;
  avatar: { url: string; localPath: string };
  refreshToken:string;
  accessToken:string;
  role:string;
  isActive:boolean;

}