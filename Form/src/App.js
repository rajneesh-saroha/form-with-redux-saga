import "./App.css";
import Form from "./Form";
import { Provider } from "react-redux";
import configureStore from "./store";
const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Form />
      </div>
    </Provider>
  );
}
export { store };
export default App;
