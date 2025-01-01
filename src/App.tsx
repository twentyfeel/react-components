import "./App.scss";
import Typography from "./examples/Typography";
import Navbar from "./components/Navigation/Navbar/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar
        menuItems={[
          {
            label: "Products",
            submenu: [
              { label: "Test1", href: "/test1" },
              { label: "Test2", href: "/test2" },
              { label: "Test3", href: "/test3" },
              { label: "Test4", href: "/test4" },
            ],
          },
          {
            label: "Solutions",
            submenu: [
              { label: "Test1", href: "/test1" },
              { label: "Test2", href: "/test2" },
              { label: "Test3", href: "/test3" },
            ],
          },
          {
            label: "Resources",
            submenu: [
              { label: "Test1", href: "/test1" },
              { label: "Test2", href: "/test2" },
              { label: "Test3", href: "/test3" },
              { label: "Test4", href: "/test4" },
            ],
          },
          { label: "Pricing", href: "/pricing" },
          { label: "Something", href: "/something" },
        ]}
        showSearch={true}
        onSearch={query => console.log(query)}
      />

      <div className="app">
        {/* Create router for examples */}
        <Typography />
      </div>
    </>
  );
}

export default App;
