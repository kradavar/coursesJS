import Book from "./Book";

export default class AudioBook extends Book {
  constructor(title, author, audience, description, publishingHouse, year, long, reader) {
    super(title, author, audience, description, publishingHouse, year)
    this.long = long;
    this.reader = reader;
  }
}