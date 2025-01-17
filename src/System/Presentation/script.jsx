import { useState, useEffect } from "react";
import Intro from "./Pages/Intro.js";
import About from "./Pages/About.js";
import Projects from "./Pages/Projects.js";
import Contacts from "./Pages/Contacts.js";
import "./style.css";

export default function Presentation() {
  const [close, setClose] = useState(false);
  const [scrollView, setScrollView] = useState("intro");
  const [scrollTargets, setScrollTargets] = useState([]);

  useEffect(() => {
    setScrollTargets([
      ["intro", document.getElementById("presentationIntro").getBoundingClientRect()],
      ["about", document.getElementById("presentationAbout").getBoundingClientRect()],
      ["projects", document.getElementById("presentationProject1").getBoundingClientRect()],
      ["contact", document.getElementById("presentationContact").getBoundingClientRect()],
    ]);
  }, []);

  const scrollHandler = (y) => {
    console.log(y, scrollTargets);
    for (let i = 0; i < scrollTargets.length; i++) {
      if (y + document.getElementById("presentationNav").offsetHeight+1 >= scrollTargets[i][1].y) {
        setScrollView(scrollTargets[i][0]);
      }
    }
  };

  return <portfolio-presentation
    style={close ? { display: "none" } : {}}
    onScroll={(e) => { scrollHandler(e.target.scrollTop); }}
  >
    <nav id="presentationNav">
      <div
        style={scrollView === "intro" ? { color: "deepskyblue", fontWeight: "bold" } : {}}
        onClick={() => { document.getElementById("presentationIntro").scrollIntoView({ behavior: "smooth" }) }}
      >Home
      </div>
      <div
        style={scrollView === "about" ? { color: "deepskyblue", fontWeight: "bold" } : {}}
        onClick={() => { document.getElementById("presentationAbout").scrollIntoView({ behavior: "smooth" }) }}
      >About me
      </div>
      <div
        style={scrollView === "projects" ? { color: "deepskyblue", fontWeight: "bold" } : {}}
        onClick={() => { document.getElementById("presentationProject1").scrollIntoView({ behavior: "smooth" }) }}
      >Projects
      </div>
      <div
        style={scrollView === "contact" ? { color: "deepskyblue", fontWeight: "bold" } : {}}
        onClick={() => { document.getElementById("presentationContact").scrollIntoView({ behavior: "smooth" }) }}
      >Get in touch
      </div>
      <div
        style={{ color: "orangered" }}
        onClick={() => setClose(true)}
      >Close
      </div>
    </nav>
      <Intro />
      <About />
      <Projects />
      <Contacts />
  </portfolio-presentation>
}