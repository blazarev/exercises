import { Fragment } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { increment, decrement, reset } from '../../redux/features/counter-slice';

type propsTypes = {
    value: number
}
function Counter(props: propsTypes) {
    const { value } = props;
    const dispatch = useAppDispatch();

    function handleIncrementClick() { dispatch(increment()) }
    function handleDecrementClick() { dispatch(decrement()) }
    function handleResetClick() { dispatch(reset()) }

    return (
        <Fragment>
            <div>Counter value is: { value }</div>
            <button onClick={ handleIncrementClick } >increment</button>    
            <button onClick={ handleDecrementClick } >decrement</button>    
            <button onClick={ handleResetClick } >reset</button>   
        </Fragment>
    )
}

export default Counter