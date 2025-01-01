import "./App.scss";
import Typography from "./examples/Typography";
import Navbar from "./components/Navigation/Navbar/Navbar.tsx";

function App() {
  return (
    <div className="app">
      {/*<Navbar colors={{ backgroundColor: "nav-bg-test" }} />*/}
      <Navbar
        menuItems={[
          { label: "Home", href: "/" },
          { label: "Test", href: "/test" },
        ]}
        showSearch={true}
        onSearch={query => console.log(query)}
      />

      {/* Create router for examples */}
      <Typography />
    </div>
  );
}

export default App;
