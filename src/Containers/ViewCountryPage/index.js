import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from '../../Components/Header';
import './country.css'
import Location from '../../icons/Location'
import { useState } from 'react';
function ViewCountryPage(props) {
  let index = props.match.params.id || 0
  let data = props.countries[index]
  console.log(data);
  const [showMap, setShowMap] = useState(false)
  return (
    <div class="container">
        <div class="country-detail">
            <img src={data.flags.png} loading='lazy' alt="Flag" height={100} width={100}  class="flag" />
            <h1>{data.name.common}</h1>
            <p><strong>Capital:</strong> {data.capital&&data.capital[0]}</p>
            <p><strong>Population:</strong> {data.population}</p>
            <p><strong>Region:</strong> {data.region}</p>
            <p><strong>Continent:</strong> {data.continents[0]}</p>
            <p><strong>Area:</strong> {data.area} million km²</p>
            <p><strong>Languages:</strong> {data.languages ? Object.values(data.languages).join(', ') :''}</p>
            <p><strong>Currencies:</strong>{data.currencies? Object.values(Object.values(data.currencies)[0]).join(', ') : ''}</p>
            <p><strong>Time Zone:</strong> {data.timezones[0]}</p>
            <p><strong>Independent:</strong> {data.independent ? "Yes": 'No'}</p>
            <p><strong>GPS:</strong> <span style={{color:'blue',cursor:'pointer'}} onClick={()=>{setShowMap(!showMap)}}>
              <Location height={18} width={18} color="#000" />{data.latlng[0]},{data.latlng[1]}</span> </p>
        </div>
        {/* {showMap?
          <Map
            google={{}}
            zoom={10}
            visible={showMap}
            initialCenter={{
              lat: 12.23232,
              lng: 70.3223,
            }}
          >
            <Marker
              position={{
                lat: 12.23232,
                lng: 70.3223,
              }}
            />
          </Map>:null} */}
    </div> 
  )
}

const mapStateToProps = state => {
  return {
      countries: state.countries
  }
}
const withConnect = connect(
  mapStateToProps,
);
export const GoogleAuth = GoogleApiWrapper({
  apiKey: 'AIzaSyD6yoy_R7ed59wM_NNURCGv8Tj4A3VDlKQ',
});
export default compose(
  GoogleAuth,
  withConnect,
)(ViewCountryPage);
