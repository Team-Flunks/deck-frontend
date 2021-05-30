import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import IsLoadingAndError from './IsLoadingAndError';

function App() {
  return (
    <>
      <BrowserRouter>
        <IsLoadingAndError>
          {/* Need to make Header component */}
          <Header />
          <Route exact path="/">
            {this.props.auth0.isAuthenticated
              // Need to make HomePage component
              ? <HomePage />
              : null}
          </Route>
          <Route exact path="/profile">
            {this.props.auth0.isAuthenticated
              // Need to make Profile component
              ? <Profile />
              : null}
          </Route>
          <Route exact path="/knowledge">
            {this.props.auth0.isAuthenticated
              // Need to make Knowledge component
              ? <Knowledge />
              : null}
          </Route>
          <Route exact path="/pokemon">
            {this.props.auth0.isAuthenticated
              // Need to make Pokemon component
              ? <Pokemon />
              : null}
          </Route>
        </IsLoadingAndError>
      </BrowserRouter>
    </>
  );
}

export default App;
