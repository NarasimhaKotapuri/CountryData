import  { COUNTRY_DATA } from './constants';

export const updateCountryData = (payload) => {
    return {
        type: COUNTRY_DATA,
        payload
    }
}