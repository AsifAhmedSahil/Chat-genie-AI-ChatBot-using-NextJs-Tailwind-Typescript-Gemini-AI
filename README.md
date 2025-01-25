# AI Chat Application

This is a simple AI-powered chat application where users can interact with an AI model. It simulates a conversation interface where customers can send messages, and the AI responds accordingly. This project uses the Gemini API for AI responses (you can replace it with the OpenAI API or mock backend for AI responses).

## Objective

- Build an AI-powered chat application where:
  - Customers can send messages through a user-friendly interface.
  - The AI responds to the messages using a simulated backend.

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS, ShadCN UI components
- **AI Logic:** Gemini API (or mock API) for AI responses
- **Other Libraries:** Axios/Fetch for API calls

## Features

- **Message Input**
  - A text input box for customers to type their messages.
  - A "Send" button to submit the message.

- **Chat Display**
  - Display a conversational view of messages (both customer and AI).
  - Different styles for customer and AI messages.

- **AI Response Simulation**
  - Integrate the Gemini API or a mock backend for AI responses.

## Setup and Installation

To run this application locally, follow the instructions below:

### Prerequisites

- Install **Node.js** (version 14 or higher).
- Install **Yarn** or **npm** for package management.

### Clone the Repository

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/ai-chat-app.git
    ```
2. Navigate into the project directory:
    ```
    cd ai-chat-app
    ```
3. Use Yarn or npm to install the dependencies:
```
npm install

```
4. To use the Gemini API, you need to set up your API key. Please follow these steps:

Sign up at Gemini API and generate an API key.
Create a .env.local file in the root directory of your project.
Add your Gemini API key to the .env.local file like this:

```
GEMINI_API_KEY=your-api-key-here

```

5. Start the development server:
```
npm run dev

```

