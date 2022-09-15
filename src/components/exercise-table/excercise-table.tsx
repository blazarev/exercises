import styled from 'styled-components'

import { exerciseType } from '../../redux/features/exercises'

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

const HOUR_IN_MILLISECONDS = 3600000;

type propTypes = { data: exerciseType[] };
function ExcerciseForm(props: propTypes) {
    const { data } = props;

    const renderExerciseInfo = (exercise: exerciseType): JSX.Element => {
        const { id, stream, activity, duration } = exercise;
        
        return (
            <Row key={ id } >
                <Cell>{ activity } </Cell>
                <Cell>{ stream }</Cell> 
                <Cell>{ duration / HOUR_IN_MILLISECONDS }</Cell>
            </Row>
        );
    }

    return (
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
    );
}

export default ExcerciseForm