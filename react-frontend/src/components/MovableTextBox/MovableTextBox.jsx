import React from "react";
import Moveable from "react-moveable";

/**
 * handles the moveable Text (not used anymore in main application)
 * Library react-moveable: https://www.npmjs.com/package/react-moveable
 * @param {} param0 
 * @returns 
 */

const MovableTextBox = ({ moveRef, setStyle }) => {
  const [renderMovable, setRenderMovable] = React.useState(false);

  React.useEffect(() => {
    setRenderMovable(true);
  }, []);

  /**
   * handle dragging of the textboxes
   * @param {} e 
   */
  const handleDrag = e => {
    setStyle(e.transform);
  };

  if (!renderMovable) return null;

  return (
    <Moveable
      target={moveRef.current}
      draggable={true}
      resizable={true}
      throttleDrag={1}
      onDrag={handleDrag}
    />
  );
};

export default MovableTextBox;
