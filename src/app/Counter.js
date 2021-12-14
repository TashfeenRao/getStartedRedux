import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementByAmount, reset} from "./store/counterReduxer";

function Counter() {
    const dispatch = useDispatch()
    const count = useSelector(state => state.counter.count)

    return (
        <div className="container">
            <h2>{count}</h2>
            <div className="button__box">
                <button onClick={() => dispatch(reset())}>reset</button>
                <button onClick={() => dispatch(decrement())}>-</button>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(incrementByAmount(33))}>increase by 33</button>
            </div>
        </div>
    );
}

export default Counter;