// Psychological screening tools (PHQ-9, GAD-7, GHQ-12)
class ScreeningManager {
    constructor() {
        this.currentTest = 'phq9';
        this.tests = this.initializeTests();
        this.results = [];
        this.currentAnswers = {};
    }

    init() {
        this.setupEventListeners();
        this.loadTestData();
        this.renderCurrentTest();
    }

    initializeTests() {
        return {
            phq9: {
                name: 'Patient Health Questionnaire (PHQ-9)',
                description: 'A 9-item screening tool for depression severity',
                instructions: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
                questions: [
                    {
                        id: 'q1',
                        text: 'Little interest or pleasure in doing things',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q2',
                        text: 'Feeling down, depressed, or hopeless',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q3',
                        text: 'Trouble falling or staying asleep, or sleeping too much',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q4',
                        text: 'Feeling tired or having little energy',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q5',
                        text: 'Poor appetite or overeating',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q6',
                        text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q7',
                        text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q8',
                        text: 'Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q9',
                        text: 'Thoughts that you would be better off dead, or of hurting yourself in some way',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    }
                ],
                scoring: {
                    ranges: [
                        { min: 0, max: 4, severity: 'Minimal', description: 'Minimal depression' },
                        { min: 5, max: 9, severity: 'Mild', description: 'Mild depression' },
                        { min: 10, max: 14, severity: 'Moderate', description: 'Moderate depression' },
                        { min: 15, max: 19, severity: 'Moderately Severe', description: 'Moderately severe depression' },
                        { min: 20, max: 27, severity: 'Severe', description: 'Severe depression' }
                    ]
                }
            },
            gad7: {
                name: 'Generalized Anxiety Disorder (GAD-7)',
                description: 'A 7-item screening tool for anxiety severity',
                instructions: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
                questions: [
                    {
                        id: 'q1',
                        text: 'Feeling nervous, anxious, or on edge',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q2',
                        text: 'Not being able to stop or control worrying',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q3',
                        text: 'Worrying too much about different things',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q4',
                        text: 'Trouble relaxing',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q5',
                        text: 'Being so restless that it is hard to sit still',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q6',
                        text: 'Becoming easily annoyed or irritable',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    },
                    {
                        id: 'q7',
                        text: 'Feeling afraid, as if something awful might happen',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'Several days' },
                            { value: 2, text: 'More than half the days' },
                            { value: 3, text: 'Nearly every day' }
                        ]
                    }
                ],
                scoring: {
                    ranges: [
                        { min: 0, max: 4, severity: 'Minimal', description: 'Minimal anxiety' },
                        { min: 5, max: 9, severity: 'Mild', description: 'Mild anxiety' },
                        { min: 10, max: 14, severity: 'Moderate', description: 'Moderate anxiety' },
                        { min: 15, max: 21, severity: 'Severe', description: 'Severe anxiety' }
                    ]
                }
            },
            ghq: {
                name: 'General Health Questionnaire (GHQ-12)',
                description: 'A 12-item screening tool for general psychological distress',
                instructions: 'Please answer the following questions about your general health:',
                questions: [
                    {
                        id: 'q1',
                        text: 'Have you recently been able to concentrate on whatever you\'re doing?',
                        options: [
                            { value: 0, text: 'Better than usual' },
                            { value: 1, text: 'Same as usual' },
                            { value: 2, text: 'Less than usual' },
                            { value: 3, text: 'Much less than usual' }
                        ]
                    },
                    {
                        id: 'q2',
                        text: 'Have you recently lost much sleep over worry?',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'No more than usual' },
                            { value: 2, text: 'Rather more than usual' },
                            { value: 3, text: 'Much more than usual' }
                        ]
                    },
                    {
                        id: 'q3',
                        text: 'Have you recently felt that you are playing a useful part in things?',
                        options: [
                            { value: 0, text: 'More so than usual' },
                            { value: 1, text: 'Same as usual' },
                            { value: 2, text: 'Less so than usual' },
                            { value: 3, text: 'Much less than usual' }
                        ]
                    },
                    {
                        id: 'q4',
                        text: 'Have you recently felt capable of making decisions about things?',
                        options: [
                            { value: 0, text: 'More so than usual' },
                            { value: 1, text: 'Same as usual' },
                            { value: 2, text: 'Less so than usual' },
                            { value: 3, text: 'Much less than usual' }
                        ]
                    },
                    {
                        id: 'q5',
                        text: 'Have you recently felt constantly under strain?',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'No more than usual' },
                            { value: 2, text: 'Rather more than usual' },
                            { value: 3, text: 'Much more than usual' }
                        ]
                    },
                    {
                        id: 'q6',
                        text: 'Have you recently felt that you couldn\'t overcome your difficulties?',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'No more than usual' },
                            { value: 2, text: 'Rather more than usual' },
                            { value: 3, text: 'Much more than usual' }
                        ]
                    },
                    {
                        id: 'q7',
                        text: 'Have you recently been able to enjoy your normal day-to-day activities?',
                        options: [
                            { value: 0, text: 'More so than usual' },
                            { value: 1, text: 'Same as usual' },
                            { value: 2, text: 'Less so than usual' },
                            { value: 3, text: 'Much less than usual' }
                        ]
                    },
                    {
                        id: 'q8',
                        text: 'Have you recently been able to face up to problems?',
                        options: [
                            { value: 0, text: 'More so than usual' },
                            { value: 1, text: 'Same as usual' },
                            { value: 2, text: 'Less so than usual' },
                            { value: 3, text: 'Much less than usual' }
                        ]
                    },
                    {
                        id: 'q9',
                        text: 'Have you recently been feeling unhappy and depressed?',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'No more than usual' },
                            { value: 2, text: 'Rather more than usual' },
                            { value: 3, text: 'Much more than usual' }
                        ]
                    },
                    {
                        id: 'q10',
                        text: 'Have you recently been losing confidence in yourself?',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'No more than usual' },
                            { value: 2, text: 'Rather more than usual' },
                            { value: 3, text: 'Much more than usual' }
                        ]
                    },
                    {
                        id: 'q11',
                        text: 'Have you recently been thinking of yourself as a worthless person?',
                        options: [
                            { value: 0, text: 'Not at all' },
                            { value: 1, text: 'No more than usual' },
                            { value: 2, text: 'Rather more than usual' },
                            { value: 3, text: 'Much more than usual' }
                        ]
                    },
                    {
                        id: 'q12',
                        text: 'Have you recently been feeling reasonably happy, all things considered?',
                        options: [
                            { value: 0, text: 'More so than usual' },
                            { value: 1, text: 'Same as usual' },
                            { value: 2, text: 'Less so than usual' },
                            { value: 3, text: 'Much less than usual' }
                        ]
                    }
                ],
                scoring: {
                    ranges: [
                        { min: 0, max: 3, severity: 'Low', description: 'Low psychological distress' },
                        { min: 4, max: 7, severity: 'Moderate', description: 'Moderate psychological distress' },
                        { min: 8, max: 12, severity: 'High', description: 'High psychological distress' }
                    ]
                }
            }
        };
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const testType = e.target.getAttribute('data-test');
                this.switchTest(testType);
            });
        });

        // Form submission
        document.querySelectorAll('.test-container form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTestSubmission(e.target);
            });
        });

        // Answer selection
        document.addEventListener('change', (e) => {
            if (e.target.name && e.target.name.startsWith('question_')) {
                this.handleAnswerChange(e.target);
            }
        });
    }

    switchTest(testType) {
        this.currentTest = testType;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-test="${testType}"]`).classList.add('active');

        // Update active test container
        document.querySelectorAll('.test-container').forEach(container => {
            container.classList.remove('active');
        });
        document.getElementById(`${testType}-test`).classList.add('active');

        // Clear current answers
        this.currentAnswers = {};

        // Render the test
        this.renderCurrentTest();
    }

    renderCurrentTest() {
        const test = this.tests[this.currentTest];
        const form = document.getElementById(`${this.currentTest}Form`);
        
        if (!form || !test) return;

        form.innerHTML = test.questions.map((question, index) => `
            <div class="question-group">
                <h4>Question ${index + 1}</h4>
                <p>${question.text}</p>
                <div class="option-group">
                    ${question.options.map(option => `
                        <label class="option-item">
                            <input type="radio" 
                                   name="question_${question.id}" 
                                   value="${option.value}"
                                   ${this.currentAnswers[question.id] === option.value ? 'checked' : ''}>
                            <span>${option.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('') + `
            <div class="test-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-check"></i> Complete Assessment
                </button>
                <button type="button" class="btn btn-secondary" onclick="ScreeningManager.clearTest()">
                    <i class="fas fa-undo"></i> Clear Answers
                </button>
            </div>
        `;
    }

    handleAnswerChange(input) {
        const questionId = input.name.replace('question_', '');
        this.currentAnswers[questionId] = parseInt(input.value);
    }

    handleTestSubmission(form) {
        const testType = form.id.replace('Form', '');
        const test = this.tests[testType];
        
        if (!test) return;

        // Validate all questions are answered
        const unansweredQuestions = test.questions.filter(q => 
            this.currentAnswers[q.id] === undefined
        );

        if (unansweredQuestions.length > 0) {
            if (window.app) {
                window.app.showNotification('Please answer all questions before submitting.', 'warning');
            }
            return;
        }

        // Calculate score
        const score = this.calculateScore(testType);
        const result = this.interpretScore(testType, score);
        
        // Save result
        this.saveResult(testType, score, result);
        
        // Show result
        this.showResult(testType, score, result);
        
        // Track completion
        if (window.app) {
            window.app.trackEvent('screening_completed', {
                testType: testType,
                score: score,
                severity: result.severity
            });
        }
    }

    calculateScore(testType) {
        const test = this.tests[testType];
        if (!test) return 0;

        return test.questions.reduce((total, question) => {
            const answer = this.currentAnswers[question.id];
            return total + (answer || 0);
        }, 0);
    }

    interpretScore(testType, score) {
        const test = this.tests[testType];
        if (!test) return null;

        const range = test.scoring.ranges.find(r => 
            score >= r.min && score <= r.max
        );

        return range || test.scoring.ranges[test.scoring.ranges.length - 1];
    }

    showResult(testType, score, result) {
        const test = this.tests[testType];
        const severityColors = {
            'Minimal': '#10b981',
            'Mild': '#f59e0b',
            'Moderate': '#f59e0b',
            'Moderately Severe': '#ef4444',
            'Severe': '#ef4444',
            'Low': '#10b981',
            'High': '#ef4444'
        };

        const resultHtml = `
            <div class="result-modal">
                <div class="result-header">
                    <h3>Assessment Complete</h3>
                    <p>${test.name}</p>
                </div>
                <div class="result-content">
                    <div class="score-display">
                        <div class="score-circle" style="border-color: ${severityColors[result.severity]}">
                            <span class="score-number">${score}</span>
                            <span class="score-label">Total Score</span>
                        </div>
                    </div>
                    <div class="severity-display">
                        <h4 style="color: ${severityColors[result.severity]}">${result.severity}</h4>
                        <p>${result.description}</p>
                    </div>
                    <div class="recommendations">
                        ${this.getRecommendations(testType, result.severity)}
                    </div>
                    <div class="result-actions">
                        <button class="btn btn-primary" onclick="ScreeningManager.closeResult()">
                            <i class="fas fa-check"></i> Understood
                        </button>
                        <button class="btn btn-secondary" onclick="ScreeningManager.bookSession('${testType}')">
                            <i class="fas fa-calendar"></i> Book Session
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Create and show modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                ${resultHtml}
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }

    getRecommendations(testType, severity) {
        const recommendations = {
            'Minimal': `
                <h5>Recommendations:</h5>
                <ul>
                    <li>Continue maintaining your current mental health practices</li>
                    <li>Consider preventive strategies like regular exercise and stress management</li>
                    <li>Stay connected with support systems</li>
                </ul>
            `,
            'Mild': `
                <h5>Recommendations:</h5>
                <ul>
                    <li>Practice self-care and stress management techniques</li>
                    <li>Consider talking to a counselor or mental health professional</li>
                    <li>Use available resources and support systems</li>
                    <li>Monitor your symptoms and seek help if they worsen</li>
                </ul>
            `,
            'Moderate': `
                <h5>Recommendations:</h5>
                <ul>
                    <li><strong>Consider professional help:</strong> A counselor or mental health professional can provide valuable support</li>
                    <li>Practice coping strategies and stress management techniques</li>
                    <li>Maintain regular sleep, exercise, and healthy eating habits</li>
                    <li>Stay connected with friends, family, or support groups</li>
                </ul>
            `,
            'Moderately Severe': `
                <h5>Recommendations:</h5>
                <ul>
                    <li><strong>Seek professional help:</strong> Consider counseling or therapy</li>
                    <li>Talk to your healthcare provider about your symptoms</li>
                    <li>Develop a support network of friends, family, or support groups</li>
                    <li>Practice self-care and stress management techniques</li>
                    <li>Consider reaching out to campus mental health services</li>
                </ul>
            `,
            'Severe': `
                <h5>Recommendations:</h5>
                <ul>
                    <li><strong>Seek immediate professional help:</strong> Contact a mental health professional or counselor</li>
                    <li>Consider talking to your healthcare provider about treatment options</li>
                    <li>Reach out to campus mental health services or crisis support</li>
                    <li>Stay connected with your support network</li>
                    <li>If you're having thoughts of self-harm, contact emergency services or a crisis hotline</li>
                </ul>
            `,
            'Low': `
                <h5>Recommendations:</h5>
                <ul>
                    <li>Continue maintaining your current mental health practices</li>
                    <li>Focus on preventive strategies and self-care</li>
                    <li>Stay connected with your support systems</li>
                </ul>
            `,
            'High': `
                <h5>Recommendations:</h5>
                <ul>
                    <li><strong>Consider professional support:</strong> A mental health professional can help you develop coping strategies</li>
                    <li>Practice stress management and relaxation techniques</li>
                    <li>Maintain regular routines and self-care practices</li>
                    <li>Stay connected with friends, family, or support groups</li>
                    <li>Consider reaching out to campus counseling services</li>
                </ul>
            `
        };

        return recommendations[severity] || recommendations['Moderate'];
    }

    closeResult() {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    }

    bookSession(testType) {
        this.closeResult();
        if (window.app) {
            window.app.showSection('booking');
        }
    }

    clearTest() {
        this.currentAnswers = {};
        this.renderCurrentTest();
    }

    saveResult(testType, score, result) {
        const resultData = {
            id: 'result_' + Date.now(),
            testType: testType,
            score: score,
            severity: result.severity,
            description: result.description,
            completedAt: new Date().toISOString(),
            answers: { ...this.currentAnswers }
        };

        this.results.push(resultData);
        
        if (window.app) {
            window.app.saveData('screeningResults', this.results);
        }
    }

    loadTestData() {
        if (window.app) {
            this.results = window.app.loadData('screeningResults', []);
        }
    }

    // Admin functions
    getScreeningStats() {
        const totalCompletions = this.results.length;
        const testTypeStats = {};
        const severityStats = {};

        this.results.forEach(result => {
            // Test type stats
            testTypeStats[result.testType] = (testTypeStats[result.testType] || 0) + 1;
            
            // Severity stats
            severityStats[result.severity] = (severityStats[result.severity] || 0) + 1;
        });

        const averageScores = {};
        Object.keys(this.tests).forEach(testType => {
            const testResults = this.results.filter(r => r.testType === testType);
            if (testResults.length > 0) {
                averageScores[testType] = (
                    testResults.reduce((sum, r) => sum + r.score, 0) / testResults.length
                ).toFixed(1);
            }
        });

        return {
            totalCompletions,
            testTypeStats,
            severityStats,
            averageScores,
            recentResults: this.results.slice(-10)
        };
    }
}

