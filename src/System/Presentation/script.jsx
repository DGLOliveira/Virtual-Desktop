import { useState } from "react";
import "./style.css";
export default function Presentation() {
  const [close, setClose] = useState(false);
  return <portfolio-presentation
  style={close ? { display: "none" } : {}}
  >
    <nav>
      <div
        onClick={() => { document.getElementById("presentationIntro").scrollIntoView({ behavior: "smooth" }) }}
      >Home
      </div>
      <div
        onClick={() => { document.getElementById("presentationAbout").scrollIntoView({ behavior: "smooth" }) }}
      >About me
      </div>
      <div
        onClick={() => { document.getElementById("presentationProjects").scrollIntoView({ behavior: "smooth" }) }}
      >Projects
      </div>
      <div
        onClick={() => { document.getElementById("presentationContact").scrollIntoView({ behavior: "smooth" }) }}
      >Get in touch
      </div>
      <div
      style={{color: "orangered"}}
        onClick={() => setClose(true)}
      >Close
      </div>
    </nav>
    <div id="presentationIntro">
      Hello
      <br />
      <br />
      My name is Davide
      <br />
      I am a Web Developer
      <br />
      <div
        style={{ fontSize: "2.5vh", fontWeight: "normal" }}
      >
        {"(short intro)"}
      </div>
    </div>
    <div id="presentationAbout">
      Tech Stack and Tech Skills
      <br />
      {"(further info about me)"}
    </div>
    <div id="presentationProjects">
      <h1
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "5vh",
          fontWeight: "bold",
        }}
      >
        Featured Projects
      </h1>
      Project 1
    </div>
    <div>
      Project 2
    </div>
    <div>
      Project 3
    </div>
    <div id="presentationContact">
      Get in touch
    </div>
  </portfolio-presentation>
}