# 🌳 JSON Tree Visualizer

An interactive **React-based JSON Visualizer** that converts any JSON object into a **visual tree diagram** using **React Flow**.  
It supports **real-time validation**, **JSONPath-based search**, **click-to-copy paths**, and a polished **Tailwind CSS** UI.

---

## ✨ Features

- 🧠 **Real-time JSON validation**
  - Instantly detects invalid JSON.

- 🌲 **Generate JSON tree**
  - Converts objects and arrays into a hierarchical visual tree.
  - Built using React Flow for zoom, pan, and drag support.

- 🔍 **Search by JSONPath**
  - Locate nodes using queries like:
    - `$.user.address.city`
    - `$.items[0].name`
  - Automatically highlights and pans to the matched node.

- 📋 **Click to copy path**
  - Click any node to copy its full JSON path (e.g., `$.user.address.city`).
  - Displays a small “Copied” notification.

- 🔄 **Reset**
  - One-click reset clears both input and visualization.

---

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| **Framework** | React19 (Vite) |
| **Visualization** | React Flow |
| **Styling** | Tailwind CSS | Styled Components