// Initialize ScreeningManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ScreeningManager = new ScreeningManager();
});

// Add screening-specific styles
const screeningStyle = document.createElement('style');
screeningStyle.textContent = `
    .result-modal {
        text-align: center;
        padding: 2rem;
    }
    
    .result-header h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .result-header p {
        color: var(--text-secondary);
        margin-bottom: 2rem;
    }
    
    .score-display {
        margin-bottom: 2rem;
    }
    
    .score-circle {
        width: 120px;
        height: 120px;
        border: 4px solid var(--primary-color);
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
    }
    
    .score-number {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary);
    }
    
    .score-label {
        font-size: 0.9rem;
        color: var(--text-secondary);
    }
    
    .severity-display {
        margin-bottom: 2rem;
    }
    
    .severity-display h4 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .recommendations {
        text-align: left;
        background: var(--bg-secondary);
        padding: 1.5rem;
        border-radius: var(--radius-md);
        margin-bottom: 2rem;
    }
    
    .recommendations h5 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .recommendations ul {
        margin: 0;
        padding-left: 1.5rem;
    }
    
    .recommendations li {
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
    }
    
    .result-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .question-group {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
    }
    
    .question-group h4 {
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .question-group p {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        font-weight: 500;
    }
    
    .option-group {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .option-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: var(--bg-primary);
        border: 2px solid var(--border-color);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .option-item:hover {
        border-color: var(--primary-color);
        background: rgba(99, 102, 241, 0.05);
    }
    
    .option-item input[type="radio"] {
        margin: 0;
        width: auto;
    }
    
    .option-item.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: white;
    }
    
    .test-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
    }
`;
document.head.appendChild(screeningStyle);
