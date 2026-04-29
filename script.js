document.addEventListener('DOMContentLoaded', function() {
    
const weddingDate = new Date('May 23, 2026 13:00:00').getTime();

const countdownInterval = setInterval(updateCountdown, 1000);

    const acceptBtn = document.querySelector('form > div:first-of-type button:first-child');
    const refuzBtn = document.querySelector('form > div:first-of-type button:last-child');
    const nrPersoane = document.getElementById('nrper');
    const checkboxGroup = document.querySelector('.checkbox-group');
    const submitBtn = document.querySelector('input[type="submit"]');
    
    nrPersoane.style.display = 'none';
    checkboxGroup.style.display = 'none';
    submitBtn.style.display = 'none';
    
    acceptBtn.addEventListener('click', function() {
        acceptBtn.classList.add('active');
        refuzBtn.classList.remove('active');
        
        nrPersoane.style.display = 'block';
        checkboxGroup.style.display = 'flex';
        submitBtn.style.display = 'block';
    });
    
    refuzBtn.addEventListener('click', function() {
        refuzBtn.classList.add('active');
        acceptBtn.classList.remove('active');
        
        nrPersoane.style.display = 'none';
        checkboxGroup.style.display = 'none';
        submitBtn.style.display = 'block';
        submitBtn.value = 'Trimite răspuns';
    });
    
    nrPersoane.addEventListener('keypress', function(e) {
        if (e.key < '0' || e.key > '9') {
            e.preventDefault();
        }
    });
    
    nrPersoane.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const numericOnly = pastedText.replace(/\D/g, '');
        if (numericOnly) {
            this.value = numericOnly;
        }
    });
    
    nrPersoane.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });
});

function updateCountdown() {
    const weddingDate = new Date('May 22, 2026 13:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

function showMessagePopup(message, isSuccess = true) {
    const popup = document.getElementById('messagePopup');
    const icon = document.getElementById('messageIcon');
    const text = document.getElementById('messageText');
    
    if (isSuccess) {
        icon.innerHTML = '<i class="fa-solid fa-check-circle"></i>';
        icon.className = 'message-popup-icon success';
    } else {
        icon.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i>';
        icon.className = 'message-popup-icon error';
    }
    
    text.textContent = message;
    popup.style.display = 'block';
    popup.classList.add('show');
}

function closeMessagePopup() {
    const popup = document.getElementById('messagePopup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

function showModeratorPopup(event) {
    event.preventDefault();
    const popup = document.getElementById('moderatorPopup');
    popup.style.display = 'block';
    popup.classList.add('show');
}

function closeModeratorPopup() {
    const popup = document.getElementById('moderatorPopup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}




const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section2, .section3, .countdown-section, .section4, .section5, .section6, .section7');
    const countdownItems = document.querySelectorAll('.countdown-item');
    const forms = document.querySelectorAll('form');
    
    sections.forEach(section => observer.observe(section));
    countdownItems.forEach(item => observer.observe(item));
    forms.forEach(form => observer.observe(form));
});

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwfEMGr6sZGYQNh3mAaJUkJy-BLvCn9US5HX8lfYWkCVHeRXFb--x2GxKbFAyEVxo8NSQ/exec'; // Înlocuiește cu URL-ul pe care l-ai copiat

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const acceptBtn = document.querySelector('form > div:first-of-type button:first-child');
    const refuzBtn = document.querySelector('form > div:first-of-type button:last-child');
    const submitBtn = document.querySelector('input[type="submit"]');
    
    if (!acceptBtn.classList.contains('active') && !refuzBtn.classList.contains('active')) {
        showMessagePopup('Vă rugăm să selectați ACCEPT sau REFUZ');
        return;
    }
    
    const status = acceptBtn.classList.contains('active') ? 'ACCEPT' : 'REFUZ';
    
    const formData = {
        nume: document.getElementById('nume').value.trim(),
        prenume: document.getElementById('prenume').value.trim(),
        status: status,
        nrper: status === 'ACCEPT' ? document.getElementById('nrper').value : '',
        coniac: status === 'ACCEPT' ? document.getElementById('coniac').checked : false,
        sampanie: status === 'ACCEPT' ? document.getElementById('sampanie').checked : false,
        vin: status === 'ACCEPT' ? document.getElementById('vin').checked : false,
        nealc: status === 'ACCEPT' ? document.getElementById('nealc').checked : false
    };
    
    if (!formData.nume || !formData.prenume) {
        showMessagePopup('Vă rugăm să completați numele și prenumele');
        return;
    }
    
    if (status === 'ACCEPT' && !formData.nrper) {
        showMessagePopup('Vă rugăm să specificați numărul de persoane');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.value = 'Se trimite...';
    
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        showMessagePopup('Mulțumim! Răspunsul dvs. a fost înregistrat cu succes!');
        
        setTimeout(() => {
            document.querySelector('form').reset();
            acceptBtn.classList.remove('active');
            refuzBtn.classList.remove('active');
            document.getElementById('nrper').style.display = 'none';
            document.querySelector('.checkbox-group').style.display = 'none';
        }, 2000);

        document.querySelector('form').reset();
        acceptBtn.classList.remove('active');
        refuzBtn.classList.remove('active');
        document.getElementById('nrper').style.display = 'none';
        document.querySelector('.checkbox-group').style.display = 'none';
        
    } catch (error) {
        console.error('Error:', error);
        showMessagePopup('A apărut o eroare. Vă rugăm să încercați din nou.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.value = 'CONFIRMĂ';
    }
});

