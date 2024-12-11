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
        },
        aditya: {
          title: "Aditya",
          content: `
            <h1 style="color: #FF5733;">Aditya is a Great Scientist</h1>
            <img src="https://via.placeholder.com/600x400" alt="Aditya" style="width:100%; height:auto;"/>
            <p>Aditya is a visionary scientist known for his contributions to space research.</p>
            <h3>Key Achievements:</h3>
            <ul>
              <li>Space Exploration Missions</li>
              <li>Physics Advancements in Theoretical Space Systems</li>
              <li>AI Research in Aerospace Technologies</li>
            </ul>
            <h3>Scientific Milestones:</h3>
            <table border="1" style="width:100%; border-collapse: collapse;">
              <tr style="background-color:#FF5733; color:white;">
                <th>Field</th>
                <th>Contribution</th>
                <th>Impact Year</th>
              </tr>
              <tr>
                <td>Space Exploration</td>
                <td>Moon Landing</td>
                <td>1969</td>
              </tr>
              <tr>
                <td>Physics Advancements</td>
                <td>Quantum Mechanics Research</td>
                <td>1900</td>
              </tr>
              <tr>
                <td>AI Research</td>
                <td>Artificial Intelligence in Aerospace</td>
                <td>2020</td>
              </tr>
            </table>
          `,
          route: "/aditya", // Correctly add the route for this page
        },
        raj: {
          title: "raj",
          content: "raj is a Great Scientist",
          route: "/raj",
        },
        puk: {
          title: "puk",
          content: "rpuk is a Great Scientist",
          route: "/puk",
        },
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
