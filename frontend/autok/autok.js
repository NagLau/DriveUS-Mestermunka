document.addEventListener('DOMContentLoaded', function () {
    const inquiryButtons = document.querySelectorAll('.card-footer button');
    inquiryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const adTitle = button.closest('.card').querySelector('h3').innerText;
            const email = prompt("Add meg az e-mailedet!");
            if (!email) {
                alert("Kérlek add meg az e-mail címed!");
                return;
            }
            const mailtoLink = `mailto:driveus@gmail.comsubject=Érdeklődés: ${adTitle}&body=Érdeklődő: ${email}`;
            window.location.href = mailtoLink;  
        });
    });
});

function openModal(imgElement) {
    var modal = document.createElement('div'); 
    modal.classList.add('modal', 'open'); 
    var modalImg = document.createElement('img'); 
    modalImg.src = imgElement.src; 
    modal.appendChild(modalImg); 
    document.body.appendChild(modal); 
    modal.addEventListener('click', function() {
        modal.remove(); 
    });
};

document.querySelector('.filter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const carType = document.getElementById('car-type').value;
    const color = document.getElementById('color').value;
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.innerHTML = `<h3>Szűrt autók: ${carType} - ${color}</h3>`;
});

function sendEmail(carName) {
    const email = "driveus.car.rent@gmail.com"; 
    const subject = `Autófoglalás - ${carName}`;
    const body = `Tisztelt DriveUS!\n\nSzeretnék autót foglalni: ${carName}.\n\nKérem, vegyék fel velem a kapcsolatot a részletek egyeztetéséhez.\n\nÜdvözlettel,\n[Név]`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
};

function sendEmailFromButton(button) {
    const carName = button.parentElement.querySelector('h3').textContent; 
    sendEmail(carName);
};

