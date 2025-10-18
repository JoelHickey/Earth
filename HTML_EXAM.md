# HTML & React Architecture Exam
## Earth Portfolio Project

**Name:** _________________
**Date:** _________________

---

### Section 1: HTML Basics (4 points)

**1.1** How many lines of HTML are in the `index.html` file?
- [ ] A) 500+ lines
- [ ] B) 100-200 lines
- [ ] C) 14 lines
- [ ] D) 1,000+ lines

**1.2** What is the purpose of `<div id="root"></div>` in this app?
- [ ] A) It's where the footer goes
- [ ] B) It's the mounting point for React to inject the entire app
- [ ] C) It's just for styling
- [ ] D) It's a navigation container

**1.3** What does `<script type="module" src="index.jsx"></script>` do?
- [ ] A) Loads a CSS file
- [ ] B) Loads the React application entry point
- [ ] C) Loads images
- [ ] D) Nothing, it's commented out

**1.4** What is the favicon (browser tab icon) for this app?
- [ ] A) Default browser icon
- [ ] B) Earth (8 colors).ico
- [ ] C) React logo
- [ ] D) Windows 95 logo

---

### Section 2: React vs Traditional HTML (6 points)

**2.1** In a traditional HTML website, where is the hotel booking card HTML written?

_______________________________________________________________________

**2.2** In this React app, where is the hotel booking card HTML created?

_______________________________________________________________________

**2.3** True or False: The HTML you see in the browser (when you "Inspect Element") is exactly what's written in index.html

- [ ] True
- [ ] False

**2.4** Explain in your own words: Why is index.html so short in a React app?

_______________________________________________________________________
_______________________________________________________________________
_______________________________________________________________________

**2.5** When you click "Room Upgrade" pill, what happens to the HTML in the browser?
- [ ] A) The page refreshes and loads new HTML from the server
- [ ] B) React updates only the changed parts of the DOM
- [ ] C) Nothing happens
- [ ] D) A new HTML file is loaded

**2.6** If this app was built the "old way" with traditional HTML, approximately how many lines would the HTML file be?
- [ ] A) 50-100 lines
- [ ] B) 500-1,000 lines
- [ ] C) 2,000-3,000 lines
- [ ] D) 100,000+ lines

---

### Section 3: Understanding the Flow (5 points)

**3.1** Number these steps in the correct order (1-5) of what happens when the app loads:

- [ ] React creates HTML elements in JavaScript
- [ ] Browser downloads index.html
- [ ] Browser runs index.jsx 
- [ ] React injects HTML into `<div id="root">`
- [ ] User sees the app on screen

**3.2** Where is the actual content like "Hilton Hawaiian Village" defined?
- [ ] A) In index.html
- [ ] B) In a CSS file
- [ ] C) In React component files (like TravelOldFlow.jsx)
- [ ] D) In a separate HTML file

**3.3** How many separate HTML files does this app use?
- [ ] A) 1 (index.html only)
- [ ] B) 5 (one per page)
- [ ] C) 20+ (one per component)
- [ ] D) 100+

**3.4** If you wanted to change the page title that appears in the browser tab, which file would you edit?

_______________________________________________________________________

**3.5** True or False: Every time you click a button in the app, the browser requests a new HTML file from the server.

- [ ] True
- [ ] False

---

### Section 4: Architecture Understanding (5 points)

**4.1** What is the main advantage of React's approach over traditional HTML?

_______________________________________________________________________
_______________________________________________________________________

**4.2** In the refactor branch, where is the calendar HTML code located?
- [ ] A) In index.html
- [ ] B) In TravelOldFlow.jsx (4,615 lines)
- [ ] C) In CalendarPicker.jsx (reusable component)
- [ ] D) In a separate HTML file

**4.3** What does "Single Page Application (SPA)" mean?

_______________________________________________________________________
_______________________________________________________________________

**4.4** If you inspect the browser and see 10,000 lines of HTML, but index.html only has 14 lines, where did the other 9,986 lines come from?

_______________________________________________________________________
_______________________________________________________________________

**4.5** Why did we create a refactor branch with components like `CalendarPicker.jsx` when the UI looks exactly the same?

_______________________________________________________________________
_______________________________________________________________________

---

### BONUS Question (2 points)

**B.1** Explain the "house analogy" for understanding how this app works:
- index.html = _______________
- React = _______________
- Components = _______________
- The browser = _______________

---

## Answer Key (For Self-Study)

<details>
<summary>Click to reveal answers</summary>

**Section 1:**
1.1: C
1.2: B  
1.3: B
1.4: B

**Section 2:**
2.1: Directly in the HTML file with all the markup
2.2: In React component files (TravelOldFlow.jsx) using JSX
2.3: False - Browser HTML is generated by React
2.4: Because React builds all the HTML in JavaScript and injects it into the root div
2.5: B
2.6: C

**Section 3:**
3.1: 2, 3, 1, 4, 5
3.2: C
3.3: A
3.4: index.html (line 6, the `<title>` tag)
3.5: False - It's a Single Page Application

**Section 4:**
4.1: Reusability, state management, only updates what changed, component composition
4.2: C
4.3: An app that loads once and updates content dynamically without page refreshes
4.4: Generated by React from your JSX/component code
4.5: To improve code maintainability, reusability, and scalability - refactoring improves structure, not UI

**Bonus:**
- index.html = Empty stage/foundation
- React = Theater company building the set
- Components = Individual props/actors/scenes
- The browser = The audience seeing the final show

</details>

---

**Scoring:**
- 18-20: Excellent understanding! 🌟
- 15-17: Good grasp of concepts ✅
- 12-14: Getting there, review React basics 📚
- Below 12: Review the explanations and try again 💪

