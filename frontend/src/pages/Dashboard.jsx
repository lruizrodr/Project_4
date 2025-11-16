import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    fetch(
      `http://localhost:3001/api/questions?category_id=${activeCategory.category_id}`
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [activeCategory]);

  function logout() {
    nav("/login");
  }

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <h3>Categories</h3>
        {categories.map((cat) => (
          <div key={cat.category_id}>
            <button onClick={() => setActiveCategory(cat)}>
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
                  <div key={q.question_id} className="question-item">
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
      </div>
    </div>
  );
}
