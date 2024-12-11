// components/BlogList.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutEl from '../LayoutEl';

const BlogListEl = () => {
  const blogs = useSelector((state) => state.blogs.blogs);

  return (
   <LayoutEl>
     <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-6">Blog List</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(blogs).map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <Link
                to={blog.route}
                className="text-blue-500 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
   </LayoutEl>
  );
};

export default BlogListEl;
