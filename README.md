# Fitness Improvement App

A personalized fitness program generator built with React that creates custom workout plans based on your individual profile and goals.

## 🎯 What This App Does

This fitness app helps you get started on your fitness journey by:

- **Personalized Assessment**: Collects your personal information including age, gender, weight, height, work situation, eating habits, and lifestyle
- **Goal-Based Programming**: Creates workout plans tailored to your specific fitness goals (lose fat, build muscle, or improve health)
- **Expert Recommendations**: Matches you with fitness experts based on your gender and preferred workout location
- **Customized Plans**: Generates workout recommendations that consider your available equipment and location preferences

## ✨ Features

- **Photo Upload**: Start by uploading or taking a photo to personalize your experience
- **Comprehensive Form**: Detailed questionnaire to understand your current fitness level and preferences
- **Smart Recommendations**: AI-powered program generation based on your inputs
- **Expert Matching**: Connects you with appropriate fitness experts for your situation
- **Progress Tracking Tips**: Provides guidance on how to track and maintain your progress

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

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

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 📱 How to Use

### Step 1: Photo Upload
- Upload a photo or take a new one using your device's camera
- This helps personalize your experience

### Step 2: Personal Information
Fill out the comprehensive form with:
- **Basic Info**: Name, age, gender
- **Physical Stats**: Weight (kg), height (cm)
- **Lifestyle**: Work situation, eating habits, activity level
- **Goals**: Choose between losing fat, building muscle, or improving health
- **Preferences**: Select your preferred workout location (home, home gym, or gym)

### Step 3: Get Your Program
- Receive a personalized fitness program
- Get matched with an appropriate fitness expert
- View customized workout recommendations
- Access progress tracking tips

## 🏋️ Supported Goals

- **Lose Fat**: HIIT workouts, full-body circuits, calorie deficit focus
- **Build Muscle**: Progressive overload, compound lifts, protein-focused nutrition
- **Improve Health**: Balanced cardio and resistance training, consistency focus

## 🏠 Workout Locations

- **Home**: Bodyweight exercises, minimal equipment
- **Home Gym**: Basic equipment workouts
- **Gym**: Full equipment access, comprehensive training

## 🛠️ Technology Stack

- **Frontend**: React.js
- **State Management**: React Hooks (useState)
- **Styling**: Inline CSS with responsive design
- **File Handling**: HTML5 File API for photo uploads

## 📁 Project Structure

```
fitness/
├── Intial          # Main React component file
├── README.md       # This file
└── LICENSE         # Project license
```

## 🔧 Development

The app is built as a single React component (`FitnessApp`) that manages:
- Multi-step form navigation
- Photo upload functionality
- Form data collection and validation
- Program generation logic
- Expert matching algorithms

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

---

**Start your fitness journey today with personalized recommendations tailored just for you!** 💪
