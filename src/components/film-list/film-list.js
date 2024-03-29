import { Container, Row, Col, Card, Button, Badge, ToggleButton } from "react-bootstrap";
import FilmService from "../../services/FilmService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./film-list.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [newItemLoading, setNewItemLoading] = useState(false);

  const newService = new FilmService();

  const onFilmListLoading = () => {
    setNewItemLoading((onFilmListLoading) => !onFilmListLoading);
  };

  const onGenresLoaded = (res) => {
    setGenres((genres) => res);
  };

  useEffect(() => {
    onRequest();
  }, []);

  // load film list (request to server)
  const onRequest = () => {
    onFilmListLoading();
    newService.getPopular(page).then(onListLoaded);
    getGenresList();
  };

  // write list to the state
  const onListLoaded = (res) => {
    setFilms((films) => [...films, ...res]);
    setPage((page) => page + 1);
    setNewItemLoading((newItemLoading) => false);
  };

  const getGenresList = () => {
    newService.getGenres().then(onGenresLoaded);
  };

  function onToggleFavorites(id, item) {
    if (!item.onLike) {
      addFavorite(id, item, films, setFilms);
    } else {
      removeFavorite(id, item, films, setFilms);
    }
  }

  function addFavorite(id, item, list, setList) {
    const index = list.findIndex((film) => film === item);
    const newItem = { ...item, onLike: !item.onLike };
    const newlist = [...list.slice(0, index), newItem, ...list.slice(index + 1)];
    setList([...newlist]);
    localStorage.setItem(id, JSON.stringify(item));
  }

  function removeFavorite(id, item, list, setList) {
    const index = list.findIndex((film) => film === item);
    const newItem = { ...item, onLike: !item.onLike };
    const newlist = [...list.slice(0, index), newItem, ...list.slice(index + 1)];
    setList([...newlist]);
    localStorage.removeItem(id);
  }

  function renderFilms(arr) {
    // change img path
    const items = arr.map((item, i) => {
      // create badge for each id
      const genre = item.genre_ids.map((id) => {
        // overwrite id as genre
        genres.forEach((gen) => {
          if (id === gen.id) {
            id = gen.name;
          }
        });
        return (
          <Badge bg="secondary" key={id} pill className="me-1">
            {id}
          </Badge>
        );
      });

      if (localStorage.getItem(item.id)) {
        item.onLike = true;
      }

      return (
        <Col key={item.id}>
          <Card bg="light" text="dark" style={{ width: "14rem" }} className="cardList">
            <Link to={`/film/${item.id}`}>
              <Card.Img variant="top" src={item.poster_path} alt={item.title} />
            </Link>
            <Card.Body>
              <ToggleButton bg="danger" size="sm" type="checkbox" className="me-2" variant="outline-danger" onClick={() => onToggleFavorites(item.id, item, i)}>
                {item.onLike ? <AiFillHeart /> : <AiOutlineHeart />}
              </ToggleButton>
              {genre}
            </Card.Body>
          </Card>
          <br />
        </Col>
      );
    });

    return <Row>{items}</Row>;
  }

  let items = renderFilms(films);

  return (
    <Container className="justify-content-md-center">
      <InfiniteScroll dataLength={films.length} next={onRequest} hasMore={!newItemLoading} loader={<h4>Loading...</h4>} endMessage={<p>No more films to show.</p>}>
        {renderFilms(films)}
      </InfiniteScroll>
    </Container>
  );
};

export default FilmList;
