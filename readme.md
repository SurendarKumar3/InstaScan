# InstaScan - Smart Product Scanner

## Overview

InstaScan is a web-based application that allows users to scan and analyze various products including medicines, food items, and cosmetics. Using advanced image recognition and AI technology, it provides detailed information about products instantly through your device's camera or uploaded images.

## Features

### 1. Multi-Product Scanning

- **Medicine Scanning**: Get detailed information about medications, including:

  - Active ingredients
  - Usage instructions
  - Side effects
  - Drug interactions
  - Expiration alerts

- **Food Product Analysis**: Scan food items to receive:

  - Nutritional information
  - Ingredient lists
  - Allergen warnings
  - Dietary compatibility

- **Cosmetics Information**: Analyze beauty and personal care products for:
  - Ingredient breakdown
  - Skin compatibility
  - Allergen detection
  - Product recommendations

### 2. Smart AI Chatbot

- **Personalized Consultations**: Chat with our AI assistant for personalized advice on:
  
  - Food & Nutrition advice
  - Cosmetics & Beauty recommendations
  - Medicine & Health information
  - Fitness & Wellness guidance
  
- **Targeted Expertise**: Switch between specialized domains for more focused assistance
- **Personalized Calorie and Workout Guidance**: Get customized recommendations for:
  
  - Daily calorie requirements
  - Macronutrient distributions
  - Workout plans and routines
  - Nutritional tips for fitness goals

### 3. User-Friendly Interface

- Clean, modern design using Tailwind CSS
- Responsive layout for both mobile and desktop devices
- Intuitive navigation and scanning process
- Real-time results display

### 4. Multiple Input Methods

- Direct camera capture
- Image upload from device
- URL-based image input
- Mobile-optimized camera interface

### 5. Multilingual Support

- Built-in language translation support
- Available in multiple Indian languages:
  - Kannada (ಕನ್ನಡ)
  - Telugu (తెలుగు)
  - Tamil (தமிழ்)
  - Malayalam (മലയാളം)
  - English

## Technical Implementation

### Frontend Technologies

- HTML5
- CSS3 with Tailwind CSS
- JavaScript (Vanilla)
- Google Translate API integration

### Backend Technologies

- Node.js with Express
- Google's Generative AI (Gemini)
- Advanced prompt engineering

### Key Components

1. **Main Interface (index.html)**

   - Product category selection
   - Image capture/upload functionality
   - Language switching

2. **Chatbot Interface (chatbot.html)**
   
   - Category selection for specialized advice
   - Interactive chat interface
   - Domain-specific expert responses

3. **Results Pages**

   - Dedicated pages for each product type (medicine.html, food.html, cosmetics.html)
   - Dynamic card generation based on scan results
   - Responsive grid layout

4. **Styling**
   - Custom animations
   - Mobile-first design
   - Consistent theme across pages

## Installation and Setup

1. Clone the repository
```
git clone https://github.com/yourusername/instascan.git
cd instascan
```

2. Set up the server
```
cd server
npm install
```

3. Configure environment variables
   - Create or edit the `.env` file in the server directory
   - Add your Google API key: `GOOGLE_API_KEY=your_api_key_here`
   - Set the environment: `NODE_ENV=development`

4. Start the development server
```
npm run dev
```

5. Open the application in your browser at `http://localhost:3000`

## Usage Guide

### Product Scanning
1. Open the InstaScan homepage
2. Select the product type (Food, Medicine, or Cosmetics)
3. Upload an image or capture using your camera
4. View the detailed analysis results

### Chatbot Assistant
1. Navigate to the Chatbot page from the navigation menu
2. Select a category of expertise (Food, Cosmetics, Medicine, or Fitness)
3. Type your question in the chat input
4. Receive specialized advice based on your selected domain

## Dependencies

- Express.js: Web server framework
- Google Generative AI API: Powers the AI analysis and chatbot
- Tailwind CSS: Styling framework
- Nodemon (dev): Auto-restart for development

## Future Scope

- Barcode scanning integration
- Expanded product database
- Personalized recommendations
- Shopping integration
- Community features and reviews
- Enhanced AI capabilities

## Note

This project requires an active internet connection for optimal functionality, including translation services and image processing.

---

© 2023 InstaScan. All rights reserved.
