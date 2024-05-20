import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Card, CardImg, CardText, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";

export default function App() {
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (searchValue) {
      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`)
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));
    }
  }, [searchValue, apiKey]);

  function onKeyPressSearchValue(event) {
    if (event.charCode === 13) {
      setSearchValue(event.target.value);
    }
  }

  function onClickSearch() {
    setSearchValue(searchValue);
  }

  function onChangeSearchValue(e) {
    setSearchValue(e.target.value);
  }

  return (
    <Router>
      <Container style={{ marginTop: "50px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search
                  onChangeSearchValue={onChangeSearchValue}
                  onKeyPressSearchValue={onKeyPressSearchValue}
                  onClickSearch={onClickSearch}
                />
                <br />
                <section className="movies-section">
                  <Row>
                    {data.Search &&
                      data.Search.map((movie) => (
                        <Col md={2} key={movie.imdbID}>
                          <Card>
                            <CardImg top width="100%" src={movie.Poster} alt="image" />
                            <CardBody>
                              <CardTitle>{movie.Title}</CardTitle>
                              <CardText>{movie.Year}</CardText>
                              <Button tag={Link} to={`/movie/${movie.imdbID}`}>
                                View Movie
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </section>
              </>
            }
          />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}
