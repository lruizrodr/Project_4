import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    setActiveQuestion(null);
    setAnswers([]);

    if (!activeCategory) return;

    fetch(
      `http://localhost:3001/api/questions?category_id=${activeCategory.category_id}`
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [activeCategory]);

  useEffect(() => {
    if (!activeQuestion) return;

    fetch(
      `http://localhost:3001/api/answers?question_id=${activeQuestion.question_id}`
    )
      .then((res) => res.json())
      .then((data) => setAnswers(data));
  }, [activeQuestion]);

  function logout() {
    nav("/login");
  }

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <h3>Categories</h3>
        {categories.map((cat) => (
          <div key={cat.category_id}>
            <button
              onClick={() => setActiveCategory(cat)}
              className={
                activeCategory &&
                activeCategory.category_id === cat.category_id
                  ? "active-category"
                  : ""
              }
            >
              {cat.name}
            </button>
          </div>
        ))}
      </div>

      <div className="main-content">
        <div className="header-bar">
          <div>Dashboard</div>
          <button onClick={logout}>Logout</button>
        </div>

        {!activeCategory && <p>Select a Category to view its Questions</p>}

        {activeCategory && (
          <>
            <h2>{activeCategory.name}</h2>

            {questions.length === 0 ? (
              <p>No questions in this category.</p>
            ) : (
              <div>
                {questions.map((q) => (
                  <div
                    key={q.question_id}
                    className="question-item"
                    onClick={() => setActiveQuestion(q)}
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{q.title}</strong>
                    <p>{q.body}</p>
                    <small>
                      Posted by {q.username} on{" "}
                      {new Date(q.created_at).toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeQuestion && (
          <>
            <h3>Answers for: {activeQuestion.title}</h3>

            {answers.length === 0 ? (
              <p>No answers yet.</p>
            ) : (
              <div>
                {answers.map((a) => (
                  <div
                    key={a.answer_id}
                    style={{
                      background: "#e9e9e9",
                      padding: "12px",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  >
                    <p>{a.body}</p>
                    <small>
                      — {a.username} on{" "}
                      {new Date(a.created_at).toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
