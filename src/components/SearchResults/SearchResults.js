import React, { useContext, useEffect, useState } from 'react';
import { LoadingContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.scss';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const SearchResults = () => {
  const [loading, setLoading] = useContext(LoadingContext);
  const [results, setResults] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [mainCategory, setMainCategory] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');
  const pagLimit = 4;

  useEffect(() => {
    onSearch();
  }, [query]);

  const getMostCommonCategoryName = (categories) => {
    const nameCounts = {};

    if (!categories?.length) return;

    categories.forEach((value => {
      nameCounts[value] = (nameCounts[value] || 0) + 1;
    }));

    let mostCommonName;
    let highestCount = 0;

    Object.entries(nameCounts).forEach(([name, count]) => {
      if (count > highestCount) {
        mostCommonName = name;
        highestCount = count;
      }
    });

    setMainCategory(mostCommonName);
  };

  const onSearch = () => {
    setLoading(true);
    setResults([]);
    fetch(
      `${process.env.REACT_APP_LOCAL_API_URL}/sites/MLA/search?limit=${pagLimit}`
      + `&q=${query || ''}`
    ).then((res) => res.json())
    .then(({ items, categories }) => {
      setResults(items);
      setCategoriesArr(categories);
      getMostCommonCategoryName(categories);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error al obtener datos del servidor:', err); 
      setLoading(false);
    })
  };

  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };
  
  return <>
  <Breadcrumb items={[mainCategory, query]} />
    <div className="card-1 search-results-container">
      {
        (
          results?.length && results.map((item, i) => {
            const currency = item.price?.currency || '';
            const formatOptions = { style: 'currency', currency: currency };
            const numberFormat = new Intl.NumberFormat('es-AR', formatOptions);
            
            return <div 
              key={item.id} 
              className="search-results-item" 
              onClick={() => handleItemClick(item.id)}
            >
              <img src={item.picture} alt={item.title} />
              <div className="search-results-item-description">
                <div className="sr-item-description-price">
                  <span>
                    {numberFormat.format(item.price?.amount).replace(/,00/, '')}
                  </span>
                  <span className="sr-item-description-price-decimals">
                    {item.price?.decimals}
                  </span>
                </div>
                <span className="sr-item-description-title">{item.title}</span>
              </div>
              <div className="search-results-item-category">
                {categoriesArr[i]}
              </div>
            </div>
          })
        ) || null
      }
    </div>
  </>
};

export default SearchResults;