import "./App.scss";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle.tsx";
import Typography from "./examples/Typography";

function App() {
  return (
    <div className="app">
      <h1>React Components</h1>
      {/* TODO: here will come navigation when we create one*/}
      <ThemeToggle className="theme-toggle" />

      {/* Create router for examples */}
      <Typography />
    </div>
  );
}

export default App;
