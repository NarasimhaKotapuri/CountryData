import  { COUNTRY_DATA } from './constants';

const initialState = {
    countries: [],
}

const countryReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case COUNTRY_DATA:
            return {
                ...state,
                countries: payload,
            }
        default:
            return state;
    }
}

export default countryReducer;