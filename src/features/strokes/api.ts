import { Stroke } from "../../utils/types";

export const newProject = (name: string, strokes: Stroke[], image: string) =>
  fetch("http://localhost:5000/projects", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      strokes,
      image,
    }),
  }).then((res) => res.json());

export const getProject = (projectId: string) => {
  return fetch(`http://localhost:5000/projects/${projectId}`).then((res) =>
    res.json()
  );
};
