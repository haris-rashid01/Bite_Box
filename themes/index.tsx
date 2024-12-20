import { opacity } from "react-native-reanimated/lib/typescript/Colors";

const palette = [
    {
      text: '#f97316', // Orange
      bgColor: (opacity) => `rgba(251, 146, 60, ${opacity})`,
    },
    {
      text: '#334155', // Dark Gray
      bgColor: (opacity) => `rgba(30, 41, 59, ${opacity})`,
    },
    {
      text: '#7c3aed', // Purple
      bgColor: (opacity) => `rgba(167, 139, 250, ${opacity})`,
    },
    {
      text: '#009950', // Green
      bgColor: (opacity) => `rgba(0, 179, 89, ${opacity})`,
    },
    {
      text: '#14b8a6', // Teal
      bgColor: (opacity) => `rgba(45, 212, 191, ${opacity})`,
    },
    {
      text: '#dc2626', // Red
      bgColor: (opacity) => `rgba(248, 113, 113, ${opacity})`,
    },
  ]
  
  export const themeColors = {
    ...palette[3]
  };
  