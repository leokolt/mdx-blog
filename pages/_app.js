import Head from 'next/head'
import Nav from '@/components/nav'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<style jsx global>{`
				html {
					font-family: ${inter.style.fontFamily};
				}
			`}</style>
			<Head>
				<title>Next and MDX Blog</title>
			</Head>
			<div className="container">
				<Nav />
				<main>
					<Component {...pageProps} />
				</main>
			</div>
		</ThemeProvider>
	)
}
