# Development Workflow Guide

## Quick Start Commands

### 1. Start Development Server
```bash
# Navigate to project directory
cd /Users/joelhickey/Desktop/fresh-project

# Start dev server (recommended method)
npm run dev

# Alternative: Use npx directly
npx vite --port 3000

# For persistent background running
nohup npm run dev > dev.log 2>&1 &
```

### 2. Check Server Status
```bash
# Check if server is running
curl -I http://localhost:3000

# Check running processes
ps aux | grep vite

# Check port usage
lsof -i :3000
```

### 3. Troubleshooting Commands
```bash
# Kill existing vite processes
pkill -f vite

# Clear npm cache if needed
npm cache clean --force

# Reinstall dependencies if corrupted
rm -rf node_modules package-lock.json
npm install
```

## Best Practices

### 1. Server Management
- Always run `npm run dev` from the project root directory
- Use `nohup` for background processes that need to persist
- Check server status before assuming it's running
- Keep a terminal window dedicated to the dev server

### 2. Development Workflow
- Start server first: `npm run dev`
- Open browser to `http://localhost:3000`
- Make changes to code
- Browser auto-reloads on changes
- Use browser dev tools for debugging

### 3. Project Structure
- Main app: `App.jsx`
- Components: `components/` folder
- Styles: `App.css`
- Configuration: `vite.config.js`

## Common Issues & Solutions

### Issue: "This site can't be reached"
**Solution:**
1. Check if server is running: `ps aux | grep vite`
2. Restart server: `npm run dev`
3. Verify port: `lsof -i :3000`

### Issue: Server keeps stopping
**Solution:**
1. Use `nohup` for background: `nohup npm run dev &`
2. Check for errors in terminal
3. Ensure you're in correct directory

### Issue: Dependencies missing
**Solution:**
1. `npm install` to install dependencies
2. If npm fails, try `yarn install`
3. Clear cache: `npm cache clean --force`

## Development Tips

1. **Always verify the working directory** before running commands
2. **Keep the dev server running** in a dedicated terminal
3. **Use browser dev tools** for debugging React components
4. **Save frequently** - hot reload works best with saved files
5. **Check console** for any JavaScript errors

## Project-Specific Notes

- Server runs on port 3000 (configured in `vite.config.js`)
- Uses React 19.1.1 with Vite 7.1.3
- Windows 95 aesthetic styling
- Mental health monitoring features
- Local storage for saving slider positions
