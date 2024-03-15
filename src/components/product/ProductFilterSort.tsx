import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
// import { GENRE_TYPES } from "../../common/constants";
import { useDispatch } from "react-redux";
// import {
//   filterMovies,
//   sortMoviesByRatingAsc,
//   sortMoviesByRatingDesc,
//   sortMoviesByYearAsc,
//   sortMoviesByYearDesc,
// } from "../../store/movies/movies-slice";

export const ProductFilterSort: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(filterMovies(selectedGenre));
  }, [selectedGenre]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;
    setSortBy(sortType);
    // if (sortType === "year-asc") {
    //   dispatch(sortMoviesByYearAsc());
    // } else if (sortType === "year-desc") {
    //   dispatch(sortMoviesByYearDesc());
    // } else if (sortType === "rating-asc") {
    //   dispatch(sortMoviesByRatingAsc());
    // } else if (sortType === "rating-desc") {
    //   dispatch(sortMoviesByRatingDesc());
    // }
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGenre">
          <Form.Label>Filter by Genre:</Form.Label>
          <Form.Select onChange={handleGenreChange} value={selectedGenre}>
            <option value="">All Genres</option>
            {/* {GENRE_TYPES.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))} */}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formSort">
          <Form.Label>Sort by:</Form.Label>
          <Form.Select onChange={handleSortChange} value={sortBy}>
            <option value="">None</option>
            <option value="year-asc">Year (Ascending)</option>
            <option value="year-desc">Year (Descending)</option>
            <option value="rating-asc">Rating (Ascending)</option>
            <option value="rating-desc">Rating (Descending)</option>
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>
  );
};
