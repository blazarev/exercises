import { useState, useEffect } from 'react';

import ExcerciseForm from '../exercise/excercise-form';
import { SLICE_ACTIONS } from '../../redux/features/exercises';

import './App.css';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';

function App() {
    const [isDbConnected, setIsDbConnected] = useState(false)

    const dispatch = useAppDispatch();
    const exercises = useAppSelector((state) => state.exercise.data)

    useEffect(() => {
        dispatch(SLICE_ACTIONS.getAllExercises()).then(() => { setIsDbConnected(true) })
    }, [])

  return (
    <div className="App">
        <h3>connection status &nbsp; { isDbConnected ? 'success' : 'loading...' }</h3>
        { isDbConnected && <ExcerciseForm data={ exercises }/> }
    </div>
  );
}

export default App;
