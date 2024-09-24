import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import useFetch from "../../utils/useFetch";
import CountryCard from "./countryCard";
import { MainDiv, Filters } from "./elements";
import { updateCountryData } from "../../redux/actions";
 
import './homepage.css'
import { useEffect, useState } from "react";
function HomePage(props) {
    let [data] = useFetch("https://restcountries.com/v3.1/all");

    const[sort, setSort] = useState(false)
    const[searchBy, setSearchBy] = useState('')
    useEffect(()=>{
        props.updateCountryData(data)
    },data)
    useEffect(() => {
      let orgData = data || props.countries;
      let mainData = orgData&&orgData.filter(item=> (item.name.common.toLowerCase().startsWith(searchBy))||(item.capital&&item.capital[0].toLowerCase().startsWith(searchBy.toLowerCase)))
      console.log(mainData);
      
      props.updateCountryData(mainData)
    }, [searchBy])
        
    const sorting = (isSort) =>{
        if(isSort){
            let data1 = props.countries.sort((a,b)=>{
                let c=a.population || 0;
                let d=b.population || 0;
                if(c>d) return 1
                else return -1
            })
            props.updateCountryData(data1)
        } else {
            let data1 = props.countries.sort((a,b)=>{
                let c=a.population || 0;
                let d=b.population || 0;
                if(c>d) return -1
                else return 1
            })
            props.updateCountryData(data1)
        }
    }
    let disticnct = {}
    let regions = data && data.map(item=> {
        if(!disticnct[item.region])
        {
            disticnct[item.region] = true
            return(<option value={item.region}>{item.region}</option>)
        }
        return ''
    })

    const filterRegion = e =>{
        let region = e.target.value
        
        let regionsOrg = data.filter(item => item.region==region)
        props.updateCountryData(regionsOrg)
    }
    return (
        <div>
            <Filters>
                <div style={{display:'flex'}}>
                    <h3>Sort : </h3>
                    <label class="switch">
                        <input type="checkbox" onClick={()=>{sorting(!sort);setSort(!sort)}}/>
                        <span class="slider"></span>
                    </label>
                </div>
                <div style={{display:'flex'}}>
                    <h3>Region : </h3>
                    <select onClick={e=>filterRegion(e)}>
                        {regions}
                    </select>
                </div>
                <div style={{display:'flex'}}>
                    <input placeholder="Search By Name or Capital :" value={searchBy} onChange={e=>setSearchBy(e.target.value)} />
                </div>
                <div style={{display:'flex'}}>
                    <button onClick={e=>{if(data)props.updateCountryData(data);setSort(sort);setSearchBy('')}}>RESET</button>
                </div>
            </Filters>
            <MainDiv>
                {props.countries && props.countries.length ? 
                    props.countries.map((item,i)=>{
                        return (
                            <Link
                                to={{
                                    pathname: `/country/${i}`,
                                }}
                            ><CountryCard data={item}/></Link>
                        )
                    })
                : null}
            </MainDiv>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        countries: state.countries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCountryData: data => dispatch(updateCountryData(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
