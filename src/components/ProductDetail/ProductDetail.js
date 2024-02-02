import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../App";
import './ProductDetail.scss';
import { useParams } from 'react-router-dom';
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const ProductDetail = () => {
  const [loading, setLoading] = useContext(LoadingContext);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState('');
  const formatOptions = { style: 'currency', currency: 'ARS' };
  const numberFormat = new Intl.NumberFormat('es-AR', formatOptions);
  const { id } = useParams();

  const getProductById = (id) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_LOCAL_API_URL}/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setCategory(data?.item?.category)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err); 
        setLoading(false);
      })
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  return <>
  <Breadcrumb items={[category, product?.item?.title]} />
    <div className="card-1">
      {
        product?.item ?
        <div className="product-detail-container">
          <div className="pd-heading">
            <span>
              {product.item?.condition === 'new' ? 'Nuevo' : 'Usado'}
              &nbsp;- {product.item?.sold_quantity} vendidos
            </span>
            <span className="pd-header-title">{product.item?.title}</span>
            <div className="pd-header-price">
              <span>
                {numberFormat.format(product.item?.price?.amount).replace(/,00/, '')}
              </span>
              <span className="pd-header-price-decimals">
                {product.item?.price?.decimals}
              </span>
            </div>
            <button className="btn-1">Comprar</button>
          </div>
          <img src={product.item?.picture} alt={product.item?.title} />
          <div className="pd-description">
            <h3>Descripción del producto</h3>
            <p>{product.item?.description}</p>
          </div>
        </div>
        : null
      }
    </div>
  </>
};

export default ProductDetail;