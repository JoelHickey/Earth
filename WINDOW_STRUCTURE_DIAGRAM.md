# Windows 95 Mental Health Monitor - Window Structure Diagram

## 📐 Overall Window Dimensions
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MAIN WINDOW                                    │
│                              Width: 700px                                   │
│                              Height: fit-content                            │
│                              Border: 2px outset #c0c0c0                    │
│                              Background: #d4d0c8                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🎨 Complete Component Breakdown

### 1. HEADER COMPONENT
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🌍 Earth                    [✕]                                            │
│                                                                             │
│ Background: linear-gradient(90deg, #000080 0%, #1084d0 100%)               │
│ Padding: 4px                                                                │
│ Font: 12px bold, MS Sans Serif                                              │
│ Border: 1px solid #808080 (bottom only)                                    │
│ Height: ~24px (4px + 16px icon + 4px)                                      │
│                                                                             │
│ Icon: 16x16px Earth.ico                                                     │
│ Close Button: 20x18px, 12px bold "✕"                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2. TOOLBAR COMPONENT
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [🔌] [📊] [🌳] [📝] | Output: [███████████████████████████████████████████] │
│                                                                             │
│ Background: #d4d0c8                                                        │
│ Padding: 4px                                                                │
│ Border: 1px solid #808080 (bottom), 1px solid #ffffff (top)                │
│ Gap between buttons: 2px                                                   │
│ Height: ~36px (4px + 28px button + 4px)                                    │
│                                                                             │
│ Buttons: 36x28px each                                                      │
│   - Border: 2px outset #c0c0c0 (normal) / 2px inset #c0c0c0 (active)       │
│   - Icons: 16x16px                                                         │
│   - Font: 10px, MS Sans Serif                                              │
│                                                                             │
│ Separator: 1px width, 20px height, #808080, margin-left: 8px               │
│                                                                             │
│ Output Label: "Output:", 10px, MS Sans Serif, margin-left: 8px             │
│ Output Bar: flex: 1, height: 24px, padding: 0 8px, 10px font               │
│ Gap between label and bar: 2px                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3. HORIZONTAL SEPARATOR
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ████████████████████████████████████████████████████████████████████████████ │
│                                                                             │
│ Height: 1px                                                                 │
│ Background: #808080                                                         │
│ Margin: 0 4px                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4. MAIN CONTENT AREA
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│ Background: #d4d0c8                                                        │
│ Padding: 4px                                                                │
│ Min Height: 300px                                                           │
│ Width: 100%                                                                 │
│                                                                             │
│ Content Padding: 8px                                                        │
│ Content Height: 300px                                                       │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                         │ │
│ │  SLIDER ROW (for Inputs/Emotions views)                                │ │
│ │  Display: flex, gap: 2px, min-height: 220px                            │ │
│ │                                                                         │ │
│ │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │ │
│ │  │ 🔌 │ │ 📊 │ │ 🌳 │ │ 📝 │ │ 🔌 │ │ 📊 │ │ 🌳 │ │ 📝 │ │ 🔌 │ │ │ │
│ │  │     │ │     │ │     │ │     │ │     │ │     │ │     │ │     │ │     │ │ │
│ │  │ 200 │ │ 200 │ │ 200 │ │ 200 │ │ 200 │ │ 200 │ │ 200 │ │ 200 │ │ 200 │ │ │
│ │  │ px  │ │ px  │ │ px  │ │ px  │ │ px  │ │ px  │ │ px  │ │ px  │ │ px  │ │ │
│ │  │     │ │     │ │     │ │     │ │     │ │     │ │     │ │     │ │     │ │ │
│ │  │ [0] │ │ [0] │ │ [0] │ │ [0] │ │ [0] │ │ [0] │ │ [0] │ │ [0] │ │ [0] │ │ │
│ │  │     │ │     │ │     │ │     │ │     │ │     │ │     │ │     │ │     │ │ │
│ │  │Label│ │Label│ │Label│ │Label│ │Label│ │Label│ │Label│ │Label│ │Label│ │ │
│ │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  CHECKBOX GRID (for Environment view)                                      │
│  Display: grid, grid-template-columns: repeat(3, 1fr), gap: 8px            │
│  Padding: 8px                                                               │
│                                                                             │
│  TIMELINE (for Timeline view)                                               │
│  Background: #d4d0c8, padding: 8px, width: 100%, height: 100%              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5. STATUS BAR COMPONENT
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Ready                                                      Neural link ●   │
│                                                                             │
│ Background: #d4d0c8                                                        │
│ Border: 1px solid #ffffff (top only)                                       │
│ Padding: 2px 8px                                                           │
│ Font: 10px, MS Sans Serif                                                  │
│ Height: ~14px (2px + 10px + 2px)                                          │
│                                                                             │
│ Neural Link Indicator: 8x8px circle                                        │
│   - Border: 1px solid #808080                                              │
│   - Gradient: radial-gradient with multiple color stops                    │
│   - Box-shadow: inset effects + glow                                       │
│ Gap between text and indicator: 8px                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🔧 Individual Slider Component Details

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SLIDER COMPONENT                               │
│                              Width: 65px                                    │
│                              Gap: 2px                                       │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                         │ │
│ │  ┌─┐                                                                    │ │
│ │  │ │  ← Slider Track: 4px width, 200px height                           │ │
│ │  │ │     Background: #808080                                            │ │
│ │  │ │     Border: 1px inset #c0c0c0                                     │ │
│ │  │ │     Box-shadow: inset effects                                      │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  │ │                                                                    │ │
│ │  └─┘                                                                    │ │
│ │                                                                         │ │
│ │  ┌─────────┐                                                            │ │
│ │  │   [0]   │  ← Input Field: 20x16px                                    │ │
│ │  └─────────┘     Font: 10px, MS Sans Serif                              │ │
│ │                  Border: 2px inset #c0c0c0                              │ │
│ │                  Padding: 0 2px                                          │ │
│ │                  Margin-top: 16px                                        │ │
│ │                                                                         │ │
│ │  ┌─────────┐                                                            │ │
│ │  │  Label  │  ← Label: 10px, MS Sans Serif                              │ │
│ │  └─────────┘     Text-align: center                                      │ │
│ │                  Margin-top: 4px                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  Slider Thumb: 20x20px                                                     │
│    - Background: #d4d0c8                                                   │
│    - Border: 2px outset #c0c0c0                                            │
│    - Position: absolute, left: -10px                                       │
│    - Top: calculated based on value (calc(100% - (value/10)*100% - 10px))  │
│    - Box-shadow: inset effects                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📊 Typography Summary

| Element | Font Size | Font Family | Weight | Color |
|---------|-----------|-------------|--------|-------|
| Header Title | 12px | MS Sans Serif | Bold | #ffffff |
| Close Button | 12px | MS Sans Serif | Bold | #000000 |
| Toolbar Buttons | 10px | MS Sans Serif | Normal | #000000 |
| Output Label | 10px | MS Sans Serif | Normal | #000000 |
| Output Value | 10px | MS Sans Serif | Normal | #000000 |
| Status Bar | 10px | MS Sans Serif | Normal | #000000 |
| Slider Labels | 10px | MS Sans Serif | Normal | #000000 |
| Slider Inputs | 10px | MS Sans Serif | Normal | #000000 |

## 🎨 Color Palette

| Element | Background | Border | Text |
|---------|------------|--------|------|
| Main Window | #d4d0c8 | #c0c0c0 (outset) | - |
| Header | Gradient (#000080 → #1084d0) | #808080 (bottom) | #ffffff |
| Toolbar | #d4d0c8 | #808080 (bottom), #ffffff (top) | #000000 |
| Buttons | #d4d0c8 | #c0c0c0 (outset/inset) | #000000 |
| Output Bar | #ffffff | #c0c0c0 (inset) | #000000 |
| Main Content | #d4d0c8 | - | #000000 |
| Status Bar | #d4d0c8 | #ffffff (top) | #000000 |
| Slider Track | #808080 | #c0c0c0 (inset) | - |
| Slider Thumb | #d4d0c8 | #c0c0c0 (outset) | - |
| Slider Input | #ffffff | #c0c0c0 (inset) | #000000 |

## 📏 Spacing Summary

| Element | Padding | Margin | Gap |
|---------|---------|--------|-----|
| Main Window | 0 | - | - |
| Header | 4px | - | 4px (icon gap) |
| Toolbar | 4px | - | 2px (button gap), 2px (label-bar gap) |
| Main Content | 4px | - | - |
| Content Views | 8px | - | - |
| Slider Row | - | - | 2px |
| Status Bar | 2px 8px | - | 8px (text-indicator gap) |
| Slider Component | - | - | 2px |
| Slider Input | 0 2px | 16px top | - |
| Slider Label | - | 4px top | - |

## 🔄 Total Window Height Calculation

```
Header:           ~24px (4px + 16px + 4px)
Toolbar:          ~36px (4px + 28px + 4px)
Separator:        1px
Main Content:     300px (min-height)
Status Bar:       ~14px (2px + 10px + 2px)
Main Window Border: 4px (2px top + 2px bottom)

TOTAL:            ~379px minimum
```

This structure maintains perfect Windows 95 authenticity while providing a clean, modular architecture for adding business logic.
