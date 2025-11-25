// Chat functionality for AI Mental Health Assistant
class ChatManager {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.chatHistory = [];
        this.responses = this.initializeResponses();
    }

    init() {
        this.loadChatHistory();
        this.setupEventListeners();
        this.displayWelcomeMessage();
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendButton');

        if (chatInput && sendButton) {
            // Send message on button click
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });

            // Send message on Enter key
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Auto-resize input
            chatInput.addEventListener('input', () => {
                this.autoResizeInput(chatInput);
            });
        }
    }

    initializeResponses() {
        return {
            greetings: [
                "Hello! I'm here to help you with your mental health concerns. How are you feeling today?",
                "Hi there! I'm your AI mental health assistant. What's on your mind?",
                "Welcome! I'm here to listen and provide support. How can I help you today?"
            ],
            stress: [
                "I understand you're feeling stressed. That's completely normal, especially for college students. Let me suggest some coping strategies:",
                "Stress is a common experience, and it's okay to feel overwhelmed sometimes. Here are some techniques that might help:",
                "It sounds like you're dealing with a lot of stress. Remember, you're not alone in this. Let's work through some strategies together:"
            ],
            anxiety: [
                "Anxiety can be really challenging to deal with. I want you to know that your feelings are valid and there are ways to manage them:",
                "I hear that you're experiencing anxiety. This is more common than you might think, especially among students. Here are some helpful approaches:",
                "Anxiety can feel overwhelming, but there are effective strategies to help you cope. Let me share some techniques:"
            ],
            depression: [
                "I'm sorry to hear you're feeling this way. Depression can be really difficult, and it's important to know that help is available:",
                "What you're experiencing sounds really challenging. Depression affects many people, and there are ways to work through it:",
                "I want you to know that your feelings are valid and you don't have to face this alone. Here are some resources and strategies:"
            ],
            academic: [
                "Academic pressure can be overwhelming. It's completely normal to feel stressed about studies. Here are some strategies to help:",
                "I understand academic stress can be really challenging. Let me share some techniques that might help you manage this:",
                "Academic pressure is a common experience for students. Here are some ways to cope with study-related stress:"
            ],
            social: [
                "Social anxiety and isolation can be really difficult to deal with. You're not alone in feeling this way:",
                "I understand that social situations can be challenging. Many students experience similar feelings. Here are some strategies:",
                "Social anxiety is more common than you might think. Let me share some techniques that might help you feel more comfortable:"
            ],
            sleep: [
                "Sleep issues can really impact your mental health and daily functioning. Here are some strategies to improve your sleep:",
                "Poor sleep can make everything feel more difficult. Let me share some techniques to help you get better rest:",
                "Sleep problems are common among students and can affect your mood and concentration. Here are some helpful approaches:"
            ],
            coping: [
                "Here are some immediate coping strategies you can try right now:",
                "Let me share some techniques that can help you feel better in this moment:",
                "These are some practical strategies you can use to manage your current feelings:"
            ],
            professional: [
                "While I can provide support and coping strategies, I want to encourage you to consider reaching out to a mental health professional:",
                "It's important to know that professional help is available and can be very beneficial:",
                "I recommend considering professional support, especially if you're experiencing persistent difficulties:"
            ],
            emergency: [
                "I'm concerned about your safety. If you're having thoughts of self-harm, please reach out for immediate help:",
                "Your safety is the most important thing right now. Please contact emergency services or a crisis helpline:",
                "If you're in immediate danger, please call emergency services or a crisis hotline right away:"
            ]
        };
    }

    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();

        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        chatInput.value = '';

        // Process message and generate response
        this.processMessage(message);
    }

    addMessage(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${this.formatMessage(content)}</p>`;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Save to history
        this.messages.push({ content, sender, timestamp: new Date().toISOString() });
        this.saveChatHistory();
    }

    formatMessage(content) {
        // Convert URLs to clickable links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return content.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    }

    async processMessage(message) {
        this.showTypingIndicator();

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        this.hideTypingIndicator();

        // Analyze message and generate appropriate response
        const response = this.generateResponse(message);
        this.addMessage(response, 'bot');

        // Track chat interaction
        if (window.app) {
            window.app.trackEvent('chat_message', {
                messageLength: message.length,
                responseType: this.categorizeMessage(message)
            });
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        const category = this.categorizeMessage(message);
        
        let response = '';

        // Check for emergency keywords
        if (this.isEmergency(message)) {
            response = this.getEmergencyResponse();
        } else {
            // Generate contextual response based on category
            response = this.getContextualResponse(category, message);
        }

        return response;
    }

    categorizeMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('stress') || lowerMessage.includes('stressed') || lowerMessage.includes('pressure')) {
            return 'stress';
        } else if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
            return 'anxiety';
        } else if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
            return 'depression';
        } else if (lowerMessage.includes('study') || lowerMessage.includes('exam') || lowerMessage.includes('academic') || lowerMessage.includes('grade')) {
            return 'academic';
        } else if (lowerMessage.includes('social') || lowerMessage.includes('lonely') || lowerMessage.includes('isolated') || lowerMessage.includes('friend')) {
            return 'social';
        } else if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
            return 'sleep';
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'greetings';
        } else {
            return 'general';
        }
    }

    isEmergency(message) {
        const emergencyKeywords = [
            'suicide', 'kill myself', 'end it all', 'not worth living',
            'hurt myself', 'self harm', 'cut myself', 'overdose'
        ];
        
        const lowerMessage = message.toLowerCase();
        return emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
    }

    getEmergencyResponse() {
        return `
            <strong>I'm concerned about your safety.</strong><br><br>
            
            If you're having thoughts of self-harm or suicide, please reach out for immediate help:<br><br>
            
            <strong>Emergency Resources:</strong><br>
            • <strong>National Suicide Prevention Lifeline:</strong> 988 (24/7)<br>
            • <strong>Crisis Text Line:</strong> Text HOME to 741741<br>
            • <strong>Emergency Services:</strong> 911<br><br>
            
            <strong>Your campus resources:</strong><br>
            • Campus Counseling Center: Available 24/7<br>
            • Campus Security: For immediate assistance<br><br>
            
            You are not alone, and there are people who want to help you. Please reach out to someone you trust or call one of these numbers right now.
        `;
    }

    getContextualResponse(category, message) {
        const responses = this.responses[category] || this.responses.greetings;
        const baseResponse = responses[Math.floor(Math.random() * responses.length)];
        
        let specificAdvice = '';
        
        switch (category) {
            case 'stress':
                specificAdvice = this.getStressAdvice();
                break;
            case 'anxiety':
                specificAdvice = this.getAnxietyAdvice();
                break;
            case 'depression':
                specificAdvice = this.getDepressionAdvice();
                break;
            case 'academic':
                specificAdvice = this.getAcademicAdvice();
                break;
            case 'social':
                specificAdvice = this.getSocialAdvice();
                break;
            case 'sleep':
                specificAdvice = this.getSleepAdvice();
                break;
            default:
                specificAdvice = this.getGeneralAdvice();
        }

        return `${baseResponse}<br><br>${specificAdvice}`;
    }

    getStressAdvice() {
        return `
            <strong>Immediate Coping Strategies:</strong><br>
            • <strong>Deep Breathing:</strong> Try the 4-7-8 technique (inhale for 4, hold for 7, exhale for 8)<br>
            • <strong>Progressive Muscle Relaxation:</strong> Tense and relax each muscle group<br>
            • <strong>Mindfulness:</strong> Focus on the present moment, notice 5 things you can see, hear, feel<br>
            • <strong>Physical Activity:</strong> Even a short walk can help reduce stress<br>
            • <strong>Time Management:</strong> Break large tasks into smaller, manageable steps<br><br>
            
            <strong>Long-term Strategies:</strong><br>
            • Regular exercise and healthy eating<br>
            • Consistent sleep schedule<br>
            • Social support from friends and family<br>
            • Consider talking to a counselor about ongoing stress<br><br>
            
            Would you like me to help you with any specific stress management technique?
        `;
    }

    getAnxietyAdvice() {
        return `
            <strong>Grounding Techniques:</strong><br>
            • <strong>5-4-3-2-1 Method:</strong> Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste<br>
            • <strong>Box Breathing:</strong> Inhale for 4, hold for 4, exhale for 4, hold for 4<br>
            • <strong>Cold Water:</strong> Splash cold water on your face or hold ice cubes<br><br>
            
            <strong>Thought Challenging:</strong><br>
            • Ask yourself: "What's the evidence for this worry?"<br>
            • Consider: "What would I tell a friend in this situation?"<br>
            • Practice: "This feeling will pass"<br><br>
            
            <strong>Professional Help:</strong><br>
            • Consider cognitive-behavioral therapy (CBT)<br>
            • Talk to your campus counselor about anxiety management<br>
            • Explore relaxation apps or guided meditations<br><br>
            
            Remember, anxiety is treatable and you don't have to face it alone.
        `;
    }

    getDepressionAdvice() {
        return `
            <strong>Immediate Support:</strong><br>
            • <strong>Reach out:</strong> Talk to someone you trust about how you're feeling<br>
            • <strong>Routine:</strong> Try to maintain a basic daily routine, even if simplified<br>
            • <strong>Small goals:</strong> Set very small, achievable goals for each day<br>
            • <strong>Physical care:</strong> Try to eat regularly, get some sunlight, and move your body<br><br>
            
            <strong>Professional Help:</strong><br>
            • <strong>Campus Counseling:</strong> Your college likely has free counseling services<br>
            • <strong>Therapy:</strong> Consider individual or group therapy<br>
            • <strong>Medical evaluation:</strong> Depression can have physical causes that need treatment<br><br>
            
            <strong>Important:</strong> If you're having thoughts of self-harm, please reach out to a crisis hotline or emergency services immediately.<br><br>
            
            You are not alone, and depression is treatable. Help is available.
        `;
    }

    getAcademicAdvice() {
        return `
            <strong>Study Strategies:</strong><br>
            • <strong>Pomodoro Technique:</strong> Study for 25 minutes, break for 5 minutes<br>
            • <strong>Active Learning:</strong> Summarize, teach others, create mind maps<br>
            • <strong>Time Blocking:</strong> Schedule specific times for different subjects<br>
            • <strong>Study Groups:</strong> Collaborate with classmates for mutual support<br><br>
            
            <strong>Stress Management:</strong><br>
            • <strong>Realistic Goals:</strong> Set achievable study targets<br>
            • <strong>Breaks:</strong> Take regular breaks to prevent burnout<br>
            • <strong>Support:</strong> Talk to professors or academic advisors about concerns<br>
            • <strong>Balance:</strong> Make time for activities you enjoy<br><br>
            
            <strong>Resources:</strong><br>
            • Academic support centers on campus<br>
            • Tutoring services<br>
            • Study skills workshops<br>
            • Time management counseling<br><br>
            
            Remember, your worth isn't determined by your grades. It's okay to ask for help.
        `;
    }

    getSocialAdvice() {
        return `
            <strong>Building Connections:</strong><br>
            • <strong>Start Small:</strong> Begin with brief interactions (saying hello, asking about assignments)<br>
            • <strong>Join Groups:</strong> Look for clubs, study groups, or activities that interest you<br>
            • <strong>Shared Activities:</strong> Participate in campus events or volunteer opportunities<br>
            • <strong>Online Communities:</strong> Consider online groups related to your interests<br><br>
            
            <strong>Managing Social Anxiety:</strong><br>
            • <strong>Prepare:</strong> Think of conversation starters or topics beforehand<br>
            • <strong>Practice:</strong> Start with low-pressure social situations<br>
            • <strong>Self-Compassion:</strong> Be kind to yourself if interactions don't go perfectly<br>
            • <strong>Professional Help:</strong> Consider therapy for social anxiety<br><br>
            
            <strong>Campus Resources:</strong><br>
            • Student organizations and clubs<br>
            • Peer mentoring programs<br>
            • Social skills workshops<br>
            • Counseling services for social anxiety<br><br>
            
            Remember, many students feel the same way. You're not alone in wanting to connect with others.
        `;
    }

    getSleepAdvice() {
        return `
            <strong>Sleep Hygiene:</strong><br>
            • <strong>Consistent Schedule:</strong> Go to bed and wake up at the same time every day<br>
            • <strong>Bedroom Environment:</strong> Keep it cool, dark, and quiet<br>
            • <strong>No Screens:</strong> Avoid phones/laptops 1 hour before bed<br>
            • <strong>Relaxation Routine:</strong> Develop a calming pre-sleep routine<br><br>
            
            <strong>Sleep Preparation:</strong><br>
            • <strong>Limit Caffeine:</strong> Avoid caffeine after 2 PM<br>
            • <strong>Light Exposure:</strong> Get sunlight in the morning, dim lights in the evening<br>
            • <strong>Physical Activity:</strong> Regular exercise (but not right before bed)<br>
            • <strong>Mindfulness:</strong> Try meditation or deep breathing before sleep<br><br>
            
            <strong>When to Seek Help:</strong><br>
            • Persistent sleep problems for more than a few weeks<br>
            • Sleep issues affecting your daily functioning<br>
            • Consider talking to a healthcare provider<br><br>
            
            Good sleep is crucial for mental health. Don't hesitate to seek professional help if needed.
        `;
    }

    getGeneralAdvice() {
        return `
            <strong>General Mental Health Tips:</strong><br>
            • <strong>Self-Care:</strong> Make time for activities that bring you joy<br>
            • <strong>Social Connection:</strong> Stay connected with friends and family<br>
            • <strong>Physical Health:</strong> Regular exercise, balanced diet, adequate sleep<br>
            • <strong>Mindfulness:</strong> Practice being present in the moment<br>
            • <strong>Professional Support:</strong> Don't hesitate to seek help when needed<br><br>
            
            <strong>Remember:</strong><br>
            • Your feelings are valid<br>
            • It's okay to not be okay sometimes<br>
            • Asking for help is a sign of strength, not weakness<br>
            • You're not alone in your struggles<br><br>
            
            Is there a specific area you'd like to talk about more? I'm here to listen and help.
        `;
    }

    showTypingIndicator() {
        this.isTyping = true;
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    displayWelcomeMessage() {
        // Welcome message is already in HTML, but we can add any initialization here
    }

    autoResizeInput(input) {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }

    saveChatHistory() {
        if (window.app) {
            window.app.saveData('chatHistory', this.messages);
        }
    }

    loadChatHistory() {
        if (window.app) {
            this.messages = window.app.loadData('chatHistory', []);
            this.displayChatHistory();
        }
    }

    displayChatHistory() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        // Clear existing messages except welcome message
        const welcomeMessage = chatMessages.querySelector('.message:first-child');
        chatMessages.innerHTML = '';
        if (welcomeMessage) {
            chatMessages.appendChild(welcomeMessage);
        }

        // Display chat history
        this.messages.forEach(msg => {
            this.addMessageToDOM(msg.content, msg.sender);
        });
    }

    addMessageToDOM(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${this.formatMessage(content)}</p>`;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
    }

    clearChat() {
        this.messages = [];
        this.saveChatHistory();
        
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Hello! I'm here to help you with your mental health concerns. How are you feeling today? You can talk to me about anything - stress, anxiety, depression, or just need someone to listen.</p>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize ChatManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ChatManager = new ChatManager();
});

// Add typing indicator styles
const style = document.createElement('style');
style.textContent = `
    .typing-indicator .message-content {
        display: flex;
        align-items: center;
        padding: 1rem;
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--primary-color);
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) {
        animation-delay: -0.32s;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: -0.16s;
    }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
