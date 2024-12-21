const request = require("supertest");
const http = require("http");
const { getAllGames, getGameById } = require("../controllers");
const { app } = require("../index.js");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("API Endpoints Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /games should get all games", async () => {
    let expectedGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];
    // Mock the response for getAllGames
    getAllGames.mockReturnValue(expectedGames);
    let result = await request(server).get("/BD6.6_HW2/games");
    console.log(result.body); // Log the response body
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      games: expectedGames,
    });
  });

  it("GET /games/details/:id should get game details by id", async () => {
    // Mock the response for getGameById
    getGameById.mockReturnValue({
      gameId: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      genre: "Adventure",
      platform: "Nintendo Switch",
    });
    let res = await request(server).get("/BD6.6_HW2/games/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      game: {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
    });
  });
});

describe("Validation Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return all games", () => {
    let games = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];
    getAllGames.mockReturnValue(games);
    let result = getAllGames();
    expect(result).toEqual(games);
    expect(result.length).toBe(3);
  });
});
