import { lazy, Suspense, useCallback } from "react";
import { GrDocumentMissing } from "react-icons/gr";
import ErrorBoundary from "../../GlobalComponents/ErrorBoundary.jsx";

export const AppIcon = ({ appName }) => {
  const Icon = useCallback((
    lazy(() => import(`./../../../Apps/${appName}/icon.js`).catch(
      (error) => {
        console.error(error);
        return { default: () => <GrDocumentMissing /> }
      }
    ))
  ), [appName]);

  return (
    <ErrorBoundary fallback={<GrDocumentMissing />}>
      <Suspense fallback={<GrDocumentMissing />}>
        <Icon />
      </Suspense>
    </ErrorBoundary>
  )
}