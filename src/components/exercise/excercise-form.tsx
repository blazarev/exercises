import React, { useState } from 'react';
import { Fragment } from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components'

import { useAppDispatch } from '../../redux/hooks';
import { exerciseType, add, STREAM_TYPES, ACTIVITY_TYPES } from '../../redux/features/training';


//----////----////----////----////----//
const Form = styled.form`
    display: flex;
`
const Table = styled.table`
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;    
    text-align: center;
`;
const Head = styled.th`
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    background-color: #04AA6D;
    color: white;
`;
const Row = styled.tr``;
const Cell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;
//----////----////----////----////----//
const HOUR_IN_MILLISECONDS = 3600000;

type propTypes = {
    data: exerciseType[]
}
function ExcerciseForm(props: propTypes) {
    const { data } = props;
    const [stream, setStream] = useState('BASE');
    const [duration, setDuration] = useState(1);
    const [activity, setActivity] = useState('PRACTICE');

    const dispatch = useAppDispatch();


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        const execrice = {
            id: uniqueId(),
            date: (new Date).getTime(),
            stream: stream,
            duration: duration*HOUR_IN_MILLISECONDS, // convert to hours
            activity: activity
        }
        //todo@lbp: add final validation 

        dispatch(add(execrice));
    }

    const handleStreamChange = (e: React.FormEvent<HTMLSelectElement>): void => {
        const { value } = e.currentTarget;
        //todo@lbp: add field validation 
        setStream(value)
    }

    const handleActivityChange = (e: React.FormEvent<HTMLSelectElement>): void => {
        const { value } = e.currentTarget;
        //todo@lbp: add field validation 
        setActivity(value);
    }

    const handleDurationChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const value = parseInt(e.currentTarget.value, 10)
        //todo@lbp: add field validation 
        setDuration(value)
    }

    const renderExerciseInfo = (exercise: exerciseType): JSX.Element => {
        const { id, stream, activity, duration } = exercise;
        
        return (
            <Row key={ id } >
                <Cell>{ activity } </Cell>
                <Cell>{ stream }</Cell> 
                <Cell>{ duration/HOUR_IN_MILLISECONDS }</Cell>
            </Row>
        );
    }

    return (
        <Fragment>
            <div>
                <h2>Road so far</h2>
                <Table>
                    <thead>
                        <Row>
                            <Head>type</Head>
                            <Head>stream</Head>
                            <Head>duration</Head>
                        </Row>
                    </thead>
                    <tbody>
                        { data.map(renderExerciseInfo) }
                    </tbody>
                </Table>
            </div>
            <div>
                <h2>Add new Exercise</h2>
                <Form onSubmit={ handleSubmit }>
                    {/* <input type="text" id='stream' value={ stream } onChange={ handleStreamChange }/> */}

                    <select name="stream" id="stream" onChange={ handleActivityChange } >
                        <option value={ ACTIVITY_TYPES.PRACTICE }>{ ACTIVITY_TYPES.PRACTICE }</option>
                        <option value={ ACTIVITY_TYPES.THEORY }>{ ACTIVITY_TYPES.THEORY }</option>
                    </select>
                    <br />

                    <select name="stream" id="stream" onChange={ handleStreamChange } >
                        <option value={ STREAM_TYPES.BASE }>{ STREAM_TYPES.BASE }</option>
                        <option value={ STREAM_TYPES.FRAMEWORK }>{ STREAM_TYPES.FRAMEWORK }</option>
                        <option value={ STREAM_TYPES.ALGORITHMS }>{ STREAM_TYPES.ALGORITHMS }</option>
                        <option value={ STREAM_TYPES.ARCHITECTURE }>{ STREAM_TYPES.ARCHITECTURE }</option>
                    </select>
                    <br />

                    <input type="text" id='duration' value={ duration } onChange={ handleDurationChange }/>

                    <button type='submit'>add</button>
                </Form>
            </div>
        </Fragment>
  )
}

export default ExcerciseForm