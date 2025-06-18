import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <>
    <ModeToggle />
    <h1>Hello Vite!</h1>
    <div className="card">
      <h2>Start editing to see some magic happen!</h2>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
        <br />
        <a className="text-blue-600" href="https://vitejs.dev/guide/features.html" target="_blank">
          Learn Vite
        </a>
        <span className="text-blue-600">,</span>
        <a className="text-blue-600" href="https://reactjs.org/" target="_blank">
          Learn React
        </a>
      </p>
    </div>  
    </>
  );
}

export default App;
