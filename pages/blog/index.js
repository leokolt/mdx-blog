import React, { useState, useEffect } from "react"
import Link from 'next/link'
import { getPostsMetaData } from '@/utils/getPostsData.js';

export default function Home({ posts }) {
	const numberPosts = 2

	// State for the list
	const [list, setList] = useState([...posts.slice(0, numberPosts)])

	// State to trigger oad more
	const [loadMore, setLoadMore] = useState(false)

	// State of whether there is more to load
	const [hasMore, setHasMore] = useState(posts.length > numberPosts)

	// Load more button click
	const handleLoadMore = () => {
		setLoadMore(true)
	}

	// Handle loading more articles
	useEffect(() => {
		if (loadMore && hasMore) {
		const currentLength = list.length
		const isMore = currentLength < posts.length
		const nextResults = isMore
			? posts.slice(currentLength, currentLength + numberPosts)
			: []
		setList([...list, ...nextResults])
		setLoadMore(false)
		}
	}, [loadMore, hasMore]) //eslint-disable-line

	//Check if there is more
	useEffect(() => {
		const isMore = list.length < posts.length
		setHasMore(isMore)
	}, [list]) //eslint-disable-line

  return (
		<div className="w-full">
			{list.map((metadata) => {
				return (
					<div key = {metadata.slug}>
						<Link href={`/blog/${metadata.slug}`} key = {metadata.title} >
							{metadata.title}
						</Link>
						<p className = 'post-description'>{metadata.description}</p>
					</div>
				)
			})}

			{hasMore ? (
				<div><button onClick={handleLoadMore}>Еще статьи</button></div>
				) : (
				<div><button disabled>Больше нет статей</button></div>
			)}
		</div>
	)
}

export async function getStaticProps() {
  const posts = getPostsMetaData();
  return {
    props: {
		posts: posts,
    }
  }
}
