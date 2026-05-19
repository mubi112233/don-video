# 🎨 Global Theme System

Your site now has a centralized color theme system! You can change colors across the entire site by editing just **one file**.

## 🚀 Quick Start

### Change Theme
1. Open `src/lib/theme-config.ts`
2. Find this line: `export const currentTheme = "blue"`
3. Change `"blue"` to any available theme:
   - `"blue"` - Blue SEO Agency (current)
   - `"gold"` - Gold Professional
   - `"purple"` - Purple Modern  
   - `"green"` - Green Fresh

4. Run: `npm run theme:generate`
5. Restart your dev server: `npm run dev`

### Create Custom Theme
1. Open `src/lib/theme-config.ts`
2. Add your theme to the `colorSchemes` object
3. Set your theme name in `currentTheme`
4. Run: `npm run theme:generate`

## 📁 File Structure

```
src/
├── lib/
│   ├── theme-config.ts      # ⭐ Main theme configuration
│   ├── theme-config.css     # Auto-generated CSS variables
│   └── design-system.ts    # Legacy system (can be ignored)
├── components/
│   └── ThemeSwitcher.tsx  # Theme switcher component
└── app/
    └── globals.css         # Uses generated CSS variables
```

## 🎯 Available Themes

### 🟦 Blue SEO Agency (Default)
- **Primary**: Bright blue (`220 100% 50%`)
- **Accent**: Dark blue (`220 85% 25%`)
- **Use Case**: Professional, corporate, tech

### 🟨 Gold Professional
- **Primary**: Gold (`45 80% 55%`)
- **Accent**: Light gold (`45 90% 65%`)
- **Use Case**: Premium, luxury, finance

### 🟪 Purple Modern
- **Primary**: Bright purple (`270 100% 60%`)
- **Accent**: Dark purple (`270 85% 35%`)
- **Use Case**: Creative, modern, apps

### 🟩 Green Fresh
- **Primary**: Fresh green (`142 76% 36%`)
- **Accent**: Light green (`142 86% 46%`)
- **Use Case**: Eco, health, nature

## 🛠️ Technical Details

### CSS Variables Generated
The system automatically generates these CSS variables:
- `--primary` - Main brand color
- `--primary-dark` - Darker variant
- `--primary-light` - Lighter variant
- `--accent` - Accent color
- `--background` - Page background
- `--foreground` - Text color
- `--muted` - Muted text
- `--border` - Border color
- `--destructive` - Error color
- `--success` - Success color
- `--warning` - Warning color

### Gradients & Shadows
- `--gradient-gold` - Main gradient
- `--gradient-dark` - Dark gradient
- `--shadow-gold` - Main shadow
- `--shadow-elegant` - Elegant shadow

## 🎨 Component Usage

All components automatically use the theme colors:
```tsx
// These will automatically use current theme colors
<button className="bg-primary text-primary-foreground">
  Primary Button
</button>

<div className="bg-card border-border">
  Card Component
</div>
```

## 🔧 Scripts

### Generate Theme
```bash
npm run theme:generate
```
Regenerates CSS variables from theme configuration.

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run theme:generate` - Generate theme CSS

## 💡 Tips

1. **Always run `theme:generate` after changing themes**
2. **Use HSL values** for best compatibility
3. **Test in both light and dark modes**
4. **Check contrast ratios** for accessibility
5. **Use semantic color names** (primary, accent, etc.)

## 🎭 Theme Switcher

The `ThemeSwitcher` component provides a visual way to switch themes:
```tsx
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Add to your layout
<ThemeSwitcher />
```

## 🔄 Migration from Old System

The old system used hardcoded CSS variables. The new system:
- ✅ Centralized in one file
- ✅ Multiple pre-built themes
- ✅ Easy theme switching
- ✅ Automatic CSS generation
- ✅ Type-safe configuration

## 🐛 Troubleshooting

### Theme not applying?
1. Run `npm run theme:generate`
2. Check `currentTheme` in `theme-config.ts`
3. Restart dev server
4. Check browser cache

### Build errors?
1. Ensure theme-config.css exists
2. Run `npm run theme:generate`
3. Check syntax in theme-config.ts

---

**🎉 Enjoy your new global theme system!**
