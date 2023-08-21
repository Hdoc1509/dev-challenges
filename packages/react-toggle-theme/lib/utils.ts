export type Theme = "light" | "dark";

export const getTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const saveTheme = (theme: Theme) => {
  localStorage.setItem("theme", theme);
};

export const applyTheme = (theme: Theme) => {
  document.body.dataset.theme = theme;
};

export const toggleTheme = (): Theme => {
  const newTheme = getTheme() === "light" ? "dark" : "light";

  applyTheme(newTheme);
  saveTheme(newTheme);

  return newTheme;
};
