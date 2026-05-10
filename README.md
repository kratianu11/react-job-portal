# CareerConnect - Advanced React Job Portal

A modern, full-featured job portal built with React 18, featuring advanced search, saved jobs, drag-and-drop applications, and a professional UI. Designed for both job seekers and employers with responsive design and dark mode support.

## 🚀 Features

### For Job Seekers:
- **Smart Search & Filters**: Real-time search with category, location, and salary filters
- **Saved Jobs**: Save jobs locally for later review
- **Advanced Applications**: Drag-and-drop resume upload with multi-format support
- **Dashboard**: Personal dashboard with application tracking
- **Profile Management**: Update preferences and theme settings

### For Employers:
- **Post Jobs**: Create and manage job listings
- **Application Management**: View and manage job applications
- **My Jobs**: Track posted jobs and their status

### Technical Features:
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Theme toggle with localStorage persistence
- **Loading States**: Skeleton loaders and error handling
- **Authentication**: Protected routes with role-based access
- **Modern UI**: Clean, professional design with smooth animations

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios with centralized configuration
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/career-connect.git
   cd career-connect/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:4000/api/v1
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**:
   - Push your code to GitHub
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "New Project" and import your repository

2. **Configure Environment Variables**:
   ```env
   VITE_API_URL=https://your-backend-url.com/api/v1
   ```

3. **Deploy**:
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Backend Deployment (Render)

1. **Connect to Render**:
   - Go to [Render](https://render.com) and sign in
   - Click "New +" and select "Web Service"

2. **Configure Service**:
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables from your `.env` file

3. **Deploy**:
   - Click "Create Web Service"
   - Your API will be live at `https://your-service.onrender.com`

### Alternative Deployment Options

- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages**: Use `gh-pages` package for free hosting
- **Railway**: Similar to Render, supports Node.js apps
- **Heroku**: Traditional choice for Node.js deployments

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api/v1
```

### Backend (.env)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

## 📊 Performance Optimizations

- **Lazy Loading**: Components are loaded on-demand
- **Image Optimization**: Lazy loading for images with loading states
- **Code Splitting**: Automatic code splitting with Vite
- **Caching**: Service worker for caching static assets
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## 🧪 Testing Strategy

- **Unit Tests**: Component testing with Vitest and React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: End-to-end testing with Playwright (future enhancement)
- **Performance Tests**: Lighthouse CI for performance monitoring

## 🔒 Security Features

- JWT authentication with secure token handling
- Protected routes with role-based access
- Input validation and sanitization
- CORS configuration
- Rate limiting (backend)
- Secure headers (helmet.js)

## 📈 Monitoring & Analytics

- Error tracking with Sentry (recommended)
- Performance monitoring with Lighthouse
- User analytics with Google Analytics
- Server monitoring with PM2

## 🤝 Contributing Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Follow React best practices
- Use TypeScript for type safety (future enhancement)

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

---

**Built with ❤️ for the modern web**

   - Create a `config.env` file after creating a `config folder` in the backend directory, containing the following variables:

   ```env
   PORT=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   CLOUDINARY_CLOUD_NAME=
   FRONTEND_URL=
   DB_URL=
   JWT_SECRET_KEY=
   JWT_EXPIRE=
   COOKIE_EXPIRE=
   ```

   Replace each value with your specific configuration details.

5. Run the application backend (make sure you are in `/backend` directory) :

   ```sh
   node server.js
   ```

6. Run the application frontend (make sure you are in `/frontend` directory) :
   ```sh
   npm run dev
   ```
7. Open your browser and navigate to `http://localhost:5173` to view the app.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request (`we will merge within 24 hour`)

## Please give a star ⭐ to the repository if you like it.

## Contact

Abhishek Rajput - [GitHub](https://github.com/exclusiveabhi)

Project Link: [https://github.com/exclusiveabhi/react-job-portal.git](https://github.com/exclusiveabhi/react-job-portal.git)
