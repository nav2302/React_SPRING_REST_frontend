import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TodoApp from './components/todo/TodoApp'

function App() {
  return (
    <div className="App">
      {/* <Counter/> */}
      <TodoApp/>
    </div>
  );
}

function LearningComponent(){
  return (
    <div className = "LearningComponent">
      My Hello World!!!
    </div>
  )
}

export default App;
