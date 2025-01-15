import "./style.css";
export default function Presentation() {
    return <portfolio-presentation>
    <div>
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
    <div>
      Tech Stack and Tech Skills
      <br />
      {"(further info about me)"}
    </div>
    <div>
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
    <div>
      Get in touch
    </div>
  </portfolio-presentation>
}