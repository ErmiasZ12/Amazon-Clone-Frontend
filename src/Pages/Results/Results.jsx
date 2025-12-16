import React, {useEffect,useState} from 'react'
import classes from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function Results() {
      const {categoryName} = useParams()
      const [isloading, setIsLoading] = useState(false)
      
      // console.log(categoryName);
       const[results, setResults] = useState([])
 
    useEffect(() => {
      setIsLoading(true)
 axios.get(`${productUrl}/products/category/${categoryName}`)
   .then((res) => {
    //  console.log(res);
     setResults(res.data);
     setIsLoading(false);
    //  console.log(res.data)
   })
   .catch((err) => {
    setIsLoading(false);
     console.log(err);
   });

    }, [])   


  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results </h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {isloading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results