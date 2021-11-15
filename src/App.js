import "./App.css";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { Switch, Route } from "react-router-dom";

function App({ state, addPost, onPostChange }) {
  return (
    <div className="app-wrapper">
      <Header />
      <NavBar friends={state.sidebar.friends} />
      <div className="main-content">
        <Switch>
          <Route path="/dialogs">
            <Dialogs data={state.dialogsPage} />
          </Route>
          <Route exact path="/">
            <Profile
              profilePage={state.profilePage}
              addPost={addPost}
              onPostChange={onPostChange}
            />
          </Route>
          <Route path="/t">
            <Music />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
