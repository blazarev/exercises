// import Counter from '../counter/counter';
import ExcerciseForm from '../exercise/excercise-form';

import './App.css';

import { useAppSelector } from '../../redux/hooks';

function App() {
  // const value = useAppSelector((state) => state.counter.value)
  const exercises = useAppSelector((state) => state.exercise.data)


  return (
    <div className="App">
      {/* <Counter value={ value } />  */}
      <ExcerciseForm data={ exercises }/>
    </div>
  );
}

export default App;
