import { createRoot } from "react-dom/client";
import Boot from "./System/Boot/Boot.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Boot />
);
