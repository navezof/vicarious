import { useEffect, useState, useCallback } from "react";
import { type InputState } from "../../engine/systems/InputState";

export const useGameInput = () => {
  const [inputState, setInputState] = useState<InputState>({
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    setInputState((prev) => {
      const newState = { ...prev };
      switch (key) {
        case 'z':
        case 'w':
          newState.up = true;
          break;
        case 's':
          newState.down = true;
          break;
        case 'q':
        case 'a':
          newState.left = true;
          break;
        case 'd':
          newState.right = true;
          break;
        case ' ':
          newState.space = true;
          break;
      }
      return newState;
    });
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    setInputState((prev) => {
      const newState = { ...prev };
      switch (key) {
        case 'z':
        case 'w':
          newState.up = false;
          break;
        case 's':
          newState.down = false;
          break;
        case 'q':
        case 'a':
          newState.left = false;
          break;
        case 'd':
          newState.right = false;
          break;
        case ' ':
          newState.space = false;
          break;
      }
      return newState;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return inputState;
};