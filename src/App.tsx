import Layout from './components/Layout';
import PriceFinder from './components/PriceFinder';
import PriceResults from './components/PriceResults';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback='...is loading'>
      <Layout>
        <PriceFinder />
        <PriceResults />
      </Layout>
    </Suspense>
  );
}

export default App;
