import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getAllPostsPath, getPostData } from '@/utils/getPostsData.js';
import Button from '@/components/button';
//import Link from 'next/link'

const components = {
  Button
}

export default function Blog({ postContent }) {

    return (
        <>
        <Head>
            <title>Next.js | Tech Radar</title>
        </Head>
        <div>
            <div className = 'blog-content'>
                <MDXRemote {...postContent} components = {components} />
            </div>
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
