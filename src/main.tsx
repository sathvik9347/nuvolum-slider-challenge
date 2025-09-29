// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App";

import "./styles/global.scss";
import "./styles/utilities.scss";  // the helper file created

createRoot(document.getElementById("root")!).render(<App />);
