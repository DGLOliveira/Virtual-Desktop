import { useCallback, lazy, Suspense } from "react";
import { GrDocumentMissing } from "react-icons/gr";

export default function ToolIcon({ tool }){
    
        const Icon = useCallback((
            lazy(() => import(`../Tools/${tool}/icon.js`).catch(
                (error) => {
                    console.error(error);
                    return { default: () => <GrDocumentMissing /> }
                }
            ))
        ))

        return (
            <Suspense fallback={<GrDocumentMissing />}>
                <Icon/>
            </Suspense>
        );
}