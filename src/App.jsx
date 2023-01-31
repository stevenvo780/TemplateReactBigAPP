import 'react-spinner-animated/dist/index.css';
import React from 'react';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom'; // Librería react-router-dom
import { history } from './store/configureStore';
import { useSelector } from 'react-redux';
import DefaultLayout from './layouts/DefaultLayout';
import routesDefault from './routes/routesDefault';
import { HalfMalf } from 'react-spinner-animated';

function App() {
  const loading = useSelector((state) => state.ui.loading);

  React.useEffect(() => {
    if (loading) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [loading]);

  return (
    <>
      <Router history={history}>
        <div>
          {loading === true && (
            <div className="loader">
              <HalfMalf />
            </div>
          )}
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <DefaultLayout
                  {...props}
                  routes={routesDefault}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
