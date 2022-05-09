import { UseState } from "./UseState";
// import { ClassState } from "./ClassState";
import { UseReducer } from "./UseReducer";
import "./App.css";

function App() {
  return (
    <div className="w-full min-h-[100v flex-col items-center justify-center bg-slate-700">
      <UseState name="UseState" />
      {/* <ClassState name="ClassState" /> */}
      <UseReducer name="UseReducer" />
    </div>
  );
}

export default App;
