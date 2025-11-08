import React from "react";
import { useParams } from "react-router-dom";
import { useSEO } from "../components/useSEO";
import { getPostBySlug } from "../utils/posts";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug!);

  useSEO({
    title: post.title,
    description: post.excerpt,
    image: post.image || "https://blog.smsidea.in/images/og-blog.png",
    url: `https://blog.smsidea.in/${slug}`,
  });

  return (
    <article className="prose mx-auto">
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      {post.image && (
        <img src={post.image} alt={post.title} className="rounded-lg" />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}