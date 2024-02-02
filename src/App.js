import { createContext, useState } from 'react';
import './App.scss';
import './utils/base.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StandardLayout from './layouts/StandardLayout';
import SearchResults from './components/SearchResults/SearchResults';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

export const LoadingContext = createContext('');

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <LoadingScreen loading={loading} />
      <LoadingContext.Provider value={[loading, setLoading]}>
        <Router>
          <Routes>
            <Route exact path="/" element={<StandardLayout />} />
            <Route
              path="/items"
              element={<StandardLayout MainContent={<SearchResults />} />}
            />
            <Route
              path="/items/:id"
              element={<StandardLayout MainContent={<ProductDetail />} />}
            />
          </Routes>
        </Router>
      </LoadingContext.Provider>
    </div>
  );
};

export default App;
