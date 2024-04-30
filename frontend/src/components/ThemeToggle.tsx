import { useTheme } from "@/provider/ThemeProvider";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme("light")}>🌝</button>
      <button onClick={() => setTheme("dark")}>🌚</button>
      <button onClick={() => setTheme("system")}>💻</button>
    </div>
  );
}
