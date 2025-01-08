import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../redux/features/PageSlice/PageSlice";
import { Button, Input, Card, message } from "antd";
import LayoutEl from "../LayoutEl";

const DynamicPages = () => {
    const dispatch = useDispatch();
    const pages = useSelector((state) => state.pages.pages || {});

    const editorRef = useRef(null);
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

        const routeExists = Object.values(pages).some((page) => page.route === trimmedRoute);
        if (routeExists) {
            message.error("Route already exists. Please choose a different route.");
            return;
        }

        const pageKey = trimmedTitle
            .toLowerCase()
            .split(/\s+/)
            .map((word, index) =>
                index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join("");

        console.log({
            pageKey,
            title: trimmedTitle,
            content: trimmedContent,
            route: trimmedRoute,
        });

        dispatch(
            addPage({
                pageKey,
                title: trimmedTitle,
                content: trimmedContent,
                route: trimmedRoute,
            })
        );
        message.success("Page created successfully!");

        setTitle("");
        setRoute("");
        if (editorRef.current) {
            editorRef.current.value = "";
        }
    };

    return (
        <LayoutEl>
            <div className="min-h-screen bg-gray-100 p-4">
                <Card title="Create a New Page" className="shadow-md">
                    <div className="mb-4">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Page Title"
                            maxLength={100}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            value={route}
                            onChange={(e) => setRoute(e.target.value)}
                            placeholder="Enter Page Route (e.g., /about-us)"
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
                                    "strikethrough",
                                    "superscript",
                                    "subscript",
                                    "font",
                                    "fontsize",
                                    "brush",
                                    "paragraph",
                                    "image",
                                    "video",
                                    "table",
                                    "link",
                                    "unlink",
                                    "ul",
                                    "ol",
                                    "align",
                                    "outdent",
                                    "indent",
                                    "eraser",
                                    "hr",
                                    "fullsize",
                                    "undo",
                                    "redo",
                                    "copyformat",
                                    "cut",
                                    "copy",
                                    "paste",
                                    "source",
                                ],
                                placeholder: "Start typing your content here...",
                            }}
                        />
                    </div>
                    <Button type="primary" onClick={handlePublish}>
                        Publish
                    </Button>
                </Card>
            </div>
        </LayoutEl>
    );
};

export default DynamicPages;
