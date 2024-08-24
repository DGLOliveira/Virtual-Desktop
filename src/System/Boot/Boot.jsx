
import {Suspense, lazy} from "react";
import StartupScreen from "./StartupScreen.jsx";

export default function Boot() {
    const OS = lazy(() => import("./OS.jsx").catch(
      (error) => {
        let errorMessage = "Failed to load 3d Scene";
        console.error(error);
        return { default: () => <h1>{"Something Went Wrong :("}</h1> };
      }
    ))
    return( 
    <Suspense fallback={<StartupScreen />}>
        <OS />
    </Suspense>
    );
}