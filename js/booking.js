// Booking system for counselling sessions
class BookingManager {
    constructor() {
        this.bookings = [];
        this.counsellors = this.initializeCounsellors();
        this.availableSlots = this.generateAvailableSlots();
    }

    init() {
        this.loadBookings();
        this.setupEventListeners();
        this.updateCounsellorAvailability();
        this.setMinDate();
    }

    initializeCounsellors() {
        return [
            {
                id: 'counsellor1',
                name: 'Dr. Sarah Johnson',
                title: 'Licensed Clinical Psychologist',
                specialization: 'Anxiety, Depression, Academic Stress',
                availability: 'Monday-Friday, 9 AM - 5 PM',
                status: 'available',
                avatar: 'fas fa-user-md'
            },
            {
                id: 'counsellor2',
                name: 'Dr. Michael Chen',
                title: 'Mental Health Counselor',
                specialization: 'Social Anxiety, Relationship Issues, Life Transitions',
                availability: 'Tuesday-Saturday, 10 AM - 6 PM',
                status: 'available',
                avatar: 'fas fa-user-md'
            },
            {
                id: 'helpline',
                name: '24/7 Mental Health Helpline',
                title: 'Emergency Mental Health Support',
                specialization: 'Crisis Intervention, Emergency Support',
                availability: '24/7 Available',
                status: 'emergency',
                avatar: 'fas fa-phone'
            }
        ];
    }

    generateAvailableSlots() {
        const slots = [];
        const today = new Date();
        
        // Generate slots for the next 30 days
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Skip weekends for regular counsellors
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
                timeSlots.forEach(time => {
                    slots.push({
                        date: date.toISOString().split('T')[0],
                        time: time,
                        counsellorId: 'counsellor1',
                        available: true
                    });
                });
            }
            
