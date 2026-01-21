import { useCallback, lazy, Suspense } from "react";
import ErrorMessage from "../../../System/GlobalComponents/ErrorMessage.jsx";
import Loading from "../../../System/GlobalComponents/Loading.jsx";

export default function Tool({ tool, action, setAction, appMenu, setAppMenu }){
    
        const ToolApp = useCallback((
            lazy(() => import(`../Tools/${tool}/index.jsx`).catch(
                (error) => {
                    let errorMessage = "Failed to load Tool";
                    console.error(error);
                    return { default: () => <ErrorMessage errorMessage={errorMessage} /> }
                }
            ))
        ), [tool]);

        return (
            <Suspense fallback={<Loading />}>
                <ToolApp action={action} setAction={setAction} appMenu={appMenu} setAppMenu={setAppMenu} />
            </Suspense>
        );
}