/* 
This is a component that is triggered when the user right clicks on a valid component. 
This is meant to replace the default context menu with a custom one in line with the design and possible functions.

-It receives the mouse event in order to set the position of the context menu
-It receives the content of the context menu as a json object in order to be displayed
-It receives the setAction function from the event target in order to trigger the associated action,
 by setting a string with the apropiate name, wich will then be handled by the target component by means
 of a handleAction function, usually set in the handlers folder, including the closing of the context menu.

*/

import { useState, useRef, useEffect, useContext } from 'react';
import { ContextMenuContext } from './context.jsx';
import "./styles.css";
//import { createPortal } from 'react-dom';

export function ContextMenu() {
    const context = useContext(ContextMenuContext);
    const contextFocusRef = useRef(null);
    const [style, setStyle] = useState({
        top: 0,
        left: 0
    });
    useEffect(() => {
        if(window.innerHeight > context.position.y + 200 && window.innerWidth > context.position.x + 200) {
            setStyle({
                top: context.position.y,
                left: context.position.x
            });
        }else if(window.innerHeight > context.position.y + 200 && window.innerWidth < context.position.x + 200) {
            setStyle({
                top: context.position.y,
                right: window.innerWidth - context.position.x
            })
        }else if(window.innerHeight < context.position.y + 200 && window.innerWidth > context.position.x + 200) {
            setStyle({
                bottom: window.innerHeight - context.position.y,
                left: context.position.x
            })
        }else if(window.innerHeight < context.position.y + 200 && window.innerWidth < context.position.x + 200) {
            setStyle({
                bottom: window.innerHeight - context.position.y,
                right: window.innerWidth - context.position.x
            })
        }
    }, [context.position, context.orientation]);
    useEffect(() => {
        if (context.isOpen) {
            contextFocusRef.current.focus();
        }
    }, [context.isOpen]);
    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            context.setClose();
        }
    };

    if (context.isOpen) {
        return (
            <context-menu
                tabindex="0"
                ref={contextFocusRef}
                style={style}
                onBlur={(e) => handleBlur(e)}
                onClick={() => { context.setClose() }}
                onContextMenu={(e) => {e.preventDefault(); context.setClose();}}
            >
                {Object.keys(context.content).map((name, index) => (
                    name.slice(0, 9) !== "LineBreak" ? 
                        <button
                            key={index}
                            onClick={context.content[name].action}
                            disabled={context.content[name].disabled}
                        >
                            <div>{name}</div>
                            <span />
                            {context.content[name].checkbox !== undefined ?
                                <input type="checkbox" checked={context.content[name].checkbox} readOnly /> : null}
                            {context.content[name].keybind !== undefined ?
                                <kbd>{context.content[name].keybind}</kbd> : null}
                            {context.content[name].radio !== undefined ?
                                <input type="radio" name={name} checked={context.content[name].radio} readOnly /> : null}
                        </button>
                        : <hr key={index} />

                ))}
            </context-menu>
        )
    }
    else {
        return null
    }
}