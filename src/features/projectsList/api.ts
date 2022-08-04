export const fetchProjectsList = () => {
  return fetch("http://localhost:5000/projects")
    .then((res) => res.json())
    .then((data) => {
      const { projects } = data;
      return projects;
    });
};
