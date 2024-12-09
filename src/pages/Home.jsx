//rafce
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slice/productSlice'

const Home = () => {
  const dispatch = useDispatch()
  const {allProducts,loading,errorMsg} = useSelector(state=>state.productReducer)
  // console.log(allProducts,loading,errorMsg);
  const [currentPage,setCurrentPage] = useState(1)
  const productsPerPage = 8
  const totalPages = Math.ceil(allProducts?.length/productsPerPage)
  const currentPageLastIndux = currentPage * productsPerPage
  const currentPageFirstIndux = currentPageLastIndux - productsPerPage
  const visibleProducts = allProducts?.slice(currentPageFirstIndux,currentPageLastIndux)

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  
  const nextPage = () => {
    if(currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <Header insideHome={true}/>
      <div style={{paddingTop:'100px'}} className="container px-4 mx-auto">
        {
          loading?
          <div className="flex justify-center items-center my-5 text-lg">
            <img width={'100px'} height={'100px'} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="loading" />
            Loading...
          </div>
          :
          <>
            <div className="grid grid-cols-4 gap-4">
              {
                allProducts?.length>0 ?
                visibleProducts?.map(product=>(
                  <div key={product?.id} className="rounded border p-2 shadow">
                    <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="image"/>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{product.title}</h3>
                      <Link to={`/${product?.id}/view`} className='bg-violet-600 rounded p-1 mt-3 text-white inline-block'>View More...</Link>
                    </div>
                  </div>
                ))
                :
                <div className="flex justify-center items-center font-bold text-red-600 my-5 text-lg">
                  Product Not Found!!
                </div>
              }
            </div>
            <div className="text-2xl text-center font-bold my-20">
              <span onClick={prevPage} className="cursor-pointer"><i className="fa-solid fa-backward me-5"></i></span>
              <span>{currentPage} of {totalPages} </span>
              <span onClick={nextPage} className="cursor-pointer"><i className="fa-solid fa-forward ms-5"></i></span>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Home