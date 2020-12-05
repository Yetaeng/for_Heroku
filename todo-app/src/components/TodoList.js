import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                // map을 사용하여 컴포넌트로 변환할 때는 key props를 전달해주어야함!
                <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
                // TodoListItem에서 onRemove 함수를 사용하려면 우선 TodoList 컴포넌트를 거쳐야한다.
            ))}
        </div>
    );
};

export default TodoList;