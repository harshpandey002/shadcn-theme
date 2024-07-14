export function applyThemeColors(colors: Record<string, string>) {
  for (const [key, value] of Object.entries(colors)) {
    const cssVar = `--${key}`;
    document.documentElement.style.setProperty(cssVar, value);
  }
}
