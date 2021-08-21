const url = "http://localhost:3001";

async function getSurveys() {
  const response = await fetch("/api/surveys");
  const surveys = await response.json();
  return surveys;
}

async function getYourSurveys() {
  const response = await fetch("/api/view-results");
  const surveys = await response.json();
  return surveys;
}

async function getResponses(id) {
  const response = await fetch("/api/responses/" + id);
  const responses = await response.json();
  return responses;
}

async function getSurvey(id) {
  const response = await fetch("/api/surveys/" + id);
  const survey = await response.json();
  return survey;
}

async function postSurvey(survey) {
  const response = await fetch("/api/surveys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...survey }),
  });

  if (response.ok) return null;
  else return { err: "post error" };
}

async function postResponse(answer) {
  const response = await fetch("/api/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...answer }),
  });

  if (response.ok) return null;
  else return { err: "post error" };
}

async function getUserInfo() {
  const response = await fetch("/api/sessions/current");
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server
  }
}

async function logIn(credentials) {
  let response = await fetch("/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user.name;
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}
async function logOut() {
  await fetch("/api/sessions/current", { method: "DELETE" });
}

const API = {
  getSurveys,
  getSurvey,
  getUserInfo,
  logIn,
  logOut,
  postSurvey,
  postResponse,
  getYourSurveys,
  getResponses,
};
export default API;
