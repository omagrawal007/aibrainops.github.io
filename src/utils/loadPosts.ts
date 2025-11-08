// Import all markdown files from the content/posts directory
const postModules = import.meta.glob('@/content/posts/*.md', { eager: true });

export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  image?: string;
  tags?: string[];
  content?: string;
}

export function getSortedPostsData(): PostMetadata[] {
  const allPostsData = Object.entries(postModules).map(([filePath, module]: [string, any]) => {
    // Extract slug from file path
    const slug = filePath
      .split('/')
      .pop()
      ?.replace(/\.md$/, '') || '';

    // Get frontmatter and content from the module
    const { frontmatter, content } = module;

    return {
      slug,
      ...frontmatter,
      content,
      date: frontmatter.date.toString(),
    } as PostMetadata;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPostData(slug: string): PostMetadata {
  const filePath = Object.keys(postModules).find(path => 
    path.endsWith(`${slug}.md`)
  );

  if (!filePath) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const { frontmatter, content } = (postModules[filePath] as any);

  return {
    slug,
    ...frontmatter,
    content,
    date: frontmatter.date.toString(),
  } as PostMetadata;
}
