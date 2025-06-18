import './App.css'
import AppRoutes from "./routes";
import { Toaster } from "sonner"
import Navbar from '@/components/Navbar';

function App() {

  return (
    <>
      <Navbar />
      <AppRoutes />
      <Toaster position="top-right" richColors/>
    </>
  )
}

export default App
