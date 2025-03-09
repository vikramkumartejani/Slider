import "./App.css";
import Header from "./components/Header";
import Slider from "./components/Slider";

function App() {
  return (
    <div className="min-h-[1263px] w-full flex flex-col h-full">
      <Header/>
      <Slider/>
    </div>
  );
}

export default App;