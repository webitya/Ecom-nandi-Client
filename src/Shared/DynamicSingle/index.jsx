import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import LayoutEl from "../LayoutEl";

const DynamicSinglePage = () => {
    const location = useLocation();
    const pages = useSelector((state) => state.pages.pages || {});

    console.log(pages);

    const page = Object.values(pages).find((p) => p.route === location.pathname);

    console.log(page);
    

    useEffect(() => {
        if (page) {
            document.title = page.title; // Update the document title dynamically
        } else {
            document.title = "Page Not Found";
        }

        return () => {
            document.title = "Ecom-nandi";
        };
    }, [page]);

    if (!page) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            </div>
        );
    }

    const sanitizedContent = DOMPurify.sanitize(page.content);

    return (
        <LayoutEl>
            <div className="dynamic-page p-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            <div
                className="dynamic-content text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
        </div>
        </LayoutEl>
    );
};

export default DynamicSinglePage;
