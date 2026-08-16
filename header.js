/* =========================================
   LANGUAGE SWITCH
========================================= */

const headerLangButtons = document.querySelectorAll('[data-lang]');

const html = document.documentElement;


function setLanguage(lang) {

    html.setAttribute("lang", lang);

    headerLangButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.lang === lang) {
            button.classList.add("active");
        }

    });

    // اتجاه الصفحة
    if (lang === "ar") {
        html.setAttribute("dir", "rtl");
    } else {
        html.setAttribute("dir", "ltr");
    }
}


headerLangButtons.forEach(button => {

    button.addEventListener("click", () => {

        const lang = button.dataset.lang;

        setLanguage(lang);

    });

});


/* =========================================
   INITIAL LANGUAGE
========================================= */

// determine initial language: prefer localStorage, then html.lang, then fallback to page default
const initialLang = (function () {
    try {
        const stored = localStorage.getItem('lang');
        if (stored) return stored;
    } catch (e) { }
    return html.getAttribute('lang') || 'ar';
})();
setLanguage(initialLang);


/* =========================================
   SOUND BUTTON
========================================= */

const soundButton = document.getElementById('soundButton');
let soundOn = false;
let audio = null;

const existingAudio = document.getElementById('cameraSound');
if (existingAudio) {
    audio = existingAudio;
} else {
    audio = new Audio('sounds/background.mp3');
    // default safe settings
    audio.loop = true;
    audio.volume = 0.35;
}

if (soundButton) {
    soundButton.addEventListener('click', async () => {
        try {
            if (!soundOn) {
                await audio.play();
                soundOn = true;
                soundButton.textContent = 'SOUND OFF';
                soundButton.classList.add('active');
            } else {
                audio.pause();
                soundOn = false;
                soundButton.textContent = 'SOUND ON';
                soundButton.classList.remove('active');
            }
        } catch (err) {
            console.log('Audio could not start:', err);
        }
    });
}



/* =========================================
   MENU
========================================= */

const menuButton = document.getElementById("menuButton");

let menuOpen = false;


/*
   لو عندك Menu موجود في HTML
   بالـID ده:

   <nav id="mainMenu">
*/

const mainMenu = document.getElementById("mainMenu");


if (menuButton && mainMenu) {

    menuButton.addEventListener("click", () => {

        menuOpen = !menuOpen;

        mainMenu.classList.toggle("open", menuOpen);

        menuButton.textContent =
            menuOpen ? "CLOSE" : "MENU";

    });

}


/* =========================================
   CLOSE MENU WHEN CLICKING A LINK
========================================= */

if (mainMenu) {

    const menuLinks = mainMenu.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuOpen = false;

            mainMenu.classList.remove("open");

            menuButton.textContent = "MENU";

        });

    });

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && menuOpen) {

        menuOpen = false;

        if (mainMenu) {
            mainMenu.classList.remove("open");
        }

        if (menuButton) {
            menuButton.textContent = "MENU";
        }

    }

});