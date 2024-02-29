import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRouter";
import { AuthProvider } from "./components/auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <main>
        <RouterProvider router={router} />
      </main>
    </AuthProvider>
  );
}

export default App;
