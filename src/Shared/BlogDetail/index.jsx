// components/BlogDetail.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import LayoutEl from '../LayoutEl';

const BlogDetailEl = () => {
  const { slug } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);
  const blog = Object.values(blogs).find((b) => b.route === `/blog/${slug}`);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">404 - Blog Not Found</h1>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <LayoutEl>
         <div className="container mx-auto p-4">
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
    </LayoutEl>
  );
};

export default BlogDetailEl;
