#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import theme configuration
const themeConfigPath = path.join(__dirname, '../src/lib/theme-config.ts');
const themeConfig = fs.readFileSync(themeConfigPath, 'utf8');

// Extract current theme from the file
const currentThemeMatch = themeConfig.match(/export const currentTheme = "([^"]+)"/);
const currentTheme = currentThemeMatch ? currentThemeMatch[1] : 'blue';

// Extract color schemes
const colorSchemesMatch = themeConfig.match(/export const colorSchemes: Record<string, ColorScheme> = \{([\s\S]*?)\};/);
if (!colorSchemesMatch) {
  console.error('Could not find color schemes in theme-config.ts');
  process.exit(1);
}

// Generate CSS variables for current theme
function generateCSS(themeName) {
  const colorsMatch = themeConfig.match(new RegExp(`${themeName}: \\{[\\s\\S]*?name: "([^"]+)",[\\s\\S]*?colors: \\{([\\s\\S]*?)\\}`, 'm'));
  if (!colorsMatch) {
    console.error(`Could not find theme ${themeName}`);
    return '';
  }

  const colors = {
    primary: "220 100% 50%",
    primaryDark: "220 100% 40%", 
    primaryLight: "220 100% 60%",
    accent: "220 100% 50%",
    accentDark: "220 85% 25%",
    accentLight: "220 100% 65%",
    background: "0 0% 100%",
    card: "0 0% 100%",
    foreground: "0 0% 0%",
    muted: "220 13% 97%",
    border: "220 13% 86%",
    destructive: "0 84.2% 60.2%",
    success: "142 76% 36%",
    warning: "45 93% 58%",
    brandBlue: "220 85% 25%",
    gold: "220 100% 50%",
    goldDark: "220 100% 40%",
    goldLight: "220 100% 60%"
  };

  // Override with theme-specific colors if available
  if (themeName === 'gold') {
    colors.primary = "45 80% 55%";
    colors.primaryDark = "45 80% 45%";
    colors.primaryLight = "45 80% 65%";
    colors.accent = "45 90% 65%";
    colors.accentDark = "45 70% 45%";
    colors.accentLight = "45 90% 75%";
  } else if (themeName === 'purple') {
    colors.primary = "270 100% 60%";
    colors.primaryDark = "270 100% 50%";
    colors.primaryLight = "270 100% 70%";
    colors.accent = "270 100% 65%";
    colors.accentDark = "270 85% 35%";
    colors.accentLight = "270 100% 75%";
  } else if (themeName === 'green') {
    colors.primary = "142 76% 36%";
    colors.primaryDark = "142 76% 26%";
    colors.primaryLight = "142 76% 46%";
    colors.accent = "142 86% 46%";
    colors.accentDark = "142 66% 26%";
    colors.accentLight = "142 86% 56%";
  }

  let css = `/* 
 * Theme Configuration CSS Variables
 * Current theme: ${themeName}
 * Change theme in src/lib/theme-config.ts
 */

:root {
  --background: ${colors.background};
  --card: ${colors.card};
  --foreground: ${colors.foreground};
  --muted: ${colors.muted};
  --border: ${colors.border};
  --primary: ${colors.primary};
  --primary-dark: ${colors.primaryDark};
  --primary-light: ${colors.primaryLight};
  --accent: ${colors.accent};
  --accent-dark: ${colors.accentDark};
  --accent-light: ${colors.accentLight};
  --destructive: ${colors.destructive};
  --success: ${colors.success};
  --warning: ${colors.warning};
  --brand-blue: ${colors.brandBlue};
  --gold: ${colors.gold};
  --gold-dark: ${colors.goldDark};
  --gold-light: ${colors.goldLight};
  
  /* Gradients */
  --gradient-gold: linear-gradient(135deg, hsl(${colors.primary}) 0%, hsl(${colors.accentDark}) 100%);
  --gradient-dark: linear-gradient(180deg, hsl(${colors.accentDark}) 15%, hsl(${colors.accentDark}) 20% 100%);
  
  /* Shadows */
  --shadow-gold: 0 10px 40px -10px hsl(${colors.primary}) / 0.3;
  --shadow-gold-lg: 0 25px 80px -20px hsl(${colors.primary}) / 0.4;
  --shadow-elegant: 0 20px 60px -15px hsl(${colors.accentDark}) / 0.3;
  --shadow-brutal: 8px 8px 0px hsl(${colors.primary});
}
`;

  return css;
}

// Generate the CSS file
const css = generateCSS(currentTheme);
const outputPath = path.join(__dirname, '../src/lib/theme-config.css');
fs.writeFileSync(outputPath, css);

console.log(`✅ Generated theme CSS for theme: ${currentTheme}`);
console.log(`📁 Output: ${outputPath}`);
console.log('\n🎨 Available themes:');
console.log('  - blue (current)');
console.log('  - gold');
console.log('  - purple');
console.log('  - green');
console.log('\n💡 To change theme, edit currentTheme in src/lib/theme-config.ts');
