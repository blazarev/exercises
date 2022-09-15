import React, { useState } from 'react';
import { Fragment } from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components'

import { useAppDispatch } from '../../redux/hooks';

import { SLICE_ACTIONS, SLICE_CONSTANTS } from '../../redux/features/exercises';
import { streamTypes, activityTypes, exerciseType } from '../../redux/features/exercises'

const Form = styled.form`
    display: flex;
    margin-bottom: 100px;
    `;
const Table = styled.table`
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;    
    text-align: center;`;

const Head = styled.th`
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    background-color: #04AA6D;
    color: white;`;
const Row = styled.tr``;
const Cell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const HOUR_IN_MILLISECONDS = 3600000;


const ACTIVITIES = Object.keys(SLICE_CONSTANTS.ACTIVITIES);
const STREAMS = Object.keys(SLICE_CONSTANTS.STREAMS);

type propTypes = { data: exerciseType[] };
function ExcerciseForm(props: propTypes) {
    const { data } = props;

    const [stream, setStream] = useState<streamTypes>(SLICE_CONSTANTS.STREAMS.BASE as streamTypes);
    const [activity, setActivity] = useState<activityTypes>(SLICE_CONSTANTS.ACTIVITIES.PRACTICE as activityTypes);
    const [duration, setDuration] = useState(1);

    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        const execrice = {
            id: +uniqueId(),
            date: (new Date()).getTime(),
            stream: stream,
            duration: duration*HOUR_IN_MILLISECONDS, // convert to hours
            activity: activity
        }

        dispatch(SLICE_ACTIONS.saveExercise(execrice));
    }

    const handleStreamChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value }  = e.currentTarget;
        //todo@lbp: add field validation and err msg while typing

        setStream(value as streamTypes)
    }

    const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.currentTarget;
        //todo@lbp: add field validation and err msg while typing
        setActivity(value as activityTypes);
    }

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.currentTarget.value, 10)
        //todo@lbp: add field validation and err msg while typing
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
                    <select name="activity" id="activity" onChange={ handleActivityChange } >
                        { ACTIVITIES.map(activity => <option key={ activity } value={ activity }>{ activity }</option>) }
                    </select>
                    <br />

                    <select name="stream" id="stream" onChange={ handleStreamChange } >
                        { STREAMS.map(stream => <option key= { stream } value={ stream }>{ stream }</option>) }
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