import "./App.scss";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle.tsx";

function App() {
  return (
    <div className="app">
      <h1>React Components</h1>
      <ThemeToggle className="theme-toggle" />
    </div>
  );
}

export default App;
