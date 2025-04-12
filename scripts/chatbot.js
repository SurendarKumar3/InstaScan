// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');
const currentTopic = document.getElementById('current-topic');

// Category buttons
const foodBtn = document.getElementById('food-btn');
const cosmeticsBtn = document.getElementById('cosmetics-btn');
const medicineBtn = document.getElementById('medicine-btn');
const fitnessBtn = document.getElementById('fitness-btn');

// Current selected category
let currentCategory = 'general';

// Add event listeners to category buttons
foodBtn.addEventListener('click', () => setCategory('food', 'Food & Nutrition'));
cosmeticsBtn.addEventListener('click', () => setCategory('cosmetics', 'Cosmetics & Beauty'));
medicineBtn.addEventListener('click', () => setCategory('medicine', 'Medicine & Health'));
fitnessBtn.addEventListener('click', () => setCategory('fitness', 'Fitness & Wellness'));

// Function to set the current category
function setCategory(category, displayName) {
  // Reset active class on all buttons
  const allButtons = [foodBtn, cosmeticsBtn, medicineBtn, fitnessBtn];
  allButtons.forEach(btn => btn.classList.remove('active-category'));
  
  // Set active class on the selected button
  document.getElementById(`${category}-btn`).classList.add('active-category');
  
  // Update current category
  currentCategory = category;
  currentTopic.textContent = displayName;
  
  // Add a system message about the change
  addBotMessage(`I've switched to ${displayName} mode. How can I help you with ${displayName.toLowerCase()} today?`);
  
  // Animate category change
  animateCategoryChange(category);
  
  // Update quick response buttons based on category
  updateQuickResponses(category);
}

// Function to animate category change
function animateCategoryChange(category) {
  // Define colors for different categories
  const colors = {
    'food': '#10b981', // green
    'cosmetics': '#ec4899', // pink
    'medicine': '#f59e0b', // amber
    'fitness': '#3b82f6', // blue
    'general': '#6366f1' // indigo
  };
  
  // Change color theme
  const color = colors[category] || colors.general;
  document.documentElement.style.setProperty('--theme-color', color);
  
  // Subtle flash animation
  const flash = document.createElement('div');
  flash.className = 'category-flash';
  flash.style.backgroundColor = color;
  document.body.appendChild(flash);
  
  setTimeout(() => {
    flash.style.opacity = '0.1';
    setTimeout(() => {
      document.body.removeChild(flash);
    }, 300);
  }, 50);
}

