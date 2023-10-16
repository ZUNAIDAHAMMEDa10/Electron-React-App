import React from "react";
import Items from "./Items";

export default function Box(props) {
  const items = props.data.slice(-8).map((singleData, index) => {
    return (
      <Items
        removeHandler={props.removeHandler}
        key={singleData.id}
        id={singleData.id}
        item={singleData.body}
        time={singleData.time}
      />
    );
  });

  return <div className="p-3">{items}</div>;
}
