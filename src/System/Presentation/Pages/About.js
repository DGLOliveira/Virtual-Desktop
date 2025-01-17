import HTML from "./../Assets/HTML5.svg";
import CSS from "./../Assets/CSS3.svg";
import JS from "./../Assets/JS.svg";
import CHash from "./../Assets/CHash.svg";
import React from "./../Assets/React.svg";
import VSCode from "./../Assets/VSCode.svg";
import GitHub from "./../Assets/GitHub.svg";
//import Figma from "./../Assets/Figma.svg";
import ThreeJS from "./../Assets/ThreeJS.svg";
import Unity from "./../Assets/Unity.svg";
import Blender from "./../Assets/Blender.svg";

export default function About() {
    const languages = [
        ["HTML", HTML, "Html5"],
        ["CSS", CSS, "Css3"],
        ["JS", JS, "Javascript"],
        ["C#", CHash, "C#"]
    ];
    const frameworks = [
        ["React", React, "React"],
        ["ThreeJS", ThreeJS, "Three.js"]
    ];
    const tools = [
        ["VSCode", VSCode, "VS Code"],
        ["GitHub", GitHub, "GitHub"],
        ["Unity", Unity, "Unity"],
        ["Blender", Blender, "Blender"]
    ];



    return (
        <div id="presentationAbout">
            Tech Stack and Tech Skills
            <br />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {languages.map((language) => (
                    <div className="presentationSkillCard">
                        <img key={language[0]} src={language[1]} />
                        <p>{language[2]}</p>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {frameworks.map((framework) => (
                    <div className="presentationSkillCard">
                        <img key={framework[0]} src={framework[1]} />
                        <p>{framework[2]}</p>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {tools.map((tool) => (
                    <div className="presentationSkillCard">
                        <img key={tool[0]} src={tool[1]} />
                        <p>{tool[2]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}