import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { logo } from '../assets';
import { links } from '../assets/constants';
const NavLinks = ({ handleClick }) => (
	<div className='mt-10'>
		{links.map((link) => (
			<NavLink
				key={link.name}
				to={link.to}
				onClick={() => {
					handleClick && handleClick();
				}}
				className='flex flex-row  justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors'>
				<link.icon className='w-6 h-6 mr-2' />
				{link.name}
			</NavLink>
		))}
	</div>
);
const Sidebar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<>
			<aside className='flex flex-col min-w-[240px] py-10 px-4 bg-[#191624]  hidden lg:block'>
				<img
					src={logo}
					alt='Logo'
					className='w-full h-14 object-contain'
				/>
				<NavLinks />
			</aside>
			<div className='absolute md:hidden block top-6 right-3 cursor-pointer'>
				{mobileMenuOpen ? (
					<RiCloseLine
						className='w-6 h-6 text-white mr-2'
						onClick={() => setMobileMenuOpen(false)}
					/>
				) : (
					<HiOutlineMenu
						className='w-6 h-6 text-white mr-2'
						onClick={() => setMobileMenuOpen(true)}
					/>
				)}
			</div>
			<aside
				className={`z-10 md:hidden absolute top-0 ${
					mobileMenuOpen ? 'left-0' : '-left-full'
				} h-screen w-2/3 p-6 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg smooth-transition`}>
				<img
					src={logo}
					alt='Logo'
					className='w-full h-14 object-contain'
				/>
				<NavLinks
					handleClick={() => {
						setMobileMenu(false);
					}}
				/>
			</aside>
		</>
	);
};

export default Sidebar;
