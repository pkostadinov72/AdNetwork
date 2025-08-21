# AdNetwork

A modern social network platform built with microservices architecture, featuring user authentication, post management, real-time search, and asset handling.

## 🌟 Features

- **User Management**: Registration, authentication, and profile management with role-based access (Regular, Advertiser, Admin)
- **Social Posts**: Create, edit, delete posts with image/media support
- **Engagement**: Like and comment on posts with real-time updates
- **Search**: Real-time search functionality powered by Typesense
- **Asset Management**: Image and media upload/management with ImageKit integration
- **Responsive Design**: Modern, mobile-first UI built with React and Tailwind CSS
- **Real-time Updates**: Event-driven architecture with RabbitMQ messaging

## 🏗️ Architecture

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **React Hook Form** with Yup validation

### Backend - Microservices

The backend consists of 5 microservices:

1. **API Gateway** (`port 3001`)

   - Central entry point for all client requests
   - Authentication middleware
   - Request routing and proxy

2. **User Service** (`port 3002`)

   - User registration and authentication
   - Profile management
   - JWT token handling
   - Redis for session management

3. **Post Service** (`port 3003`)

   - Post CRUD operations
   - Comments and likes management
   - Event publishing for real-time updates

4. **Asset Service** (`port 3004`)

   - File upload and management
   - ImageKit integration
   - Asset ownership and permissions

5. **Search Service** (`port 3005`)
   - Real-time search functionality
   - Typesense integration
   - Event-driven data indexing

### Infrastructure

- **PostgreSQL** - Separate databases for each service
- **Redis** - Caching and session management
- **RabbitMQ** - Message queue for inter-service communication
- **Typesense** - Search engine for real-time search
- **Docker** - Containerization and orchestration

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22.x or later
- **Docker** and **Docker Compose**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pkostadinov72/AdNetwork.git
   cd AdNetwork
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database Configuration
   POSTGRES_USER_DB=user_db
   POSTGRES_USER=postgres
   POSTGRES_USER_PASSWORD=password123

   POSTGRES_POST_DB=post_db
   POSTGRES_POST_USER=postgres
   POSTGRES_POST_PASSWORD=password123

   POSTGRES_ASSET_DB=asset_db
   POSTGRES_ASSET_USER=postgres
   POSTGRES_ASSET_PASSWORD=password123

   # Service Ports
   API_GATEWAY_PORT=3001
   USER_SERVICE_PORT=3002
   POST_SERVICE_PORT=3003
   ASSET_SERVICE_PORT=3004
   SEARCH_SERVICE_PORT=3005

   # Service URLs (for development)
   USER_SERVICE_URL=http://user-service:3002
   POST_SERVICE_URL=http://post-service:3003
   ASSET_SERVICE_URL=http://asset-service:3004
   SEARCH_SERVICE_URL=http://search-service:3005

   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-here

   # Message Queue
   RABBITMQ_USER=admin
   RABBITMQ_PASSWORD=password123

   # Search Engine
   TYPESENSE_API_KEY=your-typesense-api-key

   # External Services
   IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
   IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
   IMAGEKIT_URL_ENDPOINT=your-imagekit-url-endpoint
   ```

3. **Start the Backend Services**

   ```bash
   # Start all services with Docker Compose
   docker-compose up -d

   # Check service status
   docker-compose ps
   ```

4. **Start the Frontend**

   ```bash
   cd client
   npm install
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - API Gateway: http://localhost:3001
   - RabbitMQ Management: http://localhost:15672 (admin/password123)

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID

### Post Endpoints

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Toggle like on post
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

### Asset Endpoints

- `POST /api/assets/upload` - Upload file
- `GET /api/assets/:id` - Get asset details
- `DELETE /api/assets/:id` - Delete asset

### Search Endpoints

- `GET /api/search?q=query` - Search posts and users

## 🛠️ Development

### Running Individual Services

**Backend Services:**

```bash
# Install dependencies for all services
npm install --workspaces

# Run specific service
cd services/user-service
npm run dev
```

**Frontend:**

```bash
cd client
npm run dev
```

### Testing

```bash
# Run tests for services that have them
cd services/user-service
npm test

cd services/post-service
npm test
```

### Linting and Formatting

```bash
# Backend services
cd services/[service-name]
npm run lint
npm run format

# Frontend
cd client
npm run lint
```

## 🔧 Configuration

### Database Migrations

Each service handles its own database schema. The services will automatically create tables on startup.

### Environment Variables

See `.env.example` for all required environment variables. Make sure to update the ImageKit credentials for asset upload functionality.

### Docker Configuration

The `docker-compose.yaml` file defines all services and their dependencies. Services will automatically restart on failure and wait for their dependencies to be ready.

## 📁 Project Structure

```
AdNetwork/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── views/          # Page components
│   │   ├── services/       # API service definitions
│   │   ├── store/          # Redux store and slices
│   │   └── types/          # TypeScript type definitions
│   └── ...
├── services/               # Backend microservices
│   ├── api-gateway/        # API Gateway service
│   ├── user-service/       # User management service
│   ├── post-service/       # Post management service
│   ├── asset-service/      # Asset management service
│   ├── search-service/     # Search functionality service
│   └── shared/             # Shared configurations
├── .github/                # GitHub Actions CI/CD
├── docker-compose.yaml     # Docker orchestration
└── README.md
```

## 🚀 Deployment

The project includes GitHub Actions for CI/CD:

- Linting and formatting checks
- Unit tests for services
- Automated builds on push/PR to main

For production deployment:

1. Update environment variables for production
2. Configure production databases
3. Set up proper SSL certificates
4. Configure load balancing for the API Gateway
5. Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write unit tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- [@pkostadinov72](https://github.com/pkostadinov72)

## 🙏 Acknowledgments

- React and Redux communities
- Microservices architecture patterns
- Docker and containerization best practices
- Modern web development tools and libraries
