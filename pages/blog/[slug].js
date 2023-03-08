import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getAllPostsPath, getPostData } from '@/utils/getPostsData.js';
import Button from '@/components/button';
//import Link from 'next/link'
import getOgImage from '@/utils/getOgImage';


const components = {
  Button
}

export default function Blog({ postContent, ogImage, postMetadata }) {

    return (
        <>
        <Head>
            <title>Next.js | Tech Radar</title>
            <meta name="og:image" content={ogImage} />
        </Head>
        <div>
            <div className = 'blog-content'>
                {postMetadata.title}
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

export async function getStaticProps({ params, slug, title }) {
    const postData = await getPostData(params.slug);
    const mdxSource = await serialize(postData.content);
    const ogImage = await getOgImage(
        `/phiilu.com?title=${title}&url=${process.env.BASE_URL}/${slug}`
      );
    return {
        props: {
            postMetadata: postData.metadata,
            postContent: mdxSource,
            slug: params.slug,
            ogImage
        }
    }

}
