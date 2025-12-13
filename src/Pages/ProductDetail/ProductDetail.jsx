// import React from 'react'
import React,{ useEffect, useState} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import Loader from '../../Components/Loader/Loader'
import ProductCard from '../../Components/Product/ProductCard'


function ProductDetail() {
 const [product, setproduct] = useState({}) 
 const [isloading, setIsLoading] = useState(false)
 const {productId} = useParams()
  // console.log(productId)

  useEffect (() =>{ 
     setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
.then((res) => {
  // console.log(res);
   setproduct(res.data);
setIsLoading(false)
}) .catch((err) =>{
  // console.log(err)
  setIsLoading(false)

});
},[])
  return (
    <LayOut> 
      {isloading? (<Loader/>) :(<ProductCard 
      product ={product}
      flex = {true}
      renderDesc ={true}
      renderAdd={true}

      />)}
    </LayOut>
     
  ) 
}

export default ProductDetail