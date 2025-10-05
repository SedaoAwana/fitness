# Fitness Improvement App

A comprehensive fitness tracking and onboarding application built with React and Supabase that creates personalized user profiles and tracks fitness journeys.

## 🎯 What This App Does

This fitness app provides a complete user experience by:

- **Secure Authentication**: User registration and login with Supabase Auth
- **Comprehensive Onboarding**: Multi-step profile creation with personal information, physical stats, lifestyle, and fitness goals
- **Database Integration**: Persistent user profiles with Row Level Security (RLS)
- **Goal-Based Programming**: Supports 7 different fitness goals including lose fat, build muscle, increase strength, and more
- **Progress Tracking**: Foundation for workout logging and progress monitoring

## ✨ Features

- **🔐 Secure Authentication**: Supabase-powered user registration and login
- **📝 Multi-Step Onboarding**: 8-step guided profile creation process
- **💾 Database Persistence**: User profiles saved to Supabase with proper validation
- **🎯 Goal Customization**: 7 fitness goals including lose fat, build muscle, increase strength, improve endurance, maintain fitness, athletic performance, and rehabilitation
- **📱 Responsive Design**: Clean, modern UI with mobile-friendly interface
- **🛡️ Data Security**: Row Level Security (RLS) policies protect user data
- **🔧 Debug Tools**: Built-in debugging components for development
- **📊 Progress Foundation**: Ready for workout logging and progress tracking features

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## 📱 How to Use

### Step 1: Authentication
- **Sign Up**: Create a new account with email and password
- **Sign In**: Login with your existing credentials
- **Secure Access**: All data is protected with Supabase authentication

### Step 2: Onboarding Process
Complete the 8-step onboarding flow:

1. **Welcome**: Introduction to the fitness journey
2. **Basic Info**: Name, age, gender
3. **Physical Info**: Weight (kg), height (cm), body shape
4. **Lifestyle**: Work situation, eating habits, activity level
5. **Workout Preferences**: Location, frequency, duration, experience level, equipment
6. **Goals**: Choose from 7 fitness goals (lose fat, build muscle, increase strength, etc.)
7. **Photo**: Upload a progress photo
8. **Complete**: Review and save your profile

### Step 3: Dashboard Access
- **Profile Created**: Your comprehensive fitness profile is saved to the database
- **Dashboard Ready**: Access to the main application features
- **Progress Tracking**: Foundation for logging workouts and monitoring progress

## 🏋️ Supported Goals

- **Lose Fat**: Focus on fat loss and body composition
- **Build Muscle**: Muscle growth and hypertrophy training
- **Increase Strength**: Power and strength development
- **Improve Endurance**: Cardiovascular fitness and stamina
- **Maintain Fitness**: General health and wellness
- **Athletic Performance**: Sport-specific training
- **Rehabilitation**: Recovery and injury prevention

## 🏠 Workout Locations

- **Home**: Bodyweight exercises, minimal equipment
- **Home Gym**: Basic equipment workouts
- **Gym**: Full equipment access, comprehensive training

## 🛠️ Technology Stack

- **Frontend**: React.js with React Router
- **Backend**: Supabase (PostgreSQL database, Auth, RLS)
- **State Management**: React Context API and Hooks
- **Routing**: React Router with nested routes
- **Styling**: Inline CSS with design tokens
- **Authentication**: Supabase Auth with Row Level Security
- **Database**: PostgreSQL with custom constraints and validation

## 📁 Project Structure

```
fitness/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── atoms/           # Basic components (Button, Input, etc.)
│   │   ├── molecules/       # Composite components (AuthForm, etc.)
│   │   ├── organisms/       # Complex components (Navigation, etc.)
│   │   └── onboarding/      # Onboarding step components
│   ├── contexts/            # React Context providers
│   ├── pages/               # Main page components
│   ├── services/            # API and data services
│   ├── lib/                 # Utility libraries (Supabase client)
│   └── styles/              # Global styles and design tokens
├── public/                  # Static assets
├── README.md               # This file
└── LICENSE                  # Project license
```

## 🔧 Development

The app is built with a modular architecture:
- **Component-based**: Reusable atoms, molecules, and organisms
- **Context-driven**: Centralized state management with AuthContext
- **Service-oriented**: Separate services for authentication and data
- **Route-based**: Nested routing for onboarding flow
- **Database-integrated**: Supabase for authentication and data persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

## 🆘 Support

If you encounter any issues or have questions about the app, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information about your problem
3. Include steps to reproduce the issue

## 🚀 Future Features

- **Workout Logging**: Track exercises, sets, reps, and weights
- **Progress Photos**: Upload and compare progress over time
- **Analytics Dashboard**: Visualize fitness progress and trends
- **Social Features**: Share progress with friends and community
- **Expert Matching**: Connect with certified fitness professionals
- **Nutrition Tracking**: Log meals and track nutritional goals

## 🎯 Current Status

✅ **Authentication System** - Complete  
✅ **User Onboarding** - Complete  
✅ **Database Integration** - Complete  
✅ **Profile Management** - Complete  
🔄 **Workout Logging** - In Development  
🔄 **Progress Tracking** - Planned  
🔄 **Analytics Dashboard** - Planned  

---

**Start your fitness journey today with a personalized profile and comprehensive tracking system!** 💪
