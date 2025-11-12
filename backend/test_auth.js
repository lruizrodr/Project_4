import fetch from "node-fetch";

async function testRegister() {
  const res = await fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "test1", password: "pass123" }),
  });
  const data = await res.json();
  console.log("Register:", data);
}

async function testLogin() {
  const res = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "test1", password: "pass123" }),
  });
  const data = await res.json();
  console.log("Login:", data);
}

await testRegister();
await testLogin();
