
import React from "react"
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({product}) => {
    
    const {currency,addToCart,removeFromCart,cartItems,navigate} = useAppContext()

    return product && (
        <div 
          onClick={() => {
            navigate(`/products/${product.category.toLowerCase()}/${product._id}`); 
            scrollTo(0,0)
          }} 
          className="border border-gray-500/20 rounded-md px-3 sm:px-4 py-2 bg-white min-w-[14rem] max-w-[14rem] w-full"
        >
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img 
                  className="group-hover:scale-105 transition max-w-[6.5rem] sm:max-w-[9rem] object-contain" 
                  src={product.image[0]} 
                  alt={product.name} 
                />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p className="text-xs sm:text-sm">{product.category}</p>
                <p className="text-gray-700 font-medium text-base sm:text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img 
                          className="w-3 sm:w-3.5" 
                          key={i} 
                          src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
                        />
                    ))}
                    <p className="text-xs sm:text-sm">(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="text-primary font-medium text-base sm:text-xl">
                        {currency}{product.offerPrice}{" "} 
                        <span className="text-gray-500/60 text-xs sm:text-sm line-through">{product.price}</span>
                    </p>
                    <div onClick={(e) => {e.stopPropagation();}} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button 
                              className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-[64px] sm:w-[80px] h-[34px] rounded text-primary-600 font-medium cursor-pointer" 
                              onClick={() => addToCart(product._id)} 
                            >
                                <img src={assets.cart_icon}/>
                                <span className="hidden sm:inline">Add</span>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 w-16 sm:w-20 h-[34px] bg-primary/25 rounded select-none text-sm sm:text-base">
                                <button onClick={() => removeFromCart(product._id)} className="cursor-pointer px-2 h-full">
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer px-2 h-full">
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
