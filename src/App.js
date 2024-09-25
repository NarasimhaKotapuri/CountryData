import {Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';

import HomePage from './Containers/HomePage'
import ViewCountryPage from './Containers/ViewCountryPage'
import NotFoundPage from './Containers/NotFoundPage/';
import './App.css';
import Header from './Components/Header';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/country/:id" component={ViewCountryPage} />
            <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
