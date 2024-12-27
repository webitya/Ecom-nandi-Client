import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pages: {
        aboutUs: {
          title: "About Us",
          content: "<p>About Us content here...</p>",
          route: "/about-us",
        },
        privacyPolicy: {
          title: "Privacy Policy",
          content: "<p>Privacy Policy content here...</p>",
          route: "/privacy-policy",
        },
        aboutUs1: {
          title: "About Us",
          content: "<p>About Us content here...</p>",
          route: "/about-us",
        },
        privacyPolicy1: {
          title: "Privacy Policy",
          content: "<p>Privacy Policy content here...</p>",
          route: "/privacy-policy",
        },
        aboutUs2: {
          title: "About Us",
          content: "<p>About Us content here...</p>",
          route: "/about-us",
        },
        privacyPolicy2: {
          title: "Privacy Policy",
          content: "<p>Privacy Policy content here...</p>",
          route: "/privacy-policy",
        }
      },
      
};

const pageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        setPageTitle: (state, action) => {
            const { pageKey, title } = action.payload;
            if (state.pages[pageKey]) {
                state.pages[pageKey].title = title;
            } else {
                state.pages[pageKey] = { title, content: "", route: `/${pageKey}` };
            }
        },
        setPageContent: (state, action) => {
            const { pageKey, content } = action.payload;
            if (state.pages[pageKey]) {
                state.pages[pageKey].content = content;
            } else {
                state.pages[pageKey] = { title: "Untitled Page", content, route: `/${pageKey}` };
            }
        },
        setPageRoute: (state, action) => {
            const { pageKey, route } = action.payload;
            if (state.pages[pageKey]) {
                state.pages[pageKey].route = route;
            } else {
                state.pages[pageKey] = { title: "Untitled Page", content: "", route };
            }
        },
        addPage: (state, action) => {
            const { pageKey, title = "Untitled Page", content = "", route = `/${pageKey}` } = action.payload;
            if (!state.pages[pageKey]) {
                state.pages[pageKey] = { title, content, route };
            }
        },
        removePage: (state, action) => {
            const { pageKey } = action.payload;
            delete state.pages[pageKey];
        },
        resetPages: (state) => {
            state.pages = { ...initialState.pages };
        },
    },
});

export const { setPageTitle, setPageContent, setPageRoute, addPage, removePage, resetPages } =
    pageSlice.actions;

export default pageSlice.reducer;
