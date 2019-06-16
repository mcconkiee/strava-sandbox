export interface UserProps {
  UUIDS: string;
}

export interface AppConstants {
  USER: UserProps;
}
const constants: AppConstants = {
  USER: {
    UUIDS: "UUIDS"
  }
}
export default constants;
