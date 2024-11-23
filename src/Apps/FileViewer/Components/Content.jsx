import { useContext } from "react";
import { Context } from "../context.jsx";
import { AppIcon } from "../../../System/AppManager/Components/AppIcon.jsx";
import { FcFolder } from "react-icons/fc";
export default function Content() {
    const context = useContext(Context);
    let file = context.file;
    let find = context.find;
    let findResult = context.findResult;
    return(
        <div className="FileViewerContent">
            {find === "" ?
             Object.keys(file).map((name) => (
                <div 
                key={name}
                onDoubleClick={() => context.open(name)}
                title={name}
                aria-label={name}
                >
                    {file[name].type === "Folder" ?
                        <FcFolder /> :
                        <AppIcon appName={name} />
                    }
                    <span>{name}</span>
                </div>
            ))
            :
            <ul>
            
            </ul>
        }
        </div>
    )
}