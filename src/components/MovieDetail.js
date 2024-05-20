import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log("error", error));
  }, [id, apiKey]);

  if (!movie) return <div>Loading...</div>;

  return (
    <Container style={{ marginTop: "50px" }}>
      <Button tag={Link} to="/" color="primary" style={{ marginBottom: "20px" }}>
        Back to Search
      </Button>
      <Card>
        <Row noGutters>
          <Col md="4">
            <CardImg top src={movie.Poster} alt={movie.Title} style={{ maxWidth: '100%', height: 'auto' }} />
          </Col>
          <Col md="8">
            <CardBody>
              <CardTitle tag="h3">{movie.Title}</CardTitle>
              <CardText>{movie.Plot}</CardText>
              <CardText>
                <strong>Year:</strong> {movie.Year}
              </CardText>
              <CardText>
                <strong>Genre:</strong> {movie.Genre}
              </CardText>
              <CardText>
                <strong>Director:</strong> {movie.Director}
              </CardText>
              <CardText>
                <strong>Actors:</strong> {movie.Actors}
              </CardText>
              <CardText>
                <strong>IMDB Rating:</strong> {movie.imdbRating}
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
