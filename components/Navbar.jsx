'use client';

import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};

		setUpProviders();
	}, []);

	return (
		<nav className='w-full pt-3 mb-16 flex-between'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					width={30}
					height={30}
					alt='Prompt Logo'
				/>
				<p className='logo_text'>PrompTop</p>
			</Link>

			{/* Desktop Navigation */}
			<div className='hidden sm:flex'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>

						<button
							type='button'
							onClick={signOut}
							className='outline_btn'
						>
							Sign Out
						</button>

						<Link href='/profile'>
							<Image
								src={session?.user.image}
								width={36}
								height={36}
								className='rounded-full'
								alt='profile'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className='relative flex sm:hidden'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user.image}
							width={36}
							height={36}
							className='rounded-full'
							alt='profile'
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>

						{toggleDropdown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									type='button'
									onClick={() => {
										setToggleDropdown(false);
										signOut;
									}}
									className='w-full mt-5 black_btn'
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
