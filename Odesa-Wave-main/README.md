<img width="1920" height="957" alt="Main" src="https://github.com/user-attachments/assets/95651f92-664f-4dd6-be05-5b34622765da" />
# Odesa Wave

A modern transportation and city services application for Odesa, Ukraine. Built with React Native (Expo) frontend and FastAPI backend.

## Features

- **Multi-modal transport integration**: Real-time bus tracking, route planning, GTFS data
- **City services**: Emergency alerts, utility payments, municipal services access
- **Payment integration**: LiqPay, Monobank, Google/Apple Pay for tickets and services
- **Government API integration**: Diia, BankID, Trembita for secure identification and services
- **Environmental data**: Marine conditions, air quality, eco-friendly route options
- **Multi-city support**: Scalable architecture for expanding to other Ukrainian cities
- **AI-powered features**: Predictive arrival times, personalized recommendations, anomaly detection

## Architecture

### Frontend
- React Native with Expo for cross-platform mobile apps
- TypeScript for type safety
- Expo Router for file-based navigation
- React Native Web for responsive web version
- Context API for state management (Auth, Theme)

### Backend
- FastAPI for high-performance API endpoints
- Python 3.9+ with async support
- MongoDB for flexible data storage
- Docker containerization ready
- RESTful API with automatic Swagger documentation

## Screenshots

<img width="1920" height="957" alt="Main" src="https://github.com/user-attachments/assets/c3c442f2-6f28-4fda-ad58-2590c733664a" />

## Installation

### Prerequisites
- Node.js >= 16
- Python >= 3.9
- Yarn package manager
- MongoDB (optional for demo mode)

### Frontend Setup
```bash
cd frontend
yarn install
yarn start   # or: expo start --web
```

### Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # Unix/MacOS
pip install -r requirements.txt
python run.py
```

## Usage

1. Start the backend server: `cd backend && python run.py`
2. Start the frontend: `cd frontend && yarn start`
3. Visit http://localhost:8081 for web version or scan QR code with Expo Go app
4. API documentation available at http://localhost:8001/docs

## Environment Variables

Create `.env` file in backend directory:

```env
MONGO_URL=mongodb://localhost:27017/odesawave
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## API Endpoints

- `GET /` - Health check
- `GET /docs` - Interactive API documentation (Swagger)
- `GET /redoc` - Alternative API documentation
- `/api/v1/*` - Versioned API endpoints

## Development

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
yarn test
```

### Code Style
- Backend: Black formatter, Flake8 linting
- Frontend: ESLint with React Native rules, Prettier

## Deployment

### Docker
```bash
docker-compose up --build
```

### Manual Deployment
1. Build frontend: `expo export:web`
2. Deploy backend to any Python-compatible server (Heroku, AWS, DigitalOcean)
3. Configure reverse proxy for serving static frontend files

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/yourusername/odesa-wave](https://github.com/yourusername/odesa-wave)

## Acknowledgments

- Expo team for amazing developer experience
- FastAPI creators for high-performance Python APIs
- Ukrainian open data providers (data.gov.ua, Diia, Trembita)
- OpenStreetMap and GTFS contributors
- All contributors to the Odesa Wave project

---
*Go Odesa! 🌊*
