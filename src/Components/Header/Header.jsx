import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faShoppingCart, faSignInAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from "react-router-dom";
const Header=()=>{
	const navItems=[
		{link:"Home", path:"/",},
		{link:"Store", path:"/Store",},
		{link:"News", path:"/News"},
		{link:"About", path:"/About"}
	]
	const navItems2=[
		{link:"Search", path:"/Search", icon: faMagnifyingGlass},
		{link:"Cart", path:"/Cart", icon: faShoppingCart},
		{link:"Sign in", path:"/Signin", icon: faSignInAlt}
	]
	return(
		<>
			<nav className="sticky top-0 left-0 z-50 w-full flex justify-between items-center px-6 py-2 bg-[#18181C]">
				<div className="flex items-center">
					<Link to="/" className="flex items-center">
						<img className="w-16 h-16" src={logo} alt="logo of game vortex" />
						<span className="font-bold text-2xl text-white">GameVortex</span>
					</Link>
				</div>
				<div className=" hidden lg:block">
					<ul>						
					<li>
						 { navItems.map(({link,path})=>( <NavLink className={({isActive}) => `hover:text-white hover:border-b-2 hover:border-white mx-7 text-lg text-[#ffffffc6] ${isActive ? 'border-b-[2px] text-white' : ''}`} to={path} > {link} </NavLink> )) }
					</li>		
					</ul>
				</div>
				<div>
					<ul className="hidden sm:block">
						<li>
						{
							navItems2.map(({link,path,icon})=><NavLink className=" hover:text-[white] hover:border-b-[2px] hover:border-[white] mx-4 text-md md:text-lg  text-[#ffffffc6]"  to={path}><FontAwesomeIcon className=" pr-3" icon={icon} />{link}</NavLink>)
						}
						</li>
					</ul>
					<FontAwesomeIcon className="sm:hidden block text-2xl text-white" icon={faBars} />
				</div>
			</nav>
		</>		
	)
}

export default Header
