class FilmService {
  _apiKey = "052a7bfc73ba8f24b52cbf7c006da253";
  _apiBase = "https://api.themoviedb.org/3/";
  _basePage = 1;

  // function template to get resource from db
  getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };

  getFilmByID = async (id) => {
    const res = await this.getResource(`${this._apiBase}movie/${id}?api_key=${this._apiKey}`); //Request to DBі
    return this._transcriptFilmId(res);
  };

  getReviews = async (id) => {
    const res = await this.getResource(`${this._apiBase}movie/${id}/reviews?api_key=${this._apiKey}`);
    console.log(res.results);
    return res.results;
  };

  getPopular = async (page = this._basePage) => {
    const res = await this.getResource(`${this._apiBase}movie/popular?api_key=${this._apiKey}&language=en-US&page=${page}`); // required page number
    return res.results.map((item) => this._transcriptFilm(item));
  };

  getGenres = async () => {
    const res = await this.getResource(`${this._apiBase}genre/movie/list?api_key=${this._apiKey}&language=en-US`);
    return res.genres;
  };

  getSearched = async (query, page) => {
    const res = await this.getResource(
      `${this._apiBase}search/movie?query=${query}&api_key=${this._apiKey}`
      // The request url was not correct based on TMDB documentation, &page=${page} should not
      // be included in search
      // `${this._apiBase}search/movie?query=${query}&api_key=${this._apiKey}&page=${page}`
    );
    return res.results.map((item) => this._transcriptFilm(item));
  };

  getDescription = () => {
    return this.getResource(`${this._apiBase}movie/{movie_id}?api_key=${this._apiKey}&language=en-US`); // required move_id
  };

  getRelated = async (id) => {
    const res = await this.getResource(`${this._apiBase}movie/${id}/recommendations?api_key=${this._apiKey}&language=en-US&${this._basePage}`); // required page number
    return res.results.map((item) => this._transcriptFilm(item));
  };

  _transcriptFilm(film) {
    return {
      id: film.id,
      title: film.original_title,
      genre_ids: film.genre_ids,
      description: film.overview,
      poster_path: "https://image.tmdb.org/t/p/w500" + film.poster_path,
      onLike: false,
    };
  }

  _transcriptFilmId(film) {
    return {
      id: film.id,
      title: film.original_title,
      genre_ids: film.genres.map((gen) => gen.id),
      description: film.overview,
      poster_path: "https://image.tmdb.org/t/p/w500" + film.poster_path,
      onLike: false,
    };
  }
}

export default FilmService;
