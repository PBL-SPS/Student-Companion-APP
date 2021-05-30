/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Login : undefined;
  Signup : undefined;
  ProfileCreate : undefined;
};

export type BottomTabParamList = {
  Circulars: undefined;
  Timetable: undefined;
  WhatsNew: undefined;
  Contacts: undefined;
  Other: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export interface CircularCardProps {
  heading: string;
  content: string;
  public: boolean;
  createdAt : string;
}
