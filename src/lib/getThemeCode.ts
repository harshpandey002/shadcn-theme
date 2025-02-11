import template from 'lodash.template';

export function getThemeCode(theme: {
  light: Record<string, string>;
  dark: Record<string, string>;
}) {
  if (!theme) {
    return '';
  }

  return template(BASE_STYLES_WITH_VARIABLES)({
    light: theme.light,
    dark: theme.dark,
  });
}

const BASE_STYLES_WITH_VARIABLES = `
  @layer base {
    :root {
      --background: <%- light["background"] %>;
      --foreground: <%- light["foreground"] %>;
      --card: <%- light["card"] %>;
      --card-foreground: <%- light["card-foreground"] %>;
      --popover: <%- light["popover"] %>;
      --popover-foreground: <%- light["popover-foreground"] %>;
      --primary: <%- light["primary"] %>;
      --primary-foreground: <%- light["primary-foreground"] %>;
      --secondary: <%- light["secondary"] %>;
      --secondary-foreground: <%- light["secondary-foreground"] %>;
      --muted: <%- light["muted"] %>;
      --muted-foreground: <%- light["muted-foreground"] %>;
      --accent: <%- light["accent"] %>;
      --accent-foreground: <%- light["accent-foreground"] %>;
      --destructive: <%- light["destructive"] %>;
      --destructive-foreground: <%- light["destructive-foreground"] %>;
      --border: <%- light["border"] %>;
      --input: <%- light["input"] %>;
      --ring: <%- light["ring"] %>;
      --radius: <%- light["radius"] %>;
    }
  
    .dark {
      --background: <%- dark["background"] %>;
      --foreground: <%- dark["foreground"] %>;
      --card: <%- dark["card"] %>;
      --card-foreground: <%- dark["card-foreground"] %>;
      --popover: <%- dark["popover"] %>;
      --popover-foreground: <%- dark["popover-foreground"] %>;
      --primary: <%- dark["primary"] %>;
      --primary-foreground: <%- dark["primary-foreground"] %>;
      --secondary: <%- dark["secondary"] %>;
      --secondary-foreground: <%- dark["secondary-foreground"] %>;
      --muted: <%- dark["muted"] %>;
      --muted-foreground: <%- dark["muted-foreground"] %>;
      --accent: <%- dark["accent"] %>;
      --accent-foreground: <%- dark["accent-foreground"] %>;
      --destructive: <%- dark["destructive"] %>;
      --destructive-foreground: <%- dark["destructive-foreground"] %>;
      --border: <%- dark["border"] %>;
      --input: <%- dark["input"] %>;
      --ring: <%- dark["ring"] %>;
      --radius: <%- dark["radius"] %>;
    }
  }
  `;
