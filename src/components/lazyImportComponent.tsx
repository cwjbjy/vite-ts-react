import { LazyExoticComponent } from 'react';

const LazyImportComponent = (props: { lazyChildren: LazyExoticComponent<() => JSX.Element> }) => {
  return (
    <>
      <props.lazyChildren />
    </>
  );
};

export default LazyImportComponent;
