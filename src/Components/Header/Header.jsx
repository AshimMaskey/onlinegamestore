import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faShoppingCart, faSignInAlt, faBars, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AdminContext from "../Context/AdminContext";

const Header = () => {
    const { user, cart } = useContext(AdminContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 1, link: "Home", path: "/" },
        { id: 2, link: "Store", path: "/Store" },
        { id: 3, link: "News", path: "/News" }
    ];

    const navItems2 = [
        { id: 4, link: "Search", path: "/Search", icon: faMagnifyingGlass },
        { id: 5, link: "Cart", path: user ? "/Cart" : "/Signin", icon: faShoppingCart, value: cart.length },
        { id: 6, link: user ? user.username : "Sign in", path: user ? "/Account" : "/Signin", icon: user ? faUser : faSignInAlt }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className="sticky top-0 left-0 z-50 w-full flex justify-between items-center px-6 py-2 bg-[#18181C]">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img className="w-16 h-16" src={logo} alt="logo of game vortex" />
                        <span className="font-bold text-2xl text-white">GameVortex</span>
                    </Link>
                </div>
                <div className="hidden lg:block">
                    <ul className="flex">
                        {navItems.map(({ id, link, path }) => (
                            <NavLink
                                key={id}
                                className={({ isActive }) =>
                                    `hover:text-white ml-10 hover:border-b-2 hover:border-white text-lg text-[#ffffffc6] ${isActive ? 'border-b-2 text-white' : ''}`
                                }
                                to={path}
                            >
                                {link}
                            </NavLink>
                        ))}
                    </ul>
                </div>
                <div className="hidden lg:block">
                    <ul className="flex">
                        {navItems2.map(({ id, link, path, icon, value }) => (
                            <NavLink
                                key={id}
                                className="hover:text-white hover:border-b-2 hover:border-white text-md md:text-lg mx-4 text-[#ffffffc6]"
                                to={path}
                            >
                                {value && <span className="text-red-500 font-semibold font-mono text-md">{value}</span>}
                                <FontAwesomeIcon className="mr-2" icon={icon} />
                                {link}
                            </NavLink>
                        ))}
                    </ul>
                </div>
                <FontAwesomeIcon
                    className="lg:hidden block text-2xl text-white cursor-pointer"
                    icon={isMobileMenuOpen ? faTimes : faBars}
                    onClick={toggleMobileMenu}
                />
            </nav>
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-[#18181C] text-white p-4">
                    <ul >
                        {navItems.map(({ id, link, path }) => (
                            <NavLink
                                key={id}
                                className="block mb-2 hover:text-white text-lg text-[#ffffffc6]"
                                to={path}
                                onClick={toggleMobileMenu}
                            >
                                {link}
                            </NavLink>
                        ))}
                        {navItems2.map(({ id, link, path, icon, value }) => (
                            <NavLink
                                key={id}
                                className="block mb-2 hover:text-white text-md md:text-lg text-[#ffffffc6]"
                                to={path}
                                onClick={toggleMobileMenu}
                            >
                                {value && <span className="text-red-500 font-semibold font-mono text-md">{value}</span>}
                                <FontAwesomeIcon className="mr-2" icon={icon} />
                                {link}
                            </NavLink>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Header;
