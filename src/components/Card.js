// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../pageStyles/card.css'
function BasicExample({ product, uid }) {
  const isLongTitle = product.title&&product?.title?.length > 10;
  const titleClassName = isLongTitle ? 'product-title long-title' : 'product-title';
  console.log('carduid', uid);
  return (
    <Card style={{ width: '16rem' }}>
      <Link to={`/products/${product.id}`} state={{uid}}   style={{textDecoration:'none',color: 'inherit'}}>
      <Card.Img variant="top" src={product.thumbnail} className='thumbnail' />
      <Card.Body>
        <div className="product-info">
          <h2 className={titleClassName}>{product.title}</h2>
          <div className="s-description scrollable-description">
          <p className="card-text">{product.description}</p>
        </div>
          <span className="product-price">${product.price}</span>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <p className="product-rating">Rating: {product.rating}</p>
            <p className="product-stock">In Stock: {product.stock}</p>
          </div>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </div>
      </Card.Body>
      </Link>
    </Card>
  );
}

export default BasicExample;