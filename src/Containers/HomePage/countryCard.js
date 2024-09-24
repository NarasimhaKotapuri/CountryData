
import { CardContainer, Title } from "./elements";

function CountryCard({data}) {
    return (
        <CardContainer className="card">
            <img src={data.flags.png} alt="John" style={{width:"250px",height:'200px'}} />
            <Title>{data.name.common}</Title>
            <p><strong>Capital:</strong> {data.capital&&data.capital[0]}</p>
            <p><strong>Population:</strong> {data.population}</p>
            <p><strong>Region:</strong> {data.region}</p>
        </CardContainer>
    );
  }
  
  export default CountryCard;
  