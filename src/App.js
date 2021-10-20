import logo from "./logo.svg";
import "./App.css";
import Layout from "@components/Layout.jsx";

function App() {
  return (
    <Layout>
      <div className="App">
        <main className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Proyecto de e-commerce de Victor Sanchez Sumay</p>
        </main>
      </div>
    </Layout>
  );
}

export default App;
