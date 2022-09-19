import styled from 'styled-components'
import { exerciseType } from '../../redux/features/exercises'

const Cell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;
const Row = styled.tr``;

const HOUR_IN_MILLISECONDS = 3600000;

function RowItem (props: exerciseType) {
    const { id, stream, activity, duration } = props;

    return (
        <Row>
            <Cell key={ `${id}/activity` }>{ activity } </Cell>
            <Cell key={ `${id}/stream` }>{ stream }</Cell> 
            <Cell key={ `${id}/duration` }>{ duration / HOUR_IN_MILLISECONDS }</Cell>
        </Row>
    );
}
export default RowItem;