// Function to add a user message to the chat
function addUserMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'flex items-start user-message opacity-0'; // Start with opacity 0
  messageDiv.innerHTML = `
    <div class="rounded-lg p-4 max-w-[80%]">
      <p class="text-white font-medium">${message}</p>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  
  // Animate the message appearing
  setTimeout(() => {
    messageDiv.classList.add('message-appear');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 50);
}

// Function to add a bot message to the chat
function addBotMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'flex items-start bot-message opacity-0'; // Start with opacity 0
  messageDiv.innerHTML = `
    <div class="bg-white rounded-lg p-4 max-w-[80%] message-bubble shadow-sm">
      <div class="flex items-center mb-3">
        <img src="https://cdn-icons-png.flaticon.com/512/2481/2481929.png" alt="InstaScan" class="w-8 h-8 mr-2 bubble-avatar" />
        <span class="text-blue-600 font-semibold">InstaScan Assistant</span>
      </div>
      <div class="text-black font-medium">${message}</div>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  
  // Animate the message appearing
  setTimeout(() => {
    messageDiv.classList.add('message-appear');
    
    // Add 3D hover effect to the message bubble
    const bubble = messageDiv.querySelector('.message-bubble');
    if (bubble) {
      bubble.addEventListener('mousemove', handleBubbleMouseMove);
      bubble.addEventListener('mouseleave', handleBubbleMouseLeave);
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 50);
}

// 3D effect for message bubbles
function handleBubbleMouseMove(e) {
  const bubble = e.currentTarget;
  const { left, top, width, height } = bubble.getBoundingClientRect();
  const x = (e.clientX - left) / width - 0.5;
  const y = (e.clientY - top) / height - 0.5;
  
  bubble.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 5}deg) scale3d(1.02, 1.02, 1.02)`;
  
  // Move avatar slightly for parallax effect
  const avatar = bubble.querySelector('.bubble-avatar');
  if (avatar) {
    avatar.style.transform = `translateX(${x * 5}px) translateY(${y * 5}px)`;
  }
}

function handleBubbleMouseLeave(e) {
  const bubble = e.currentTarget;
  bubble.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  
  // Reset avatar position
  const avatar = bubble.querySelector('.bubble-avatar');
  if (avatar) {
    avatar.style.transform = 'translateX(0) translateY(0)';
  }
}

// Function to show typing indicator
function showTypingIndicator() {
  const indicatorDiv = document.createElement('div');
  indicatorDiv.className = 'flex items-start bot-message typing-indicator-container';
  indicatorDiv.innerHTML = `
    <div class="bg-white rounded-lg p-3 shadow-sm">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  indicatorDiv.id = 'typing-indicator';
  chatMessages.appendChild(indicatorDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to remove typing indicator
function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// Function to update quick response buttons based on selected category
function updateQuickResponses(category) {
  const quickResponses = document.querySelector('.quick-responses');
  if (!quickResponses) return;
  
  // Clear existing quick responses
  quickResponses.innerHTML = '';
  
  // Define new quick responses based on category
  let responses = [];
  switch(category) {
    case 'food':
      responses = [
        { text: 'Healthy eating tips', query: 'Tell me about healthy eating' },
        { text: 'Daily calorie needs', query: 'How many calories do I need per day?' },
        { text: 'Protein sources', query: 'What are good sources of protein?' },
        { text: 'Reading food labels', query: 'How to read nutrition labels?' }
      ];
      break;
    case 'cosmetics':
      responses = [
        { text: 'Skincare routine', query: 'What should be in my skincare routine?' },
        { text: 'Ingredients to avoid', query: 'What skincare ingredients should I avoid?' },
        { text: 'Anti-aging products', query: 'Best anti-aging ingredients?' },
        { text: 'Acne treatment', query: 'How can I treat acne naturally?' }
      ];
      break;
    case 'medicine':
      responses = [
        { text: 'Medicine side effects', query: 'Common medicine side effects' },
        { text: 'Antibiotic usage', query: 'When should I take antibiotics?' },
        { text: 'Pain relievers', query: 'Differences between pain relievers?' },
        { text: 'Drug interactions', query: 'What are dangerous drug interactions?' }
      ];
      break;
    case 'fitness':
      responses = [
        { text: 'Beginner workout', query: 'Workout routine for beginners' },
        { text: 'Weight loss tips', query: 'How to lose weight effectively?' },
        { text: 'Muscle building', query: 'How to build muscle quickly?' },
        { text: 'Recovery advice', query: 'Best practices for workout recovery?' }
      ];
      break;
    default:
      responses = [
        { text: 'Healthy eating tips', query: 'Tell me about healthy eating' },
        { text: 'Skincare advice', query: 'What skincare ingredients should I avoid?' },
        { text: 'Daily calories', query: 'How many calories do I need per day?' },
        { text: 'Medicine info', query: 'Common medicine side effects' }
      ];
  }
  
  // Add new quick response buttons
  responses.forEach(response => {
    const btn = document.createElement('div');
    btn.className = 'quick-response-btn';
    btn.textContent = response.text;
    btn.onclick = () => sendQuickResponse(response.query);
    quickResponses.appendChild(btn);
  });
}

// Function to handle quick response clicks
function sendQuickResponse(message) {
  userInput.value = message;
  sendButton.click();
}

// Function to check if message needs external data
async function needsExternalData(message) {
  // Check if the message is asking about nutritional information of specific foods
  const nutritionKeywords = [
    'calories in', 'nutrition in', 'nutritional value', 'macros in', 
    'protein in', 'carbs in', 'fat in', 'how many calories', 'nutrient'
  ];
  
  const foodPattern = /\b(calories|nutrition|protein|carbs|fat)\s+in\s+([a-zA-Z\s]+)\b/i;
  const match = message.match(foodPattern);
  
  if (currentCategory === 'food' && match) {
    const foodItem = match[2].trim();
    try {
      const nutritionData = await fetchNutritionData(foodItem);
      return { 
        needsExternal: true, 
        data: nutritionData 
      };
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      return { needsExternal: false };
    }
  }
  
  // Check for workout or exercise information requests
  const exercisePattern = /\b(workout|exercise|routine|training)\s+for\s+([a-zA-Z\s]+)\b/i;
  const exerciseMatch = message.match(exercisePattern);
  
  if (currentCategory === 'fitness' && exerciseMatch) {
    const targetArea = exerciseMatch[2].trim();
    try {
      const exerciseData = await fetchExerciseData(targetArea);
      return { 
        needsExternal: true, 
        data: exerciseData 
      };
    } catch (error) {
      console.error('Error fetching exercise data:', error);
      return { needsExternal: false };
    }
  }
  
  return { needsExternal: false };
}

// Function to fetch nutrition data
async function fetchNutritionData(foodItem) {
  // Using Edamam Nutrition API (you would need to add your own API key)
  // This is a mock implementation - in a real app, you would use actual API keys
  console.log(`Fetching nutrition data for: ${foodItem}`);
  
  // For demo purposes, return mock data
  const mockNutritionData = {
    food: foodItem,
    calories: Math.floor(Math.random() * 300) + 50,
    protein: Math.floor(Math.random() * 20) + 2 + 'g',
    carbs: Math.floor(Math.random() * 30) + 5 + 'g',
    fat: Math.floor(Math.random() * 15) + 1 + 'g',
    fiber: Math.floor(Math.random() * 5) + 1 + 'g'
  };
  
  return mockNutritionData;
}

// Function to fetch exercise data
async function fetchExerciseData(targetArea) {
  // Mock implementation for exercise data
  console.log(`Fetching exercise data for: ${targetArea}`);
  
  const exercises = {
    'abs': ['Crunches', 'Planks', 'Russian Twists', 'Leg Raises'],
    'arms': ['Bicep Curls', 'Tricep Dips', 'Push-Ups', 'Hammer Curls'],
    'legs': ['Squats', 'Lunges', 'Deadlifts', 'Calf Raises'],
    'chest': ['Bench Press', 'Push-Ups', 'Chest Flys', 'Dips'],
    'back': ['Pull-Ups', 'Rows', 'Lat Pulldowns', 'Superman'],
    'full body': ['Burpees', 'Mountain Climbers', 'Jumping Jacks', 'Kettlebell Swings']
  };
  
  // Find best match for target area
  const area = Object.keys(exercises).find(key => 
    targetArea.toLowerCase().includes(key) || key.includes(targetArea.toLowerCase())
  ) || 'full body';
  
  return {
    targetArea: area,
    exercises: exercises[area]
  };
}

// Function to send a message to the chatbot API
async function sendMessage(message) {
  try {
    showTypingIndicator();
    
    // Check if message needs external data
    const externalDataCheck = await needsExternalData(message);
    
    // API URL (update if needed)
    const apiUrl = '/api/chatbot';
    
    const requestBody = {
      message: message,
      category: currentCategory
    };
    
    // Add external data if available
    if (externalDataCheck.needsExternal) {
      requestBody.externalData = externalDataCheck.data;
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();
    
    removeTypingIndicator();
    
    // If we have external data but API failed, use fallback response
    if (externalDataCheck.needsExternal && !data.reply) {
      let fallbackReply = generateFallbackReply(externalDataCheck.data);
      addBotMessage(fallbackReply);
      return;
    }
    
    if (data.reply) {
      addBotMessage(data.reply);
    } else {
      addBotMessage("I'm sorry, I couldn't process your request. Please try again.");
    }
  } catch (error) {
    console.error('Error sending message:', error);
    removeTypingIndicator();
    
    // Check if we have external data for fallback
    try {
      const externalDataCheck = await needsExternalData(message);
      if (externalDataCheck.needsExternal) {
        let fallbackReply = generateFallbackReply(externalDataCheck.data);
        addBotMessage(fallbackReply);
        return;
      }
    } catch (fallbackError) {
      console.error('Error in fallback:', fallbackError);
    }
    
    // Provide a more helpful and visible error message
    addBotMessage(`
      <div class="bg-red-50 border border-red-200 rounded p-3 mb-2">
        <div class="flex items-center text-red-600 font-medium mb-1">
          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Connection Error
        </div>
        <p class="text-black">I'm having trouble connecting to the server. Please check your connection and try again.</p>
      </div>
      <p class="text-black mt-2">In the meantime, you can try one of the quick response options below.</p>
    `);
    
    // Update quick response options to show helpful alternatives
    updateQuickResponses(currentCategory);
  }
}

// Generate fallback reply from external data
function generateFallbackReply(data) {
  if (data.food) {
    // Nutrition data fallback
    return `
      <div class="bg-green-50 border border-green-200 rounded p-3 mb-2">
        <p class="text-green-800 font-medium mb-2">Nutritional Information for ${data.food}:</p>
        <ul class="mt-2 space-y-1 text-black">
          <li>• <span class="font-medium">Calories:</span> ${data.calories}</li>
          <li>• <span class="font-medium">Protein:</span> ${data.protein}</li>
          <li>• <span class="font-medium">Carbohydrates:</span> ${data.carbs}</li>
          <li>• <span class="font-medium">Fat:</span> ${data.fat}</li>
          <li>• <span class="font-medium">Fiber:</span> ${data.fiber}</li>
        </ul>
      </div>
      <p class="text-black mt-2">Remember that this is approximate information and may vary based on preparation method and portion size.</p>
    `;
  } else if (data.targetArea) {
    // Exercise data fallback
    const exerciseList = data.exercises.map(ex => `<li>• <span class="font-medium">${ex}</span></li>`).join('');
    return `
      <div class="bg-blue-50 border border-blue-200 rounded p-3 mb-2">
        <p class="text-blue-800 font-medium mb-2">Recommended exercises for ${data.targetArea}:</p>
        <ul class="mt-2 space-y-1 text-black">
          ${exerciseList}
        </ul>
      </div>
      <p class="text-black mt-2">Aim for 3-4 sets of each exercise with 8-12 repetitions, or adjust based on your fitness level.</p>
    `;
  }
  
  return "I'm sorry, I don't have specific information on that topic at the moment.";
}

// Event listener for send button
sendButton.addEventListener('click', () => {
  const message = userInput.value.trim();
  
  if (message) {
    // Add user message to chat
    addUserMessage(message);
    
    // Send message to API
    sendMessage(message);
    
    // Clear input
    userInput.value = '';
    
    // Focus on input field after sending
    userInput.focus();
  }
});

// Event listener for Enter key in input field
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

// Initialize with default quick responses
document.addEventListener('DOMContentLoaded', () => {
  updateQuickResponses('general');
  
  // Focus on input field when page loads
  setTimeout(() => {
    userInput.focus();
  }, 500);
}); 