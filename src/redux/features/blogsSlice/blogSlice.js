// // features/blogSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const blogSlice = createSlice({
//   name: "blogs",
//   initialState: {
//     blogs: {}, // Object to store blogs with keys as blog IDs
//   },
//   reducers: {
//     addBlog: (state, action) => {
//       const { blogKey, title, content, route } = action.payload;
//       state.blogs[blogKey] = { title, content, route };
//     },
//   },
// });

// export const { addBlog } = blogSlice.actions;
// export default blogSlice.reducer;


// features/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: {
      "exploring-space": {
        title: "Exploring Space",
        content: `
          <h1 style="color: #FF5733;">Exploring Space</h1>
          <img src="https://via.placeholder.com/600x400" alt="Space Exploration" style="width:100%; height:auto;"/>
          <p>Space exploration is a fascinating journey that uncovers the mysteries of our universe.</p>
          <h3>Key Topics:</h3>
          <ul>
            <li>Moon Landings</li>
            <li>Martian Expeditions</li>
            <li>Deep Space Probes</li>
          </ul>
        `,
        route: "/blog/exploring-space",
      },
      "quantum-physics": {
        title: "Quantum Physics Simplified",
        content: `
          <h1 style="color: #1E90FF;">Quantum Physics Simplified</h1>
          <img src="https://via.placeholder.com/600x400" alt="Quantum Physics" style="width:100%; height:auto;"/>
          <p>An introduction to the mind-bending concepts of quantum mechanics.</p>
          <h3>Topics Covered:</h3>
          <ul>
            <li>Wave-Particle Duality</li>
            <li>Schrödinger's Cat</li>
            <li>Quantum Entanglement</li>
          </ul>
        `,
        route: "/blog/quantum-physics",
      },
      "ai-advancements": {
        title: "AI Advancements in 2024",
        content: `
          <h1 style="color: #32CD32;">AI Advancements in 2024</h1>
          <img src="https://via.placeholder.com/600x400" alt="AI Technology" style="width:100%; height:auto;"/>
          <p>Artificial Intelligence continues to transform industries and redefine possibilities.</p>
          <h3>Major Breakthroughs:</h3>
          <ul>
            <li>AI in Healthcare</li>
            <li>Autonomous Vehicles</li>
            <li>Generative AI Tools</li>
          </ul>
        `,
        route: "/blog/ai-advancements",
      },
    },
  },
  reducers: {
    addBlog: (state, action) => {
      const { blogKey, title, content, route } = action.payload;
      state.blogs[blogKey] = { title, content, route };
    },
  },
});

export const { addBlog } = blogSlice.actions;
export default blogSlice.reducer;

