
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get("/api/user/logout");
            if (data.success) {
                toast.success(data.message)
                setUser(null);
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }
    }, [searchQuery])

    return (
        <nav className="flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 h-20 border-b border-gray-300 bg-white relative transition-all z-50">

            <NavLink to="/">
                <img onClick={() => setOpen(false)} className='h-full max-h-16 object-contain' src={assets.logo} />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-6 lg:gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Products</NavLink>
                <NavLink to='/contact'>Contact</NavLink>

                {/* Search bar - visible only on lg+ */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img className='h-4 w-4' src={assets.search_icon} alt="search" />
                </div>

                {/* Cart Icon */}
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img className='w-6 opacity-80' src={assets.nav_cart_icon} />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {/* User Section */}
                {!user ?
                    (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-6 lg:px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>)
                    :
                    (
                        <div className='relative group'>
                            <img src={assets.profile_icon} className='w-10' alt='profile' />
                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40'>
                                <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                                <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                            </ul>
                        </div>
                    )}
            </div>

            {/* Mobile Menu Button */}
            <div className='flex items-center gap-4 sm:hidden'>
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img className='w-6 opacity-80' src={assets.nav_cart_icon} />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => setOpen(!open)} aria-label="Menu">
                    <img src={assets.menu_icon} alt='menu' />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-[80px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-3 px-5 text-sm md:hidden z-40 transition-all">
                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                    <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

                    {/* Show "My Orders" if user is logged in */}
                    {user && <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>}

                    {/* Mobile Search */}
                    <div className="flex items-center w-full text-sm gap-2 border border-gray-300 px-3 py-2 rounded-full">
                        <input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
                            type="text"
                            placeholder="Search products"
                        />
                        <img className='h-4 w-4' src={assets.search_icon} alt="search" />
                    </div>

                    {/* Auth Buttons */}
                    {!user ? (
                        <button onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }} className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm mt-2">
                            Login
                        </button>
                    ) : (
                        <button onClick={logout} className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm mt-2">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar