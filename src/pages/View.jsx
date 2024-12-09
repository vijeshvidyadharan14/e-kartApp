//rafce
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWislist } from '../redux/slice/wishlistSlice'
import { addToCart } from '../redux/slice/cartSlice'

const View = () => {
  const userCart = useSelector((state) => state.cartReducer)
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const [product,setProduct] = useState({})
  const {id} = useParams()
  // console.log(id);
  // console.log(product);
  
  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
    }
  },[])

  const handleWishlist = () => {
    const existingProduct = userWishlist?.find(item=>item?.id==id)
    if(existingProduct){
      alert('Already in wishlist')
    }else{
      alert('Added to wishlist')
      dispatch(addToWislist(product))
    }
  }

  const handleCart = () => {
    dispatch(addToCart(product))
    const existingProduct = userCart?.find(item=>item?.id==id)
    if(existingProduct){
      alert('Product quantity increased')
    }else{
      alert("Product added to cart")
    }
  }

  return (
    <>
      <Header/>
      <div className='flex flex-col mx-5'>
        <div className='grid grid-cols-2 items-center h-screen'>
          <div className='px-8'>
            <img className='ms-40' width={'350px'} height={'250px'} src={product?.thumbnail} alt="image" />
            <div className="flex justify-between mt-5">
              <button onClick={handleWishlist} className="bg-blue-600 text-white p-2">ADD TO WHISHLIST</button>
              <button onClick={handleCart} className="bg-green-600 text-white p-2">ADD TO CART</button>
            </div>
          </div>
          <div>
            <h3 className="font-bold">PID : {product?.id}</h3>
            <h1 className="text-5xl font-bold py-4">{product?.title}</h1>
            <h4 className="font-bold text-red-600 text-2xl">${product?.price}</h4>
            <h4 className='pt-1'>Brand : {product?.brand}</h4>
            <h4 className='pt-1'>Category : {product?.category}</h4>
            <p className='pt-1'>
              <span className='font-bold'>Description</span> : {product?.description}
            </p>
            <h3 className="font-bold my-4">Client Reviews</h3>
            {
              product?.reviews?.length>0?
              product?.reviews.map((item)=>(
                <div key={item.date} className="shadow border rounded p-2 mb-2">
                  <h5>
                    <span className="font-bold">{item?.reviewerName}</span> : <span>{item?.comment}</span>
                  </h5>
                  <p>Rating: {item?.rating} <i className="fa-solid fa-star text-yellow-400"></i></p>
                </div>
              ))
              :
              <div className="font-bold text-red-600">No reviews yet</div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default View