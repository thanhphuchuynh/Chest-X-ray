import { StackNavigationProp } from '@react-navigation/stack';
// import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  PortScreen: undefined;
  DetectScreen: { PORT_INPUT: string };
  Introduction: undefined;
};

export type PortScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PortScreen'
>;
export type DetectScreenScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DetectScreen'
>;
export type IntroductionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Introduction'
>;
