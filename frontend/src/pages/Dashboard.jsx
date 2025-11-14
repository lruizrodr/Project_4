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
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "200px",
          borderRight: "1px solid black",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <h3>Categories</h3>
        {categories.map((cat) => (
          <div key={cat.category_id}>
            <button onClick={() => setActiveCategory(cat)}>
              {cat.name}
            </button>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: "10px" }}>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>

        {!activeCategory && <p>Select a Category to view its Questions</p>}

        {activeCategory && (
          <>
            <h2>{activeCategory.name}</h2>

            {questions.length === 0 ? (
              <p>No questions in this category.</p>
            ) : (
              <ul>
                {questions.map((q) => (
                  <li key={q.question_id}>
                    <strong>{q.title}</strong>
                    <p>{q.body}</p>
                    <small>
                      Posted by {q.username} on{" "}
                      {new Date(q.created_at).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
