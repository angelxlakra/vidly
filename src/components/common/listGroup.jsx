import React from "react";
const ListGroup = props => {
  const { items, onItemSelect, currentItem } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item._id}
          onClick={() => onItemSelect(item.name)}
          className={
            currentItem === item.name
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
