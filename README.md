# CarGurus Dealer Dashboard - Hackathon 2025

## Overview
This is a dealer dashboard application built for CarGurus Hackathon 2025. It features performance analytics, pricing tools, and AI-powered insights.

## Features
- Performance dashboard with multiple metrics
- Interactive charts for leads, connections, VDP views, and inventory
- AI-powered chat assistant for insights
- Pricing page with inventory management
- Health check system with configuration

## Setup Instructions

### Netlify Deployment

1. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Netlify will automatically detect the configuration

2. **Set Environment Variables**
   - Go to your Netlify site dashboard
   - Navigate to Site settings > Environment variables
   - Add the following variable:
     ```
     OPENAIAPI=your_actual_openai_api_key_here
     ```

3. **Redeploy**
   - After adding the environment variable, trigger a new deploy
   - The chat functionality will now work with your API key

### Local Development

1. Clone the repository
2. Create a `.env` file in the root directory:
   ```
   OPENAIAPI=your_actual_openai_api_key_here
   ```
3. Install Netlify CLI: `npm install -g netlify-cli`
4. Run locally: `netlify dev`

## Security Notes
- Never commit API keys to version control
- The OpenAI API key is securely stored in Netlify environment variables
- API calls are made through a Netlify Function to keep the key server-side

## Technologies Used
- HTML5, CSS3, JavaScript (Vanilla)
- Chart.js for data visualization
- OpenAI GPT-4 for AI insights
- Netlify Functions for secure API calls