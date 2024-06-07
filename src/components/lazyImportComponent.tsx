import { Suspense, LazyExoticComponent } from 'react';

import FullScreenLoading from '@/components/layout/loading';

const LazyImportComponent = (props: { lazyChildren: LazyExoticComponent<() => JSX.Element> }) => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <props.lazyChildren />
    </Suspense>
  );
};

export default LazyImportComponent;