            // Dr. Chen available Tuesday-Saturday
            if (date.getDay() >= 2 && date.getDay() <= 6) {
                const timeSlots = ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
                timeSlots.forEach(time => {
                    slots.push({
                        date: date.toISOString().split('T')[0],
                        time: time,
                        counsellorId: 'counsellor2',
                        available: true
                    });
                });
            }
        }
        
        return slots;
    }

    setupEventListeners() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission();
            });
        }

        // Update time slots when date changes
        const dateInput = document.getElementById('preferredDate');
        const timeSelect = document.getElementById('preferredTime');
        
        if (dateInput && timeSelect) {
            dateInput.addEventListener('change', () => {
                this.updateTimeSlots(dateInput.value);
            });
        }

        // Update counsellor availability when type changes
        const counsellorType = document.getElementById('counsellorType');
        if (counsellorType) {
            counsellorType.addEventListener('change', () => {
                this.updateCounsellorDisplay();
            });
        }
    }

    setMinDate() {
        const dateInput = document.getElementById('preferredDate');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }
    }

    updateTimeSlots(selectedDate) {
        const timeSelect = document.getElementById('preferredTime');
        const counsellorType = document.getElementById('counsellorType');
        
        if (!timeSelect || !counsellorType) return;

        // Clear existing options
        timeSelect.innerHTML = '<option value="">Select time</option>';

        if (!selectedDate) return;

        const selectedType = counsellorType.value;
        let availableSlots = [];

        if (selectedType === 'counsellor') {
            // Regular counsellor slots
            availableSlots = this.availableSlots.filter(slot => 
                slot.date === selectedDate && 
                slot.counsellorId !== 'helpline' &&
                slot.available
            );
        } else if (selectedType === 'helpline') {
            // Helpline is available 24/7, show some sample times
            availableSlots = [
                { time: '09:00', available: true },
                { time: '12:00', available: true },
                { time: '15:00', available: true },
                { time: '18:00', available: true },
                { time: '21:00', available: true }
            ];
        } else if (selectedType === 'emergency') {
            // Emergency is immediate
            availableSlots = [
                { time: 'Immediate', available: true }
            ];
        }

        // Add available slots to select
        availableSlots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot.time;
            option.textContent = this.formatTime(slot.time);
            timeSelect.appendChild(option);
        });
    }

    updateCounsellorDisplay() {
        const counsellorType = document.getElementById('counsellorType');
        const counsellorList = document.querySelector('.counsellor-list');
        
        if (!counsellorType || !counsellorList) return;

        const selectedType = counsellorType.value;
        let filteredCounsellors = [];

        switch (selectedType) {
            case 'counsellor':
                filteredCounsellors = this.counsellors.filter(c => c.id !== 'helpline');
                break;
            case 'helpline':
                filteredCounsellors = this.counsellors.filter(c => c.id === 'helpline');
                break;
            case 'emergency':
                filteredCounsellors = this.counsellors.filter(c => c.status === 'emergency');
                break;
            default:
                filteredCounsellors = this.counsellors;
        }

        this.renderCounsellors(filteredCounsellors);
    }

    renderCounsellors(counsellors) {
        const counsellorList = document.querySelector('.counsellor-list');
        if (!counsellorList) return;

        counsellorList.innerHTML = counsellors.map(counsellor => `
            <div class="counsellor-card">
                <div class="counsellor-avatar">
                    <i class="${counsellor.avatar}"></i>
                </div>
                <div class="counsellor-info">
                    <h4>${counsellor.name}</h4>
                    <p>${counsellor.title}</p>
                    <p><strong>Specialization:</strong> ${counsellor.specialization}</p>
                    <span class="availability ${counsellor.status}">${counsellor.availability}</span>
                </div>
            </div>
        `).join('');
    }

    updateCounsellorAvailability() {
        // Update counsellor availability based on existing bookings
        this.counsellors.forEach(counsellor => {
            const todayBookings = this.bookings.filter(booking => 
                booking.counsellorId === counsellor.id && 
                new Date(booking.preferredDate).toDateString() === new Date().toDateString()
            );
            
            if (counsellor.id === 'helpline') {
                counsellor.status = 'emergency';
            } else if (todayBookings.length >= 6) {
                counsellor.status = 'busy';
            } else {
                counsellor.status = 'available';
            }
        });

        this.renderCounsellors(this.counsellors);
    }

    handleBookingSubmission() {
        const formData = this.collectFormData();
        
        if (!this.validateFormData(formData)) {
            return;
        }

        // Create booking object
        const booking = {
            id: this.generateBookingId(),
            ...formData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            counsellorId: this.getCounsellorId(formData.counsellorType)
        };

        // Add to bookings
        this.bookings.push(booking);
        this.saveBookings();

        // Show confirmation
        this.showBookingConfirmation(booking);

        // Reset form
        this.resetForm();

        // Track booking event
        if (window.app) {
            window.app.trackEvent('booking_created', {
                counsellorType: formData.counsellorType,
                concernLength: formData.concern ? formData.concern.length : 0
            });
        }
    }

    collectFormData() {
        return {
            studentName: document.getElementById('studentName').value,
            studentId: document.getElementById('studentId').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            counsellorType: document.getElementById('counsellorType').value,
            preferredDate: document.getElementById('preferredDate').value,
            preferredTime: document.getElementById('preferredTime').value,
            concern: document.getElementById('concern').value,
            confidentiality: document.getElementById('confidentiality').checked
        };
    }

    validateFormData(data) {
        const errors = [];

        if (!data.studentName.trim()) {
            errors.push('Please enter your full name');
        }

        if (!data.studentId.trim()) {
            errors.push('Please enter your student ID');
        }

        if (!data.email.trim() || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.phone.trim()) {
            errors.push('Please enter your phone number');
        }

        if (!data.counsellorType) {
            errors.push('Please select a type of support');
        }

        if (!data.preferredDate) {
            errors.push('Please select a preferred date');
        }

        if (!data.preferredTime) {
            errors.push('Please select a preferred time');
        }

        if (!data.confidentiality) {
            errors.push('Please confirm that you understand the confidentiality agreement');
        }

        if (errors.length > 0) {
            this.showValidationErrors(errors);
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showValidationErrors(errors) {
        const errorMessage = errors.join('<br>');
        if (window.app) {
            window.app.showNotification(errorMessage, 'error', 8000);
        }
    }

    getCounsellorId(counsellorType) {
        switch (counsellorType) {
            case 'counsellor':
                return 'counsellor1'; // Default to Dr. Sarah Johnson
            case 'helpline':
                return 'helpline';
            case 'emergency':
                return 'helpline';
            default:
                return 'counsellor1';
        }
    }

    generateBookingId() {
        return 'BK' + Date.now().toString(36).toUpperCase();
    }

    showBookingConfirmation(booking) {
        const counsellor = this.counsellors.find(c => c.id === booking.counsellorId);
        const confirmationMessage = `
            <strong>Booking Confirmed!</strong><br><br>
            <strong>Booking ID:</strong> ${booking.id}<br>
            <strong>Counsellor:</strong> ${counsellor ? counsellor.name : 'Selected Counsellor'}<br>
            <strong>Date:</strong> ${this.formatDate(booking.preferredDate)}<br>
            <strong>Time:</strong> ${this.formatTime(booking.preferredTime)}<br><br>
            
            You will receive a confirmation email at ${booking.email} with further details.<br>
            Please arrive 10 minutes early for your appointment.
        `;

        if (window.app) {
            window.app.showNotification(confirmationMessage, 'success', 10000);
        }

        // Send confirmation email (simulated)
        this.sendConfirmationEmail(booking);
    }

    sendConfirmationEmail(booking) {
        // In a real application, this would send an actual email
        console.log('Confirmation email sent to:', booking.email);
        
        // Simulate email sending
        setTimeout(() => {
            if (window.app) {
                window.app.showNotification('Confirmation email sent successfully!', 'success');
            }
        }, 2000);
    }

    resetForm() {
        const form = document.getElementById('bookingForm');
        if (form) {
            form.reset();
            this.updateCounsellorDisplay();
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatTime(timeString) {
        if (timeString === 'Immediate') {
            return 'Immediate';
        }
        
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    saveBookings() {
        if (window.app) {
            window.app.saveData('bookings', this.bookings);
        }
    }

    loadBookings() {
        if (window.app) {
            this.bookings = window.app.loadData('bookings', []);
        }
    }

    // Admin functions
    getBookingStats() {
        const totalBookings = this.bookings.length;
        const todayBookings = this.bookings.filter(booking => 
            new Date(booking.preferredDate).toDateString() === new Date().toDateString()
        ).length;
        
        const thisWeekBookings = this.bookings.filter(booking => {
            const bookingDate = new Date(booking.preferredDate);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return bookingDate >= weekAgo;
        }).length;

        const counsellorStats = this.counsellors.map(counsellor => {
            const counsellorBookings = this.bookings.filter(booking => 
                booking.counsellorId === counsellor.id
            );
            return {
                name: counsellor.name,
                totalBookings: counsellorBookings.length,
                pendingBookings: counsellorBookings.filter(b => b.status === 'pending').length,
                completedBookings: counsellorBookings.filter(b => b.status === 'completed').length
            };
        });

        return {
            totalBookings,
            todayBookings,
            thisWeekBookings,
            counsellorStats
        };
    }

    updateBookingStatus(bookingId, status) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = status;
            booking.updatedAt = new Date().toISOString();
            this.saveBookings();
            return true;
        }
        return false;
    }

    getBookingsByDateRange(startDate, endDate) {
        return this.bookings.filter(booking => {
            const bookingDate = new Date(booking.preferredDate);
            return bookingDate >= startDate && bookingDate <= endDate;
        });
    }
}

// Initialize BookingManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.BookingManager = new BookingManager();
});
