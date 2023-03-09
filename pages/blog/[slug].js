import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getAllPostsPath, getPostData } from '@/utils/getPostsData.js';
import Button from '@/components/button';
import SharePost from '@/components/share-post';
//import Link from 'next/link'

const components = {
  Button
}

export default function Blog({ postContent, postMetadata }) {

    return (
        <>
        <Head>
            <title>Next.js | Tech Radar</title>
            <meta
                property="og:image"
                content={`https://mdx-blog-zeta.vercel.app/api/og?title=${postMetadata.title}&description=${postMetadata.description}`}
            />
        </Head>
        <div>
            <div className = 'blog-content'>
                <h1>{postMetadata.title}</h1>
                <p>{postMetadata.description}</p>
                <MDXRemote {...postContent} components = {components} />
            </div>
            <SharePost/>
        </div>
        </>

    )
}

export async function getStaticPaths() {
    const paths = getAllPostsPath();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.slug);
    const mdxSource = await serialize(postData.content);
    return {
        props: {
            postMetadata: postData.metadata,
            postContent: mdxSource,
            slug: params.slug,
        }
    }

}
