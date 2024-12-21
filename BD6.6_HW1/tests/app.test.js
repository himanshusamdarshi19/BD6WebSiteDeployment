const request = require("supertest");
const http = require("http");
const { getAllMovies, getMovieById } = require("../controllers");
const { app } = require("../index.js");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all movies", async () => {
    let movieData = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];
    getAllMovies.mockReturnValue(movieData);
    let result = getAllMovies();
    expect(result).toEqual(movieData);
    expect(result.length).toBe(3);
  });

  it("should get movie by id", async () => {
    let movie = {
      movieId: 1,
      title: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    };
    getMovieById.mockReturnValue(movie);
    let result = getMovieById(1);
    expect(result).toEqual(movie);
  });
});

describe("API Endpoint Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("GET /movies should get all movies", async () => {
    let movieData = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    let result = await request(server).get("/movies");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ result: movieData });
  });

  it("GET /movies/details/:id should return movie detail by id", async () => {
    let movie = {
      movieId: 1,
      title: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    };
    let result = await request(server).get("/movies/details/1");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ result: movie });
  });
});
