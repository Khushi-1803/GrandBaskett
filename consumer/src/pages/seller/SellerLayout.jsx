// import { Link, NavLink, Outlet } from "react-router-dom";
// import { assets } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";

// const SellerLayout = () => {

//     const {setIsSeller} = useAppContext()

  
//     const sidebarLinks = [
//         { name: "Add Product", path: "/seller", icon:assets.add_icon },
//         { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
//         { name: "Orders", path: "/seller/orders", icon: assets.order_icon},
//     ];

//     const logout = async()=>{
//         setIsSeller(false);
//     }

//     return (
//         <>
//             <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
//                 <Link to="/">
//                     <img className="cursor-pointer w-20 md:w-24" src={assets.logo} alt="logo"/>
//                 </Link>
//                 <div className="flex items-center gap-5 text-gray-500">
//                     <p>Hi! Admin</p>
//                     <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
//                 </div>
//             </div>
//             <div className="flex">
//                <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
//                 {sidebarLinks.map((item) => (
//                     <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
//                         className={({isActive})=>`flex items-center py-3 px-4 gap-3 
//                             ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
//                                 : "hover:bg-gray-100/90 border-white "
//                             }`
//                         }
//                     >
//                         <img src={item.icon} alt="" className="w-7 h-7"/>
//                         <p className="md:block hidden text-center">{item.name}</p>
//                     </NavLink>
//                 ))}
//             </div> 
//             <Outlet/> 
//             </div>
           
//         </>
//     );
// };

// export default SellerLayout;



import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout");  //"Send a POST request to /api/seller/logout, wait for the response, and store the JSON response body in the variable data.
      if (data.success) {
        if (data.success) {
          toast.success(data.message);
          navigate("/");
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="md:w-64 w-20 bg-white border-r border-gray-200 shadow-sm flex flex-col transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center justify-center border-b border-gray-200">
          <Link to="/">
            <img
              className="cursor-pointer w-12 md:w-20"
              src={assets.logo}
              alt="logo"
            />
          </Link>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center rounded-lg px-4 py-3 gap-3 transition-all duration-200 
                 ${
                   isActive
                     ? "bg-primary/10 text-primary font-medium border-r-4 md:border-r-[6px] border-primary"
                     : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                 }`
              }
            >
              <img src={item.icon} alt="" className="w-6 h-6" />
              <span className="hidden md:block">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-2 bg-white shadow-sm border-b border-gray-200">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Seller Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Hi, <span className="font-medium">Admin</span>
            </p>
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
