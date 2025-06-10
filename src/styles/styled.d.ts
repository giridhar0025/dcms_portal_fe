import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    spacing: (factor: number) => string;
    typography: {
      fontFamily: string;
      h1: { fontSize: string; fontWeight: number };
      body1: { fontSize: string };
    };
  }
}
