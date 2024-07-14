import template from 'lodash.template';

export function getThemeCode(theme: Record<string, string>) {
  if (!theme) {
    return '';
  }

  return template(BASE_STYLES_WITH_VARIABLES)({
    theme,
  });
}

const BASE_STYLES_WITH_VARIABLES = `
  @layer base {
    :root {
      --background: <%- theme["background"] %>;
      --foreground: <%- theme["foreground"] %>;
      --card: <%- theme["card"] %>;
      --card-foreground: <%- theme["card-foreground"] %>;
      --popover: <%- theme["popover"] %>;
      --popover-foreground: <%- theme["popover-foreground"] %>;
      --primary: <%- theme["primary"] %>;
      --primary-foreground: <%- theme["primary-foreground"] %>;
      --secondary: <%- theme["secondary"] %>;
      --secondary-foreground: <%- theme["secondary-foreground"] %>;
      --muted: <%- theme["muted"] %>;
      --muted-foreground: <%- theme["muted-foreground"] %>;
      --accent: <%- theme["accent"] %>;
      --accent-foreground: <%- theme["accent-foreground"] %>;
      --destructive: <%- theme["destructive"] %>;
      --destructive-foreground: <%- theme["destructive-foreground"] %>;
      --border: <%- theme["border"] %>;
      --input: <%- theme["input"] %>;
      --ring: <%- theme["ring"] %>;
      --radius: <%- theme["radius"] %>;
    }
  
    .dark {
        /* coming soon... */
    }
  }
  `;
