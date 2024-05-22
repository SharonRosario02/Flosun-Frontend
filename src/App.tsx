// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/global";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { RouteNames } from "./types/RouteNames";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import Favorite from "./pages/Favorite";
import Feedback from "./pages/Feedback";
import Aboutus from "./pages/Aboutus";
import Reminder from "./pages/Reminder";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFeedbacks from "./pages/AdminFeedbacks";
import AdminProducts from "./pages/AdminProducts";
import LoginPage from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import AuthWrapper from "./components/(auth)/AuthWrapper";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <StyledApp>
      <BrowserRouter>
        <Routes>
          {/* Routes with Layout */}
          <Route path={RouteNames.HOME} element={<Layout />}>
            <Route
              index
              element={
                <AuthWrapper>
                  <Home />
                </AuthWrapper>
              }
            />
            <Route
              path={RouteNames.SHOP}
              element={
                <AuthWrapper>
                  <Shop />
                </AuthWrapper>
              }
            />
            <Route
              path={`${RouteNames.SHOP}/:id`}
              element={
                <AuthWrapper>
                  <ItemDetail />
                </AuthWrapper>
              }
            />
            <Route
              path={RouteNames.FAVORITE}
              element={
                <AuthWrapper>
                  <Favorite />
                </AuthWrapper>
              }
            />
            <Route
              path={RouteNames.FEEDBACK}
              element={
                <AuthWrapper>
                  <Feedback />
                </AuthWrapper>
              }
            />
            <Route
              path={RouteNames.ABOUTUS}
              element={
                <AuthWrapper>
                  <Aboutus />
                </AuthWrapper>
              }
            />
            <Route
              path={RouteNames.REMINDER}
              element={
                <AuthWrapper>
                  <Reminder />
                </AuthWrapper>
              }
            />
            {/* Admin Routes */}
            <Route path={RouteNames.ADMIN_DASHBOARD} element={<AuthWrapper isAdminRoute>
  <AdminDashboard />
</AuthWrapper>} />
<Route path={RouteNames.ADMIN_FEEDBACKS} element={<AuthWrapper isAdminRoute>
  <AdminFeedbacks />
</AuthWrapper>} />
<Route path={RouteNames.ADMIN_PRODUCTS} element={<AuthWrapper isAdminRoute>
  <AdminProducts />
</AuthWrapper>} />
          </Route>
          {/* Routes without Layout */}
          <Route path={RouteNames.SIGNUP} element={<Signup />} />
          <Route path={RouteNames.LOGIN} element={<LoginPage />} />
          <Route path={RouteNames.RESET_PASSWORD} element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </StyledApp>
  </ThemeProvider>
);

export default App;

const StyledApp = styled.div`
  margin: 0 auto;
  max-width: 1800px;
`;