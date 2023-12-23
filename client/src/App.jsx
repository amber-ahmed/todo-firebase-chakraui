import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./jsx/views/Landing";
import Dashboard from "./jsx/views/Dashboard";
import RootLayout from "./jsx/layouts/RootLayout";
import Login from "./jsx/views/authentications/Login";
import Register from "./jsx/views/authentications/Register";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import colors from "./themes/theme.jsx";
import ThemeContext from "./contexts/ThemeContext.js";
import { useState } from "react";
import RegisterName from "./jsx/views/authentications/RegisterName";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Form from "./jsx/views/forms/Form";
import { requestPermission } from "./firebase/models/notification.js";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<AuthRoutes />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register_name" element={<RegisterName />} />

      </Route>

      <Route index element={<Landing />} />
      <Route path="form" element={<Form />} />
    </Route>
  )
);

function App() {
  const selectedTheme = localStorage.getItem("theme");
  const [userTheme, setUserTheme] = useState(selectedTheme || "rainbow");

  const theme = extendTheme({
    colors:
      userTheme === "light"
        ? colors.light
        : userTheme === "dark"
        ? colors.dark
        : colors.rainbow,
    styles: {
      global: {
        body: {
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          bg: "primary",
        },
      },
    },
  });
  requestPermission();

  return (
    <ThemeContext.Provider value={setUserTheme}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ChakraProvider>
    </ThemeContext.Provider>
  );
}

export default App;
