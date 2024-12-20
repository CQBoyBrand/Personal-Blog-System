import { Suspense, LazyExoticComponent, FC } from "react";
import LoadingPage from "@/components/LoadingPage/Loading";
const LazyImportComponent: FC<any> = (props: { lazyChildren: LazyExoticComponent<() => JSX.Element> }) => {
    return (
      <Suspense fallback={<LoadingPage />}>
        <props.lazyChildren />
      </Suspense>
    );
  };
  export default LazyImportComponent;