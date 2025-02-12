import { useState, useEffect, useCallback } from "react";

export default function Controls(isSelected, keyboard) {

  var [command, setCommand] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    one: false,
    two: false,
    pause: false,
    eject: false,
  });
  const validateKey = useCallback(
    (key, state) => {
      const keyArray = Object.keys(keyboard);
      for (let i = 0; i < keyArray.length; i++) {
        let currKeyArray = keyboard[keyArray[i]].keys;
        for (let j = 0; j < currKeyArray.length; j++) {
          if (currKeyArray[j] === key) {
            setCommand((c) => ({ ...c, [keyArray[i]]: state }));
          }
        }
      }
    },
    [keyboard],
  );

  const handleKeyPress = useCallback(
    (event) => {
      validateKey(event.key, true);
    },
    [validateKey],
  );
  const handleKeyRelease = useCallback(
    (event) => {
      validateKey(event.key, false);
    },
    [validateKey],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyRelease);
    return () => {
      document.removeEventListener("keyup", handleKeyRelease);
    };
  }, [handleKeyRelease]);

  useEffect(() => {
    if (!isSelected) {
      setCommand({ ...command, pause: true });
    }
  }, [isSelected]);

  return command;
}
