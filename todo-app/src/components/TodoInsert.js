import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md'; // { 아이콘 이름 }
import './TodoInsert.scss'

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    // props로 받아온 onInsert 함수에 현재의 value 값을 파라미터로 넣어서 호출하고, 현재 value 값을 초기화함
    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue('');

            // submit 이벤트는 브라우저에서 새로고침을 발생시키므로, 이를 방지하기 위해 호출하는 것
            e.preventDefault();
        },
        [onInsert, value],
    );
    // onSubmit 대신에 onClick 이벤트로도 처리할 수 있지만, onSubmit은 인풋에서 enter를 눌렀을 때도 발생한다.
    // 하지만 onClick은 인풋에서 onKeyPress 이벤트를 통해 enter를 감지하는 로직을 따로 작성해야한다.

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
                placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;