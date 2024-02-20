import React, { useEffect, useState, } from 'react'
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import '../pageStyles/item.css'
import Carousel from 'react-bootstrap/Carousel';
import { Rating } from 'react-simple-star-rating';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { IoMdClose } from "react-icons/io";
function Item() {
    const userId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();
    const [isVisible, setVisible] = useState(false);

    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                console.log('Item:', data);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const addProductToCart = () => {
        if (!userId || !product) {
            console.error('User ID or product is missing.');
            return;
        }

        fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                products: [
                    {
                        id: product.id,
                        quantity: 1, // Assuming a default quantity of 1 for now
                    }
                ]
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product to cart');
                }
                return response.json();
            })
            .then(data => {
                console.log('Added to cart:', data);
                setVisible(true);
                dispatch(addToCart({ productId: product.id }));
            })
            .catch(error => {
                console.error('Error adding product to cart:', error);
            });
    };
    const onClose = () => {
        setVisible(false);
    }
    return (
        <div style={styles.itemContainer}>
            {/* slider */}
            <div style={{ backgroundColor: '#d4d4bd', display: 'flex', justifyContent: 'center' }}>
                <div style={styles.sliderDiv}>
                    <Carousel>
                        {product?.images && product?.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img src={image} alt="" width={200} height={250} className="d-block w-100" />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
            {/* slider */}

            <Card style={{ alignSelf: 'center', marginTop: 10, padding: 50, margin: 20, width: 500 }}>
                <Card.Img variant="top" style={styles.thumbnail} src={product?.thumbnail} />
                <Card.Body style={styles.itemInfo} >
                    <h2 >{product?.title}</h2>
                    <div style={styles.description}>
                        <p className="card-text">{product?.description}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={styles.itemPrice}>Price: ${product?.price}</p>
                        <p>({product?.discountPercentage})%OFF</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="item-rating">Rating: {product?.rating}</p>
                        {/* <StarRating rating={item.rating}/> */}
                        <Rating initialValue={product.rating} />
                        <p className="item-stock">In Stock: {product?.stock}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <Button onClick={addProductToCart} variant="primary">Add to Cart</Button>
                    </div>
                </Card.Body>
            </Card>
            {
                isVisible&&(
            <div style={{
                position: 'fixed', right: 220, top: 200, width: '40%', height: '20%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 40, borderRadius: 20
            }} >
               
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <h2 style={{color:'white'}}>ADDED</h2> */}
                    <h2 style={{ color: '#08f928' }}>Item added to Cart</h2>
                    <button style={{ padding: 10, marginLeft: 20, borderRadius: 10, border: 'none' }} onClick={onClose}><IoMdClose />
                    </button>
                </div>
            </div>
)}


        </div>
    )
}
const styles = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    sliderDiv: {
        alignSelf: 'center',
        height: 250,
        width: window.innerWidth * 0.7,
        backgroundColor: '#d4d4bd',
        marginBottom: 10,
        marginTop: 10
    },
    itemInfo: {
        borderRadius: 10,
        backgroundColor: '#eee4'
    },
    description: {
        marginBottom: 5,
        fontSize: 12,
        padding: 5,
        height: 70,
    },
    cardText: {},
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff'
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: 20,
        color: '#007bff'
    },
    thumbnail: {
        height: 190,
        width: 260,
        alignSelf: 'center'
    }
}

export default Item