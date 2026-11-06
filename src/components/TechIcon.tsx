import * as si from "simple-icons";

const map: Record<string, { path: string; title: string } | undefined> = {
  Python: si.siPython,
  C: si.siC,
  "C++": si.siCplusplus,
  React: si.siReact,
  JavaScript: si.siJavascript,
  Flask: si.siFlask,
  SQLite: si.siSqlite,
  Git: si.siGit,
  GitHub: si.siGithub,
  HTML: si.siHtml5,
  CSS: si.siCss3,
  NumPy: si.siNumpy,
  Pandas: si.siPandas,
};

export function TechIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const icon = map[name];
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
