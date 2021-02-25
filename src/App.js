import './App.css';
import Dashboard from './Components/Dashboard';
import Store from './Components/Store';

function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
