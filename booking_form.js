document.addEventListener('DOMContentLoaded', function () {
    // Booking data storage
    const bookingData = {
      service: null,
      serviceName: null,
      date: null,
      time: null,
      name: null,
      email: null,
      phone: null,
      notes: null
    };
  
    // Simulate database of fully booked dates
    const fullyBookedDates = ['2025-04-22', '2025-04-25', '2025-05-01', '2025-05-07'];
  
    // Simulate booked slots for specific dates
    const bookedSlots = {
      '2025-04-16': ['10:00 AM', '2:30 PM'],
      '2025-04-17': ['9:00 AM', '11:30 AM', '3:00 PM'],
      '2025-04-18': ['1:00 PM', '4:30 PM'],
      '2025-04-19': ['10:30 AM', '12:00 PM']
    };
  
    function generateTimeSlots(startTime, endTime, intervalMinutes) {
      const slots = [];
      const start = parseTime(startTime);
      const end = parseTime(endTime);
  
      while (start < end) {
        slots.push(formatTime(start));
        start.setMinutes(start.getMinutes() + intervalMinutes);
      }
  
      return slots;
    }
  
    function parseTime(timeStr) {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
  
      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
  
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
  
      return date;
    }
  
    function formatTime(date) {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
  
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${ampm}`;
    }
  
    const businessHours = {
      0: [],
      1: generateTimeSlots('8:00 AM', '7:00 PM', 30),
      2: generateTimeSlots('8:00 AM', '7:00 PM', 30),
      3: generateTimeSlots('8:00 AM', '7:00 PM', 30),
      4: generateTimeSlots('8:00 AM', '7:00 PM', 30),
      5: generateTimeSlots('8:00 AM', '7:00 PM', 30),
      6: generateTimeSlots('9:00 AM', '4:00 PM', 30)
    };
  
    const steps = document.querySelectorAll('.step');
    const stepIndicators = document.querySelectorAll('.progress-step');
  
    const serviceSelect = document.getElementById('service-select');
    serviceSelect.addEventListener('change', function () {
      bookingData.service = this.value;
      bookingData.serviceName = this.options[this.selectedIndex].text;
    });
  
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    generateCalendar(currentMonth, currentYear);
  
    document.getElementById('prev-month').addEventListener('click', function () {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar(currentMonth, currentYear);
    });
  
    document.getElementById('next-month').addEventListener('click', function () {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar(currentMonth, currentYear);
    });
  
    document.getElementById('toStep2').addEventListener('click', function () {
      if (!bookingData.service) {
        alert("Please select a treatment before continuing.");
        return;
      }
      goToStep(2);
    });
  
    document.getElementById('backToStep1').addEventListener('click', function () {
      goToStep(1);
    });
  
    document.getElementById('toStep3').addEventListener('click', function () {
      if (!bookingData.date) {
        alert('Please select a date to continue.');
        return;
      }
      populateTimeSlots(bookingData.date);  // Populate the time slots
      goToStep(3);
    });
  
    document.getElementById('backToStep2').addEventListener('click', function () {
      goToStep(2);
    });
  
    document.getElementById('toStep4').addEventListener('click', function () {
      if (!bookingData.time) {
        alert('Please select a time slot to continue.');
        return;
      }
      goToStep(4);
    });
  
    document.getElementById('backToStep3').addEventListener('click', function () {
      goToStep(3);
    });
  
    document.getElementById('bookingForm').addEventListener('submit', function (e) {
      e.preventDefault();
  
      bookingData.name = document.getElementById('name').value;
      bookingData.email = document.getElementById('email').value;
      bookingData.phone = document.getElementById('phone').value;
      bookingData.notes = document.getElementById('notes').value;
  
      if (!bookingData.name || !bookingData.email || !bookingData.phone) {
        alert('Please fill in all required fields.');
        return;
      }
  
      document.getElementById('conf-service').textContent = bookingData.serviceName;
      document.getElementById('conf-date').textContent = formatDateForDisplay(bookingData.date);
      document.getElementById('conf-time').textContent = bookingData.time;
      document.getElementById('conf-name').textContent = bookingData.name;
      document.getElementById('conf-email').textContent = bookingData.email;
      document.getElementById('conf-phone').textContent = bookingData.phone;
  
      document.querySelector('.form-container > form').style.display = 'none';
      document.querySelector('.progress-bar').style.display = 'none';
      document.getElementById('confirmation').style.display = 'block';
  
      console.log('Booking data to be sent to server:', bookingData);
    });
  
    function goToStep(stepNumber) {
      steps.forEach(step => step.classList.remove('active'));
      document.getElementById(`step${stepNumber}`).classList.add('active');
  
      stepIndicators.forEach((indicator, index) => {
        if (index + 1 < stepNumber) {
          indicator.classList.remove('active');
          indicator.classList.add('completed');
          indicator.innerHTML = '<i class="fas fa-check"></i>';
        } else if (index + 1 === stepNumber) {
          indicator.classList.add('active');
          indicator.classList.remove('completed');
          indicator.innerHTML = stepNumber;
        } else {
          indicator.classList.remove('active', 'completed');
          indicator.innerHTML = index + 1;
        }
      });
    }
  
    function generateCalendar(month, year) {
      const calendarDays = document.getElementById('calendar-days');
      const monthTitle = document.getElementById('calendar-month');
      calendarDays.innerHTML = '';
  
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      monthTitle.textContent = `${monthNames[month]} ${year}`;
  
      const firstDay = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month + 1, 0).getDate();
      for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
      }
  
      const today = new Date();
      for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
  
        if (date.toDateString() === new Date().toDateString()) {
          dayElement.classList.add('today');
        }
  
        if (date < new Date(today.setHours(0, 0, 0, 0))) {
          dayElement.classList.add('disabled');
          dayElement.setAttribute('data-tooltip', 'Past date');
        } else if (date.getDay() === 0) {
          dayElement.classList.add('disabled');
          dayElement.setAttribute('data-tooltip', 'Closed on Sundays');
        } else if (fullyBookedDates.includes(dateStr)) {
          dayElement.classList.add('disabled');
          dayElement.setAttribute('data-tooltip', 'Fully booked');
        } else {
          dayElement.dataset.date = dateStr;
          dayElement.addEventListener('click', function () {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            bookingData.date = this.dataset.date;
          });
        }
  
        calendarDays.appendChild(dayElement);
      }
    }
  
    function formatDate(date) {
      return date.toISOString().split('T')[0];
    }
  
    function formatDateForDisplay(dateStr) {
      const date = new Date(dateStr);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  
    function populateTimeSlots(date) {
      const timeContainer = document.getElementById('timeContainer');
      timeContainer.innerHTML = '';
    
      if (bookedSlots[date]) {
        const availableSlots = businessHours[new Date(date).getDay()].filter(slot => !bookedSlots[date].includes(slot));
        availableSlots.forEach(slot => {
          const button = document.createElement('button');
          button.classList.add('time-slot');
          button.textContent = slot;
          button.addEventListener('click', function() {
            // Clear selection from all time slots
            document.querySelectorAll('.time-slot').forEach(btn => {
              btn.classList.remove('selected');
            });
            
            // Add selected class to clicked slot
            this.classList.add('selected');
            
            // Store the selected time
            bookingData.time = slot;
          });
          timeContainer.appendChild(button);
        });
      } else {
        businessHours[new Date(date).getDay()].forEach(slot => {
          const button = document.createElement('button');
          button.classList.add('time-slot');
          button.textContent = slot;
          button.addEventListener('click', function() {
            // Clear selection from all time slots
            document.querySelectorAll('.time-slot').forEach(btn => {
              btn.classList.remove('selected');
            });
            
            // Add selected class to clicked slot
            this.classList.add('selected');
            
            // Store the selected time
            bookingData.time = slot;
          });
          timeContainer.appendChild(button);
        });
      }
    }
  });
  