document.addEventListener("DOMContentLoaded", function () {
    const switchButton = document.getElementById("nyelves");
    const pageTitle = document.getElementById("page-title");
    const usernameLabel = document.getElementById("username-label");
    const passwordLabel = document.getElementById("password-label");
    const confirmPasswordLabel = document.getElementById("confirm-password-label");
    const registerButton = document.getElementById("register-button");
    const loginButton = document.getElementById("login-button");
    let isHungarian = true;
    function switchLanguage() {
        if (isHungarian) {
            pageTitle.textContent = "Registration";
            usernameLabel.textContent = "Username:";
            passwordLabel.textContent = "Password:";
            confirmPasswordLabel.textContent = "Confirm Password:";
            registerButton.textContent = "Register";
            loginButton.textContent = "Login";
            switchButton.textContent = "Váltás Magyarra";
        } else {
            pageTitle.textContent = "Regisztráció";
            usernameLabel.textContent = "Felhasználónév:";
            passwordLabel.textContent = "Jelszó:";
            confirmPasswordLabel.textContent = "Jelszó megerősítése:";
            registerButton.textContent = "Regisztráció";
            loginButton.textContent = "Bejelentkezés";
            switchButton.textContent = "Switch to English";
        }
        isHungarian = !isHungarian;
    }
    switchButton.addEventListener("click", switchLanguage);
});
 
 
 
const cards = document.querySelectorAll('.card');
const fullTextOverlay = document.createElement('div');
fullTextOverlay.classList.add('full-text-overlay');
document.body.appendChild(fullTextOverlay);
cards.forEach(card => {
    card.addEventListener('click', function () {
        const fullText = card.querySelector('.card-content').innerText;
        const fullTextContainer = document.createElement('div');
        fullTextContainer.classList.add('full-text-container');
        fullTextContainer.innerHTML = `
            <p>${fullText}</p>
        `;
        fullTextOverlay.innerHTML = '';
        fullTextOverlay.appendChild(fullTextContainer);
        fullTextOverlay.style.display = 'flex';
    });
});
fullTextOverlay.addEventListener('click', function () {
    closeOverlay();
});
function closeOverlay() {
    fullTextOverlay.style.display = 'none';
};
 
 
 
let currentIndex = 0;
const images = document.querySelectorAll('.gallery img');
const totalImages = images.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
function showImage(index) {
    images.forEach(img => img.classList.remove('show'));
    images[index].classList.add('show');
}
function startAutoSlide() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }, 3000);
}
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    showImage(currentIndex);
});
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex);
});
startAutoSlide();
showImage(currentIndex);
 
 
 
document.querySelector(".menu-icon").addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("active");
});
 
 
 
 
 
document.addEventListener("DOMContentLoaded", function () {
    let userPackage = localStorage.getItem("userPackage") || "Új tag";
 
    let headers = document.querySelectorAll("th");
    headers.forEach((header, index) => {
        if (header.textContent.trim() === userPackage) {
            document.querySelectorAll("tr").forEach(row => {
                let cell = row.children[index];
                if (cell) cell.classList.add("highlight");
            });
        }
    });
});
 
function openModal(packageName, price) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("package-name").innerText = packageName;
    document.getElementById("package-price").innerText = "Ár: " + price + " EUR";
}
 
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
 
function purchasePackage() {
    let packageName = document.getElementById("package-name").innerText;
    let storeCard = document.getElementById("store-card").checked;
    let userBalance = 50;
    let packagePrice = parseFloat(document.getElementById("package-price").innerText.replace("Ár: ", "").replace(" EUR", ""));
    let transactionStatus = userBalance >= packagePrice ? "Sikeres vásárlás!" : "Tranzakció elutasítva";
    let cardStorageStatus = storeCard ? "A kártya adatait eltároltuk!" : "A kártya adatait nem tároltuk el";
 
    closeModal();
 
    setTimeout(() => {
        document.getElementById("transaction-status").innerText = transactionStatus;
        document.getElementById("card-storage-status").innerText = cardStorageStatus;
        document.getElementById("transaction-modal").style.display = "flex";
 
        if (userBalance >= packagePrice) {
            localStorage.setItem("userPackage", packageName);
        }
    }, 200);
}
 
 
 
