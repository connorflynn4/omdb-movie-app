import { useEffect, useState } from "react";
// using reactstrap to save time with design
import { Container,Card,CardImg,CardText,CardBody,CardTitle,Row,Col,Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from "./components/Search";


export default function App() {
  // console.log(process.env.REACT_APP_API_KEY) #testing

  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;


  // uses a react hook to fetch data asynchrononusly
  useEffect(
    function () {
      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`)
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));
    },
    [searchValue]
  );

  function onKeyPressSearchValue(event) {
    if (event.charCode === 13) {
      setSearchValue(event.target.value);
    }
  }

  function onClickSearch() {
    setSearchValue(searchValue);
  }

// accessing target input and using it as search value
  function onChangeSearchValue(e) {
    setSearchValue(e.target.value);
  }

 
  return (
    <Container style={{ marginTop: "50px" }}>
      <Search
        onChangeSearchValue={onChangeSearchValue}
        onKeyPressSearchValue={onKeyPressSearchValue}
        onClickSearch={onClickSearch}
      />
      <br />
      
        <section className="movies-section">
          <Row>
            {data.Search &&
              data.Search.map((movie) => {
                return (
                  <Col md={2} key={movie.imdbID}>
                    <Card>
                      <CardImg
                        top
                        width="100%"
                        src={movie.Poster}
                        alt="image"
                      />
                      <CardBody>
                        <CardTitle>{movie.Title}</CardTitle>
                        <CardText>{movie.Year}</CardText>
                        <Button>
                          View Movie
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </section>
      
       
      
    </Container>
  );
}
