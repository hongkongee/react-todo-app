import React from 'react';
import '../scss/TodoItem.scss';
import { MdDelete, MdDone } from 'react-icons/md';

const TodoItem = ({ item }) => {
  return (
    <li className="todo-list-item">
      <div className="check-circle">
        <MdDone />
      </div>
      <span className="text">{item.title}</span>
      <div className="remove">
        <MdDelete />
      </div>
    </li>
  );
};

export default TodoItem;