document.addEventListener("DOMContentLoaded", function () {
    const cardNumberInput = document.getElementById("card-number");
    const cardIcon = document.getElementById("card-icon");
 
    // Kártyatípusok azonosító BIN prefixek és ikonok
    const cardTypes = {
        "Visa": { regex: /^4/, icon: "./visa_PNG4.png" },
        "MasterCard": { regex: /^5[1-5]/, icon: "./mastercard.png" },
        "American Express": { regex: /^3[47]/, icon: "./amex.png" },
        "Apple Pay": { regex: /Apple Pay/i, icon: "./Apple-Pay-Logo.png" },
        "Google Pay": { regex: /Google Pay/i, icon: "./googlepay.png" },
        "Maestro": { regex: /^(?:50|5[6-9]|6)/, icon: "./maestro.png" },
        "Revolut": { regex: /^(4169|4265|4354|4596|5111|5123|5300|5493|6761|6762|6763)/, icon: "./revolut.png" },
        "Samsung pay": { regex: /Samsung pay/i, icon: "./samsung-pay-logo.png" }
 
    };
 
    cardNumberInput.addEventListener("input", function () {
        const cardNumber = cardNumberInput.value.replace(/\D/g, ""); // Csak számok
 
        let detectedCard = null;
 
        for (const [card, data] of Object.entries(cardTypes)) {
            if (data.regex.test(cardNumber)) {
                detectedCard = data.icon;
                break;
            }
        }
 
        if (detectedCard) {
            cardIcon.src = `ikonok/${detectedCard.split('/').pop()}`; // Mappanév hozzáadása, de duplikáció nélkül
            cardIcon.style.display = "inline-block";
        } else {
            cardIcon.style.display = "none";
        }
        console.log("Detected card type:", detectedCard);
 
 
    });
});
 
 
function closeTransactionModal() {
    document.getElementById("transaction-modal").style.display = "none";
}
 
 
 
function toggleCVV() {
    const cvvInput = document.getElementById('cvv');
    const currentType = cvvInput.type;
 
    // Váltás password és text között
    cvvInput.type = currentType === 'password' ? 'text' : 'password';
}
 
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 0-indexelt hónap
    const year = today.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
 
    const expiryDateInput = document.getElementById("expiry-date");
    const dateError = document.getElementById("date-error");
 
    // A minimum dátum beállítása
    expiryDateInput.setAttribute("min", formattedDate);
 
    // Figyeljük a változást
    expiryDateInput.addEventListener("change", function () {
        const selectedDate = new Date(expiryDateInput.value);
 
        // Validáljuk a dátumot
        if (selectedDate < today) {
            // Ha a dátum régebbi, mint a mai, akkor hibaüzenetet mutatunk
            dateError.style.display = "inline";
            expiryDateInput.setCustomValidity("A dátumnak nem lehet régebbinek lennie a mai napnál.");
        } else {
            // Ha helyes, eltüntetjük a hibaüzenetet és tisztítjuk a validációt
            dateError.style.display = "none";
            expiryDateInput.setCustomValidity(""); // A form submission helyessé válik
        }
    });
});
 
document.getElementById("profile-picture").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById("preview");
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    }
});
 
document.getElementById("profile-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Adatok sikeresen frissítve!");
});
 
document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
   
    let currentUsername = document.getElementById('current-username').value;
    let password = document.getElementById('password').value;
   
    if (!currentUsername || !password) {
        alert('A módosításhoz adja meg a jelenlegi felhasználónevét és jelszavát!');
        return;
    }
   
    alert('Adatok sikeresen frissítve!');
});
 
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('profile-image');
            img.src = e.target.result;
            img.style.display = 'block';
            document.getElementById('upload-text').style.display = 'none';
        }
        reader.readAsDataURL(file);
    }
}
 
document.addEventListener("DOMContentLoaded", function () {
    let savedUsername = localStorage.getItem("username") || "Felhasználó";
    document.getElementById("username-display").textContent = savedUsername;
});
 
document.getElementById("profile-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let newUsername = document.getElementById("username").value;
    if (newUsername) {
        localStorage.setItem("username", newUsername);
        document.getElementById("username-display").textContent = newUsername;
        alert("Adatok sikeresen frissítve!");
    } else {
        alert("Adjon meg egy új felhasználónevet!");
    }
});
 