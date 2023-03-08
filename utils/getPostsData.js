import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), 'posts');
const mdx_file_extention = '.mdx';

function getAllFilesInDirectory() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return path.parse(fileName)
  })
}

function getMdxFiles() {
  const allFiles = getAllFilesInDirectory();
  return allFiles.filter(parsedFile => parsedFile.ext == mdx_file_extention);
}

export function getAllPostsPath() {
  const allMdxFiles = getMdxFiles();
  return allMdxFiles.map((parsedFile) => {
    return {
      params: {
        slug: parsedFile.name
      }
    }
  })
}

export function getPostsMetaData() {
  const allMdxFiles = getMdxFiles();

  const postsMetaData = allMdxFiles.map((parsedFile) => {
    const fullPath = path.join(postsDirectory, parsedFile.base);

    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // get metadata, content
    const { data, content } = matter(fileContents);
    let metadata = data;
    metadata['slug'] = parsedFile.name;
    return metadata;
  });
  return postsMetaData;
}

export function getPostData(slug) {
  const fullPath = path.join(postsDirectory, slug + mdx_file_extention);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // get metadata, content
  const { data, content } = matter(fileContents);

  let metadata = data;
  metadata['slug'] = slug;

  return {'metadata': metadata, 'content': content};
}
