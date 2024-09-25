import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from '../../Components/Header';
import './country.css'
import Location from '../../icons/Location'
import { useState,  useMemo } from 'react';
function ViewCountryPage(props) {
  let index = props.match.params.id || 0
  // let data = props.countries[index]
  const expensiveCalculation = (countries,index) => {
    console.log('came here..');
    
    return countries[index]
  };
  const data = useMemo(() => expensiveCalculation(props.countries,index), [index]);
  const [showMap, setShowMap] = useState(false)
  const [countryData, setCountryData] = useState({})
  return (
    <div style={{display:'flex'}}>
        <div className="container">
          <div className="country-detail">
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
      <div className='container'>
        <div>
            <input onChange={e=>{
              let searchBy = e.target.value.toString()
              console.log(props.countries[0].name.common.startsWith(searchBy.toLowerCase()));
              
              let regionsOrg = props.countries.filter(item=> (item.name.common.toLowerCase().startsWith(searchBy))||(item.capital&&item.capital[0].toLowerCase().startsWith(searchBy.toLowerCase)))
              console.log(regionsOrg);
              
              if(regionsOrg && regionsOrg.length && searchBy) setCountryData(regionsOrg[0])
              else setCountryData({})
            }} placeholder='Compare With' width={300} />
          </div>
          {Object.keys(countryData).length ? 
            <div className="country-detail">
              <img src={countryData.flags.png} loading='lazy' alt="Flag" height={100} width={100}  class="flag" />
              <h1>{countryData.name.common}</h1>
              <p><strong>Capital:</strong> {countryData.capital&&countryData.capital[0]}</p>
              <p><strong>Population:</strong> {countryData.population}</p>
              <p><strong>Region:</strong> {countryData.region}</p>
              <p><strong>Continent:</strong> {countryData.continents[0]}</p>
              <p><strong>Area:</strong> {countryData.area} million km²</p>
              <p><strong>Languages:</strong> {countryData.languages ? Object.values(countryData.languages).join(', ') :''}</p>
              <p><strong>Currencies:</strong>{countryData.currencies? Object.values(Object.values(countryData.currencies)[0]).join(', ') : ''}</p>
              <p><strong>Time Zone:</strong> {countryData.timezones[0]}</p>
              <p><strong>Independent:</strong> {countryData.independent ? "Yes": 'No'}</p>
              <p><strong>GPS:</strong> <span style={{color:'blue',cursor:'pointer'}} onClick={()=>{setShowMap(!showMap)}}>
                <Location height={18} width={18} color="#000" />{countryData.latlng[0]},{countryData.latlng[1]}</span> </p>
          </div>
          :null}
      </div>
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
