import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'


export function getSortedPostsData() {
    const files = fs.readdirSync(path.join('posts'))
    const posts = files.map(filename => {
      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
      const { data: frontMatter } = matter(markdownWithMeta)
      return {
        frontMatter,
        slug: filename.split('.')[0]
      }
    })
}



export function Bloglist ({ posts }) {
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
        <div className="mt-5">
        {posts.map((post, index) => (
          <Link href={'/blog/' + post.slug} passHref key={index}>
            <div className="card mb-3 pointer" style={{ maxWidth: '540px' }}>
              <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{post.frontMatter.title}</h5>
                    <p className="card-text">{post.frontMatter.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{post.frontMatter.date}</small>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 m-auto">
                  <Image
                    src={post.frontMatter.thumbnailUrl}
                    className="img-fluid mt-1 rounded-start"
                    alt="thumbnail"
                    width={500}
                    height={400}
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
        		{hasMore ? (
			<div><button onClick={handleLoadMore}>Еще статьи</button></div>
			) : (
			<div><button disabled>Больше нет статей</button></div>
		)}
      </div>
    )
  }
