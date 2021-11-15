import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { addPost, onPostChange } from "./redux/state";

export const renderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App addPost={addPost} state={state} onPostChange={onPostChange} />
    </BrowserRouter>,
    document.getElementById("root")
  );
};
