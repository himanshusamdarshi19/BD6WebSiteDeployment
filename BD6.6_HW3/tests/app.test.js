let request = require("supertest");
let http = require("http");
let { getAllBooks, getBookByID } = require("../controllers");
let { app } = require("../index.js");

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllBooks: jest.fn(),
    getBookByID: jest.fn(),
}));

let server;

beforeAll(() => {
    server = http.createServer(app);
    server.listen(3001);
});

afterAll(() => {
    server.close();
});

describe("API Endpoints Testing", () => {
    it("GET /books should return all books", async () => {
        let books = [
            {
                bookId: 1,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
            },
            {
                bookId: 2,
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian",
            },
            {
                bookId: 3,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Classic",
            },
        ];
        getAllBooks.mockReturnValue(books);
        let result = await request(server).get("/BD6.6_HW3/books");
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ books });
    });

    it("GET /books/details/:id should return book detail by id", async () => {
        let book = {
            bookId: 1,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
        };
        getBookByID.mockReturnValue(book);
        let result = await request(server).get("/BD6.6_HW3/books/details/1");
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ book: book });
    });
});

describe("Validation Function Testing", () => {
    it("should get all books", () => {
        let books = [
            {
                bookId: 1,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
            },
            {
                bookId: 2,
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian",
            },
            {
                bookId: 3,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Classic",
            },
        ];
        getAllBooks.mockReturnValue(books);
        let result = getAllBooks();
        expect(result.length).toBe(3);
        expect(result).toEqual(books);
    });
});
