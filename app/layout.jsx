import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';

export const metadata = {
	title: 'PrompTop',
	description: 'Discover & Share AI Prompts',
	icons: '/assets/images/logo.svg',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Provider>
					<div className='main'>
						<div className='gradient' />
					</div>

					<main className='app'>
						<Navbar />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}
