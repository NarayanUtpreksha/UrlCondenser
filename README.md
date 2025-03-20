# UrlCondenser

A **URL shortening service** built using **Java Spring Boot, React, Redis, and Nginx**, deployed on **AWS EC2** with Docker for containerization.

## Features
- Shorten long URLs into a compact format.
- Redirect shortened URLs to the original destination.
- Store and retrieve URL mappings efficiently using Redis.
- Deployed using AWS EC2, with Nginx acting as a reverse proxy.

---

## Tech Stack
### **Backend:**
- **Spring Boot (Java)** - REST API for URL shortening & redirection.
- **Redis** - Fast key-value storage for mapping short URLs to original URLs.
- **Docker** - Containerized Redis instance.

### **Frontend:**
- **React (TypeScript, Class-Based Components)** - UI for submitting and retrieving shortened URLs.

### **Deployment:**
- **AWS EC2** - Hosting both frontend & backend.
- **Nginx** - Reverse proxy to route frontend and API calls.

---

## 📂 Project Structure
```
├── backend/                  # Spring Boot backend
│   ├── src/main/java/...      # Java source code
│   ├── Dockerfile             # Docker setup for backend
│   ├── application.properties # Backend config (Redis, DB, etc.)
│   └── pom.xml                # Maven dependencies
│
├── frontend/                 # React frontend
│   ├── src/                   # React components
│   ├── .env                   # Backend API URL config
│   ├── package.json           # Frontend dependencies
│   └── Dockerfile             # Docker setup for frontend
│
├── nginx/                     # Nginx config
│   └── default.conf            # Reverse proxy settings
│
└── docker-compose.yml         # Docker setup for Redis
```

---

## Setup & Installation

### 1 **Clone the Repository**
```bash
git clone git@github.com:NarayanUtpreksha/UrlCondenser.git
```

### 2 **Backend Setup** (Spring Boot + Redis)
#### **Run Redis using Docker**
```bash
docker run -d --name redis-container -p 6379:6379 redis
```
#### **Run Spring Boot Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
> The backend will run on `http://localhost:8080`

---

### 3 **Frontend Setup** (React)
```bash
cd frontend
npm install
npm start
```
> The frontend will run on `http://localhost:3000`

---

##  Deployment on AWS EC2

### **1 Install Dependencies**
```bash
sudo apt update && sudo apt install -y docker docker-compose nginx
```

### **2 Start Backend on EC2**
```bash
cd backend
mvn clean package
java -jar target/condenser.jar &
```

### **3 Start Frontend on EC2**
```bash
cd frontend
npm run build
cp -r build /var/www/html/
```

### **4 Configure Nginx**
Edit `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name 51.20.26.2;  # Elastic IP or domain

    # Serve React frontend
    location / {
        root /var/www/shrinkker;  # Path where React build files are stored
        index index.html;
        try_files $uri /index.html;
    }

    # Proxy API requests to backend (e.g., /api/shorten)
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

         # Fix CORS issues (only if needed)
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "Origin, Authorization, Content-Type, Accept";

        # Handle OPTIONS requests for CORS
        if ($request_method = OPTIONS) {
            return 204;
        }
    }

    # Handle short URLs (UUIDs) by forwarding them to backend
    location ~ ^/([a-zA-Z0-9_-]+)$ {
        proxy_pass http://localhost:8080/api/$1;  # Pass UUID to backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page 404 /index.html;  # Ensure React handles client-side routing

}
```
Reload Nginx:
```bash
sudo systemctl restart nginx
```

---

##  Usage
- Visit `http://51.20.26.2/` → Frontend UI.
- Shorten a URL using the form.
- Access `http://51.20.26.2/<short-id>` → Redirects to original URL.

---

##  Future Enhancements
- **User Authentication** for managing shortened URLs.
- **Analytics Dashboard** for tracking usage.
- **Custom Aliases** for better branding.


**Deployed at:** [http://51.20.26.2](http://51.20.26.2)

