import Book from "./Book";

export default class StudyBook extends Book {
  constructor(title, author, audience, description, publishingHouse, year, science, illustration) {
    super(title, author, audience, description, publishingHouse, year)
    this.science = science;
    this.illustration = illustration;
  }
}