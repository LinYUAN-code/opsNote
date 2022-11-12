import MarkdownEditor from "./components/MarkdownEditor/MarkdownEditor";
import "./App.less";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App-container">
      <Header></Header>
      <MarkdownEditor></MarkdownEditor>
    </div>
  );
}

export default App;
