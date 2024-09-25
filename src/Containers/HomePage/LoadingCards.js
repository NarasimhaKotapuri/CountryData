import { CardContainer, Title, MainDiv } from "./elements";

export const LoadingCard = () => {
    return (
        <CardContainer className="card">
            <div style={{width:"200px",height:'200px',backgroundColor: 'lightgray'}}></div>
            <Title style={{backgroundColor: 'lightgray',width:'150px'}}></Title>
            <p style={{backgroundColor: 'lightgray',width:'150px'}}></p>
            <p style={{backgroundColor: 'lightgray',width:'150px'}}></p>
            <p style={{backgroundColor: 'lightgray',width:'150px'}}></p>
        </CardContainer>
    );
}

export const LoadingCards = () => {
    const loadPages = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <MainDiv id="country-container"> 
            {loadPages.map(num => {return <LoadingCard />})}
        </MainDiv>
    );
}