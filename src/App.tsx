import { Toaster } from "react-hot-toast";

import { LoadingPages } from "@/components/sections";
import RouterApp from "@/routes";

import useStore from "./store";

function App() {
  const { isLoading } = useStore();
  return (
    <>
      <RouterApp />
      <Toaster position="top-center" />
      <LoadingPages isLoading={isLoading} />
    </>
  );
}

export default App;
