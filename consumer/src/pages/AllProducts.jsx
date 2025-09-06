import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery} = useAppContext();
  const [filterProducts, setFilterProducts] = useState([])

  useEffect(()=>{
    if (searchQuery.length > 0) {
        setFilterProducts(products.filter(
            product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))}else{
            setFilterProducts(products)
        }
  },[products,searchQuery])
  return (
    <div className="mt-10  flex flex-col ">
      <div className="flex flex-col items-start w-full">
        <p className="text-3xl font-extrabold bg-gradient-to-r from-primary to-primary-dull bg-clip-text text-transparent mb-5">
          ALL PRODUCTS
        </p>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 mt-6">
            {filterProducts.filter((product)=>product.inStock).map((product,index)=>(
                <ProductCard key={index} product={product}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
