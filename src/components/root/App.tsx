import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import ExcerciseTable from '../exercise-table/excercise-table';
import ExcerciseForm from '../exercise-from/exercise-form';
import { SLICE_ACTIONS as exerciseActions } from '../../redux/features/exercises';

import './App.css';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentBlock = styled.div`
    height: 100%;
`;
function App() {
    const [isDbConnected, setIsDbConnected] = useState(false);

    const dispatch = useAppDispatch();
    // const exercises = useAppSelector((state) => state.exercise.data);

    useEffect(() => {
        dispatch(exerciseActions.getAllExercises()).then(() => { setIsDbConnected(true) });
    }, []);

    const renderData = (): JSX.Element => {
        return (
            <>
                <h2>Road so far</h2>
                <ExcerciseTable />
            </>
        )
    }
  return (
    <Wrapper className="App">
        <ContentBlock>
            { !isDbConnected ? 'loading data...' : renderData() }
        </ContentBlock>
        <ContentBlock>
            <ExcerciseForm />
        </ContentBlock>
    </Wrapper>
  );
}

export default App;
