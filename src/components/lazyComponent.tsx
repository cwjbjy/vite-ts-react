import { Suspense, LazyExoticComponent } from 'react';

import FullScreenLoading from '@/components/layout/loading';

export default function LazyComponent(props: { lazyChildren: LazyExoticComponent<() => JSX.Element> }) {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <props.lazyChildren />
    </Suspense>
  );
}
