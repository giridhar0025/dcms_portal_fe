import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import { store } from './app/store';

const muiTheme = createTheme({
  palette: { primary: { main: theme.colors.primary } },
  typography: { fontFamily: theme.typography.fontFamily },
});

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div>Home</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
