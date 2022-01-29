import React from "react";
import Moveable from "react-moveable";

const Movable = ({ moveRef, setStyle }) => {
  const [renderMovable, setRenderMovable] = React.useState(false);

  React.useEffect(() => {
    setRenderMovable(true);
  }, []);

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

export default Movable;
