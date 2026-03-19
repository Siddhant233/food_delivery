import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/store";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1c1917",
                color: "#fafaf9",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "500",
              },
              success: { iconTheme: { primary: "#f97316", secondary: "#fff" } },
            }}
          />
          <Navbar />
          <main>
            <AppRoutes />
          </main>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
