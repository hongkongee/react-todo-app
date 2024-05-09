import React from 'react';
import '../scss/TodoItem.scss';
import { MdDelete, MdDone } from 'react-icons/md';

const TodoItem = ({ item, remove }) => {
  return (
    <li className="todo-list-item">
      <div className="check-circle">
        <MdDone />
      </div>
      <span className="text">{item.title}</span>
      <div
        className="remove"
        onClick={() => {
          remove(item.id);
        }}
      >
        <MdDelete />
      </div>
    </li>
  );
};

export default TodoItem;
