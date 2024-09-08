import "@/styles/globals.css";
import MainLayout from "./layouts/MainLayouts";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
      <>
      <Toaster/>
     <Component {...pageProps} />
     </>
    
  );
  
}
