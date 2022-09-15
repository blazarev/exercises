import React, { useState } from 'react';
// import { uniqueId } from 'lodash';
import styled from 'styled-components'

import { useAppDispatch } from '../../redux/hooks';

import { SLICE_ACTIONS, SLICE_CONSTANTS } from '../../redux/features/exercises';
import { streamTypes, activityTypes } from '../../redux/features/exercises'

const Form = styled.form`
    display: flex;
`;

const HOUR_IN_MILLISECONDS = 3600000;
const ACTIVITIES = Object.keys(SLICE_CONSTANTS.ACTIVITIES);
const STREAMS = Object.keys(SLICE_CONSTANTS.STREAMS);

const DEFAULT_ACTIVITY: activityTypes = SLICE_CONSTANTS.ACTIVITIES.PRACTICE as activityTypes;
const DEFAULT_STREAM: streamTypes = SLICE_CONSTANTS.STREAMS.BASE as streamTypes;

function ExcerciseForm() {
    const [stream, setStream] = useState<streamTypes>(DEFAULT_STREAM);
    const [activity, setActivity] = useState<activityTypes>(DEFAULT_ACTIVITY);
    const [duration, setDuration] = useState(1);

    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const creationTimeStamp = (new Date()).getTime();

        const execrice = {
            id: creationTimeStamp,
            creationTimeStamp,
            stream: stream,
            duration: duration * HOUR_IN_MILLISECONDS,
            activity: activity
        }

        dispatch(SLICE_ACTIONS.saveExercise(execrice));
    }

    const handleStreamChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value }  = e.currentTarget;
        //todo@lbp: add field validation and err msg while typing

        setStream(value as streamTypes);
    }

    const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.currentTarget;
        //todo@lbp: add field validation and err msg while typing
        setActivity(value as activityTypes);
    }

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.currentTarget.value, 10)
        //todo@lbp: add field validation and err msg while typing
        setDuration(value);
    }

    return (
        <Form onSubmit={ handleSubmit }>
            <select name="activity" id="activity" onChange={ handleActivityChange } value={ activity } >
                { ACTIVITIES.map(activity => <option key={ activity } value={ activity }>{ activity }</option>) }
            </select>
            <br />

            <select name="stream" id="stream" onChange={ handleStreamChange } value={ stream } >
                { STREAMS.map(stream => <option key={ stream } value={ stream }>{ stream }</option>) }
            </select>
            <br />

            <input type="text" id='duration' value={ duration } onChange={ handleDurationChange }/>

            <button type='submit'>add</button>
        </Form>
    );
}

export default ExcerciseForm;