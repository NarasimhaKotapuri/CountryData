import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import clsx from "clsx";

import useFetch from "../../utils/useFetch";
import CountryCard from "./countryCard";
import { MainDiv, Filters, ImageDiv } from "./elements";
import { updateCountryData } from "../../redux/actions";
 
import './homepage.css'
import loader from "../../assets/images/loader.gif";
import useLazyLoad from "../../lazyLoad/useLazyLoad";
import { LoadingCards } from './LoadingCards'


const NUM_PER_PAGE = 8;
const TOTAL_PAGES = 63;

function HomePage(props) {
    let [data] = useFetch("https://restcountries.com/v3.1/all");

    const[sort, setSort] = useState(false)
    const[searchBy, setSearchBy] = useState('')

    const triggerRef = useRef(null);
    const onGrabData = (currentPage) => {
        // This would be where you'll call your API
        return new Promise((resolve) => {
        setTimeout(() => {
            const data = props.countries && props.countries.slice(
            ((currentPage - 1)%TOTAL_PAGES) * NUM_PER_PAGE,
            NUM_PER_PAGE * (currentPage%TOTAL_PAGES)
            );
            resolve(data);
        }, 3000);
        });
    }; 

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
    const expensiveCalculation = (data) => {
        let temp = data && data.map(item=> {
            if(!disticnct[item.region])
            {
                disticnct[item.region] = true
                return(<option value={item.region}>{item.region}</option>)
            }
            return ''
        })
        return temp
      };
    const regions = useMemo(() => expensiveCalculation(data), [data]);
    const filterRegion = e =>{
        let region = e.target.value
        
        let regionsOrg = data.filter(item => item.region==region || !region)
        props.updateCountryData(regionsOrg)
    }
    const updateTheCountryData = dataOrg =>{
        props.updateCountryData(dataOrg)
    }
    const { data: loadImages , loading } = useLazyLoad({ triggerRef, onGrabData, updateTheCountryData  });

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
                    <select onChange={e=>filterRegion(e)}>
                        <option value=''>All</option>
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
            <MainDiv id="country-container">
                {props.countries && props.countries.length ? 
                    props.countries.map((item,i)=>{
                        return (
                            <Link
                                to={{
                                    pathname: `/country/${i}`,
                                }}
                                style={{textDecoration: 'none'}}
                            ><CountryCard data={item}/></Link>
                        )
                    })
                : <ImageDiv src={loader} width={50} height={50} alt="loader"/>}
            </MainDiv>
            {/* {props.countries && props.countries.length ? <div ref={triggerRef} className={clsx('trigger', {visible : loading})}>
               <LoadingCards />
            </div>: <LoadingCards />} */}
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
