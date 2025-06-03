import './App.css'

import Analyze from './pages/Analyze/Analyze'

import Player from './components/Player'
import TimerChallenge from './components/TimerChallenge'

function App() {

  return (
    <>
      <div id="content">
        <header>
          <h1>A <em>Quase</em> Contagem Regressiva</h1>
          <p>Pare o timer quando acabar sua tarefa!</p>
        </header>
      </div>
      
      <Player/>
      <div id="challenges">
        <TimerChallenge title="Tarefa simples" targetTime={60}/>
        <TimerChallenge title="Tarefa média" targetTime={300}/>
        <TimerChallenge title="Tarefa complexa" targetTime={1800}/>
        <TimerChallenge title="Tarefa complicada" targetTime={3600}/>
      </div>

      <Analyze/>
    </>
  )
}

export default App
