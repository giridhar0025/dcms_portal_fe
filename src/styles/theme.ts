import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#1976d2',
    secondary: '#9c27b0',
    background: '#f5f5f5',
    text: '#333',
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 },
    body1: { fontSize: '1rem' },
  },
};

export default theme;
