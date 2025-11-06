// Chat functionality for insights panel
const InsightChat = {
    // Configuration
    config: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 500,
        netlifyFunction: '/.netlify/functions/chat',
        systemPrompt: `You are a CarGurus AI assistant helping dealers understand their performance metrics and insights. 
        You have access to the dealer's current performance data:
        - Lead volume has decreased by 14% in December
        - Current lead conversion rate: 1.62% (above market average of 1.45%)
        - Turn time target needs configuration
        - Overall health score improved from 4/5 to 5/5
        
        Provide helpful, actionable advice about improving dealership performance. Keep responses concise and relevant.`
    },

    // Initialize chat interface
    init() {
        this.messageHistory = [];
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        // Direct setup without DOMContentLoaded since panel is created dynamically
        const sendButton = document.getElementById('chatSendButton');
        const chatInput = document.getElementById('chatInput');

        console.log('Setting up listeners - Send button:', sendButton);
        console.log('Setting up listeners - Chat input:', chatInput);

        if (sendButton) {
            sendButton.addEventListener('click', () => {
                console.log('Send button clicked');
                this.sendMessage();
            });
        }

        if (chatInput) {
            // Send on Enter (but not Shift+Enter)
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Auto-resize textarea
            chatInput.addEventListener('input', () => this.autoResizeTextarea(chatInput));
        }
    },

    // Send user message
    async sendMessage() {
        console.log('sendMessage called');
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        console.log('Message:', message);

        if (!message) return;

        // Clear input
        chatInput.value = '';
        chatInput.style.height = '44px';

        // Add user message to chat
        this.addUserMessage(message);

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Send to OpenAI
            const response = await this.sendToOpenAI(message);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response
            this.addAIMessage(response);
        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTypingIndicator();
            this.addAIMessage('I apologize, but I encountered an error. Please try again.');
        }
    },

    // Send message to OpenAI via Netlify Function
    async sendToOpenAI(userMessage) {
        // Add to message history
        this.messageHistory.push({ role: 'user', content: userMessage });

        const response = await fetch(this.config.netlifyFunction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.config.model,
                messages: [
                    { role: 'system', content: this.config.systemPrompt },
                    ...this.messageHistory.slice(-6) // Keep last 6 messages for context
                ],
                temperature: this.config.temperature,
                max_tokens: this.config.maxTokens
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        // Add to history
        this.messageHistory.push({ role: 'assistant', content: aiMessage });

        return aiMessage;
    },

    // Add user message to chat
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                ${this.formatMessage(message)}
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    },

    // Add AI message to chat
    addAIMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ai-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                ${this.formatMessage(message)}
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    },

    // Format message text (handle bold, line breaks, etc.)
    formatMessage(text) {
        // Convert line breaks
        let formatted = text.replace(/\n/g, '<br>');
        
        // Convert **bold** text
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert numbered lists
        formatted = formatted.replace(/^(\d+)\.\s/gm, '<br>$1. ');
        
        return formatted;
    },

    // Show typing indicator
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message ai-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    },

    // Hide typing indicator
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    },

    // Auto-resize textarea
    autoResizeTextarea(textarea) {
        textarea.style.height = '44px';
        const scrollHeight = textarea.scrollHeight;
        const maxHeight = 120;
        
        if (scrollHeight > 44) {
            textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
        }
    },

    // Scroll to bottom of chat
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};

// Make InsightChat available globally
window.InsightChat = InsightChat;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        InsightChat.init();
    });
} else {
    InsightChat.init();
}