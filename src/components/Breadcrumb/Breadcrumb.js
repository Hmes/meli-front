import './Breadcrumb.scss';

const Breadcrumb = ({ items }) => {
  return <div className="breadcrumb">
    {items?.length && items.join(' » ')}
  </div>
};

export default Breadcrumb;