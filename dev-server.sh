#!/bin/bash
# Development Server Management Script

PROJECT_DIR="/Users/joelhickey/Desktop/fresh-project"
PORT=3000

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if server is running
check_server() {
    if curl -s http://localhost:$PORT > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Server is running on http://localhost:$PORT${NC}"
        return 0
    else
        echo -e "${RED}❌ Server is not running${NC}"
        return 1
    fi
}

# Function to start server
start_server() {
    echo -e "${YELLOW}🚀 Starting development server...${NC}"
    cd "$PROJECT_DIR"
    
    # Kill any existing vite processes
    pkill -f vite 2>/dev/null
    
    # Start server in background
    nohup npm run dev > dev-server.log 2>&1 &
    
    # Wait a moment for server to start
    sleep 3
    
    # Check if server started successfully
    if check_server; then
        echo -e "${GREEN}🎉 Development server started successfully!${NC}"
        echo -e "${GREEN}📱 Open http://localhost:$PORT in your browser${NC}"
    else
        echo -e "${RED}❌ Failed to start server. Check dev-server.log for errors.${NC}"
    fi
}

# Function to stop server
stop_server() {
    echo -e "${YELLOW}🛑 Stopping development server...${NC}"
    pkill -f vite
    echo -e "${GREEN}✅ Server stopped${NC}"
}

# Function to restart server
restart_server() {
    echo -e "${YELLOW}🔄 Restarting development server...${NC}"
    stop_server
    sleep 2
    start_server
}

# Function to show server status
status_server() {
    echo -e "${YELLOW}📊 Server Status:${NC}"
    if check_server; then
        echo -e "${GREEN}Process info:${NC}"
        ps aux | grep vite | grep -v grep
    fi
}

# Function to show logs
show_logs() {
    if [ -f "$PROJECT_DIR/dev-server.log" ]; then
        echo -e "${YELLOW}📋 Recent server logs:${NC}"
        tail -20 "$PROJECT_DIR/dev-server.log"
    else
        echo -e "${RED}❌ No log file found${NC}"
    fi
}

# Main script logic
case "$1" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    restart)
        restart_server
        ;;
    status)
        status_server
        ;;
    logs)
        show_logs
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the development server"
        echo "  stop    - Stop the development server"
        echo "  restart - Restart the development server"
        echo "  status  - Check server status"
        echo "  logs    - Show recent server logs"
        ;;
esac
