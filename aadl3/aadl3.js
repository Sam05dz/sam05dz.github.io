    // Chargement du style Bootstrap
    const bootstrapCDN = document.createElement('link');
    bootstrapCDN.rel = 'stylesheet';
    bootstrapCDN.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    document.head.appendChild(bootstrapCDN);

 function generateCaptcha(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function createButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.top = '10px';
        buttonContainer.style.right = '10px';
        buttonContainer.style.zIndex = '1000';
        buttonContainer.style.backgroundColor = 'white';
        buttonContainer.style.padding = '10px';
        buttonContainer.style.border = '1px solid black';
        buttonContainer.classList.add('p-2', 'bg-light', 'border', 'rounded');

        people.forEach(person => {
            const button = document.createElement('button');
            button.textContent = person.name;
            button.classList.add('btn', 'btn-primary', 'btn-block', 'mb-2');

            // Vérifie si le bouton a déjà été cliqué
            const buttonState = localStorage.getItem('buttonState_' + person.name);
            if (buttonState === 'clicked') {
                button.classList.add('btn-success'); // Change de couleur si déjà cliqué
            }

            button.addEventListener('click', () => {
                fillForm(person);
                button.classList.add('btn-success'); // Change de couleur après le clic
                localStorage.setItem('buttonState_' + person.name, 'clicked'); // Enregistre l'état du bouton
            });

            buttonContainer.appendChild(button);
        });

        document.body.appendChild(buttonContainer);
    }

    function fillForm(person) {
        waitForElement('#A17', function(element) {
            let wilayaValue = parseInt(person.wilaya, 10) + 1;
            element.value = wilayaValue.toString();
            element.dispatchEvent(new Event('change'));
        });

        waitForElement('#A22', function(element) {
            element.value = person.nin;
        });

        waitForElement('#A27', function(element) {
            element.value = person.nss;
        });

        waitForElement('#A13', function(element) {
            element.value = person.num;
        });

        waitForElement('#A33', function(element) {
            element.value = generateCaptcha(6);
        });
    }

    function waitForElement(selector, callback) {
        var element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            setTimeout(function() {
                waitForElement(selector, callback);
            }, 100);
        }
    }

    createButtons();

    function clickButton() {
        var button = document.getElementById('A55');
        if (button) {
            button.click();
        }
    }

    window.addEventListener('load', function() {
        clickButton();
    }, false);

    var checkbox = document.getElementById('A91_1');
    if (checkbox) {
        checkbox.checked = true;
    }

    document.addEventListener('contextmenu', function(event) {
        event.stopPropagation();
    }, true);

    document.addEventListener('copy', function(event) {
        event.stopPropagation();
    }, true);

    document.addEventListener('cut', function(event) {
        event.stopPropagation();
    }, true);

    document.addEventListener('paste', function(event) {
        event.stopPropagation();
    }, true);
