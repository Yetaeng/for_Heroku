import React, { useState, useRef, useCallback } from 'react'
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  // todos 배열은 TodoListdp props로 전달됨
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  // 고윳값으로 사용될 id(새로운 객체를 만들 때마다 새로운 id 부여됨)
  // ref를 사용하여 변수 담기(id 값은 렌더링되는 정보가 아니고, 단순 참조용이므로)
  const nextId = useRef(4);

  // 컴포넌트 성능을 아낄 수 있도록 useCallback으로 감싼다.
  // props로 전달해야 할 함수를 만들 때는 useCallback을 사용해서 함수를 감싸도록 하자!
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  // id를 파라미터로 받아 와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수 
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo => 
          // map함수를 이용해 수정이 필요한 곳은 true일때 반환되는 곳에, 필요가 없는 부분은 false일때 반환되는 곳에 씀
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
          ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;
