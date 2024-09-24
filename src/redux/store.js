import { createStore } from 'redux';

import Reducer from '../redux/reducers';

const store = createStore(Reducer)

export default store;