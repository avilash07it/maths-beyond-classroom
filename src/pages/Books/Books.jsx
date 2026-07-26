import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { books } from "./booksData";
import "./Books.css";

function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="book-cover-wrap">
        <img src={book.coverImage} alt={`${book.title} cover`} className="book-cover" />
      </div>

      <div className="book-card-body">
        <h3>{book.title}</h3>
        <p>{book.description}</p>

        <div className="book-tags" aria-label={`${book.title} target exams`}>
          {book.targetExams.map((exam) => (
            <span key={exam}>{exam}</span>
          ))}
        </div>

        <div className="book-meta">
          {book.author && (
            <div>
              <span>Author</span>
              <strong>{book.author}</strong>
            </div>
          )}

          {book.price && (
            <div>
              <span>Price</span>
              <strong>{book.price}</strong>
            </div>
          )}
        </div>
      </div>

      <a className="book-buy-btn" href={book.amazonLink} target="_blank" rel="noreferrer">
        Buy Now
      </a>
    </article>
  );
}

function Books() {
  const navigate = useNavigate();

  const scrollToBooks = () => {
    document.getElementById("books-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageTransition>
      <div className="books-page">
        <DashboardNavbar />

        <main>
          <section className="books-hero">
            <div className="books-hero-copy">
              <span className="books-eyebrow">Curated Olympiad Library</span>
              <h1>Olympiad Mathematics Books</h1>
              <p>
                Carefully selected books for IOQM, RMO, NMTC, SEHSS and school
                Olympiads.
              </p>
              <button type="button" onClick={scrollToBooks}>
                Browse Books
              </button>
            </div>

          </section>

          <section className="books-section" id="books-grid">
            <div className="books-section-header">
              <div>
                <span>Books Grid</span>
                <h2>Choose the right level</h2>
              </div>
              <p>From school foundations to national Olympiad preparation.</p>
            </div>

            <div className="books-grid">
              {books.map((book) => (
                <BookCard book={book} key={book.id} />
              ))}
            </div>
          </section>

          <section className="books-bottom-cta">
            <div>
              <span>Next Step</span>
              <h2>Continue your Olympiad journey with the right resources.</h2>
            </div>
            <button type="button" onClick={() => navigate("/topics")}>
              Explore Courses
            </button>
          </section>
        </main>
      </div>
    </PageTransition>
  );
}

export default Books;
