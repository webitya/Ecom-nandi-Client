import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../redux/features/blogsSlice/blogSlice.js";
import { Button, Input, Card, message } from "antd";

const BlogManager = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs || {}); // Access blogs from the Redux store

  const editorRef = useRef(null); // Ref for Jodit Editor
  const [title, setTitle] = useState("");
  const [route, setRoute] = useState("");

  const handlePublish = () => {
    const trimmedTitle = title.trim();
    const trimmedRoute = route.trim();
    const editorContent = editorRef.current?.value || "";
    const trimmedContent = editorContent.trim();

    if (!trimmedTitle || !trimmedRoute || !trimmedContent || trimmedContent === "<p><br></p>") {
      message.error("Please fill in all fields.");
      return;
    }

    const routeExists = Object.values(blogs).some((blog) => blog.route === trimmedRoute);
    if (routeExists) {
      message.error("Route already exists. Please choose a different route.");
      return;
    }

    const blogKey = trimmedTitle.toLowerCase().replace(/\s+/g, "-");
    dispatch(
      addBlog({
        blogKey,
        title: trimmedTitle,
        content: trimmedContent,
        route: trimmedRoute,
      })
    );
    message.success("Blog created successfully!");

    setTitle("");
    setRoute("");
    if (editorRef.current) {
      editorRef.current.value = ""; // Reset editor content
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card title="Create a New Blog" className="shadow-md">
        <div className="mb-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Blog Title"
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <Input
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            placeholder="Enter Blog Route (e.g., /blog/space-exploration)"
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <JoditEditor
            ref={editorRef}
            config={{
              readonly: false,
              toolbarAdaptive: true,
              minHeight: 300,
              buttons: [
                "bold",
                "italic",
                "underline",
                "image",
                "link",
                "ul",
                "ol",
                "align",
                "undo",
                "redo",
              ],
              placeholder: "Start typing your blog content here...",
            }}
          />
        </div>
        <Button type="primary" onClick={handlePublish}>
          Publish
        </Button>
      </Card>
    </div>
  );
};

export default BlogManager;
