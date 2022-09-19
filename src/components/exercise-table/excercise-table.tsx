import { useAppSelector } from '../../redux/hooks';
import styled from 'styled-components'

import RowItem from '../row/row';

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

function ExcerciseForm() {
    const data = useAppSelector((state) => state.exercise.data);

    return (
        <Table>
            <thead>
                <Row>
                    <Head>type</Head>
                    <Head>stream</Head>
                    <Head>duration</Head>
                </Row>
            </thead>
            <tbody>
                { data.map((el) => <RowItem key={ el.id } { ...el } />) }
            </tbody>
        </Table>
    );
}

export default ExcerciseForm