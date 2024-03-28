const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

function emptyError(input, message) {
    const formDate = input.parentElement;
    formDate.classList.add('error');

    const errorMessage = formDate.querySelector('.error-empty');
    const invalidMessage = formDate.querySelector('.error-invalid');
    const errorForm = formDate.querySelector('.error-whole');
    
    errorMessage.innerText = message;
    errorMessage.style.display = 'bock';
    invalidMessage.style.display='none';

    // Tentukan jenis input dan tampilkan pesan error yang sesuai
    if (input === day || input === month || input === year ) {
        errorMessage.innerText = message;
        errorMessage.style.display = 'block';

    }
}

function successEmpty(years, months, days) {
    document.getElementById('resultY').innerText = years;
    document.getElementById('resultM').innerText = months;
    document.getElementById('resultD').innerText = days;
}

function emptyResult() {
    const dayValue = parseInt(day.value);
    const monthValue = parseInt(month.value);
    const yearValue = parseInt(year.value);

    // Validasi day, month, dan year
    if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
        emptyError(day, 'This field is required');
    } else if (dayValue >= 32) {
        emptyError(day, 'Must be a valid day');
    } else if (dayValue == 31) {
        emptyError(day, 'Must be a valid date');
    }

    if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
        emptyError(month, 'This field is required');
    } else if (monthValue >= 12) {
        emptyError(month, 'Must be a valid month');
    }

    if (isNaN(yearValue) || yearValue.toString().length !== 4) {
        emptyError(year, 'This field is required');
    } else if (yearValue > new Date().getFullYear()) {
        emptyError(year, 'Must be a in the past');
    }

    // Lakukan operasi untuk menghitung umur (contoh)
    const currentDate = new Date();
    const inputDate = new Date(yearValue, monthValue - 1, dayValue);

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    const years = Math.floor(daysDifference / 365);
    const months = Math.floor((daysDifference % 365) / 30);
    const days = daysDifference % 30;

    // Tampilkan hasil pada elemen <span>
    successEmpty(years, months, days);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-date');
    const button = document.querySelector('button[type="submit"]');
    
    button.addEventListener('click', function (e) {
        e.preventDefault(); // Menghentikan p
        emptyResult();
    });
});
