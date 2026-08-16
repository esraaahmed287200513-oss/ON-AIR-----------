/* =====================================================
   ON AIR بالعافية
   STATUS PAGE JAVASCRIPT
   Independent from ARCHIVE
===================================================== */


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLanguage();

    initSound();

    initStatusAnimation();

    initScrollReveal();

    initMenu();

});


/* =====================================================
   LANGUAGE SYSTEM
===================================================== */

const languageButtons =
    document.querySelectorAll(".language button");


/* -----------------------------------------------------
   UPDATE TRANSLATABLE CONTENT
----------------------------------------------------- */

function updateLanguageContent(language) {

    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );


    elements.forEach(element => {

        if (language === "ar") {

            element.textContent =
                element.dataset.ar;

        } else {

            element.textContent =
                element.dataset.en;

        }

    });

}


/* -----------------------------------------------------
   SET LANGUAGE
----------------------------------------------------- */

function setLanguage(language) {

    if (
        language !== "ar" &&
        language !== "en"
    ) {

        language = "ar";

    }


    /* HTML LANGUAGE */

    document.documentElement.lang =
        language;


    /* PAGE DIRECTION */

    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    /* UPDATE TEXT */

    updateLanguageContent(
        language
    );


    /* UPDATE BUTTONS */

    languageButtons.forEach(button => {

        const active =
            button.dataset.lang ===
            language;


        button.classList.toggle(
            "active",
            active
        );


        button.setAttribute(
            "aria-pressed",
            active
                ? "true"
                : "false"
        );

    });


    /* SAVE LANGUAGE */

    try {

        localStorage.setItem(
            "onAirLanguage",
            language
        );

    } catch (error) {

        console.log(
            "Language preference could not be saved."
        );

    }

}


/* -----------------------------------------------------
   LANGUAGE BUTTONS
----------------------------------------------------- */

languageButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const language =
                button.dataset.lang;


            setLanguage(
                language
            );

        }
    );

});


/* -----------------------------------------------------
   INITIALIZE LANGUAGE
----------------------------------------------------- */

function initLanguage() {

    let language = "ar";


    try {

        const savedLanguage =
            localStorage.getItem(
                "onAirLanguage"
            );


        if (
            savedLanguage === "ar" ||
            savedLanguage === "en"
        ) {

            language =
                savedLanguage;

        }

    } catch (error) {

        language = "ar";

    }


    setLanguage(
        language
    );

}


/* =====================================================
   SOUND SYSTEM
===================================================== */

let soundEnabled = true;


/* -----------------------------------------------------
   SOUND BUTTON
----------------------------------------------------- */

function initSound() {

    const soundButton =
        document.querySelector(
            ".sound-toggle"
        );


    if (!soundButton) {
        return;
    }


    /* INITIAL STATE */

    updateSoundButton(
        soundButton
    );


    soundButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            soundEnabled =
                !soundEnabled;


            updateSoundButton(
                soundButton
            );


            playInterfaceSound();

        }
    );

}


/* -----------------------------------------------------
   UPDATE SOUND BUTTON
----------------------------------------------------- */

function updateSoundButton(
    button
) {

    const arText =
        soundEnabled
            ? "الصوت يعمل"
            : "الصوت مغلق";


    const enText =
        soundEnabled
            ? "SOUND ON"
            : "SOUND OFF";


    button.dataset.ar =
        arText;


    button.dataset.en =
        enText;


    const currentLanguage =
        document.documentElement.lang ||
        "ar";


    button.textContent =
        currentLanguage === "ar"
            ? arText
            : enText;


    button.classList.toggle(
        "sound-off",
        !soundEnabled
    );

}


/* -----------------------------------------------------
   SIMPLE INTERFACE SOUND
----------------------------------------------------- */

function playInterfaceSound() {

    if (!soundEnabled) {
        return;
    }


    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return;
        }


        const context =
            new AudioContext();


        const oscillator =
            context.createOscillator();


        const gain =
            context.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.setValueAtTime(
            700,
            context.currentTime
        );


        gain.gain.setValueAtTime(
            0.0001,
            context.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.04,
            context.currentTime + 0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            context.currentTime + 0.08
        );


        oscillator.connect(
            gain
        );


        gain.connect(
            context.destination
        );


        oscillator.start();


        oscillator.stop(
            context.currentTime + 0.09
        );


    } catch (error) {

        console.log(
            "Interface sound unavailable."
        );

    }

}


/* =====================================================
   STATUS ANIMATION
===================================================== */

function initStatusAnimation() {

    const bars =
        document.querySelectorAll(
            ".status-bar"
        );


    if (!bars.length) {
        return;
    }


    /*
     * Start with empty bars.
     */

    bars.forEach(bar => {

        bar.classList.remove(
            "filled"
        );

    });


    /*
     * Animate them one by one.
     */

    bars.forEach(
        (bar, index) => {

            setTimeout(
                () => {

                    bar.classList.add(
                        "filled"
                    );

                },
                250 +
                index * 110
            );

        }
    );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    /*
     * Fallback
     * if IntersectionObserver
     * isn't supported.
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =====================================================
   MENU
===================================================== */

function initMenu() {

    const menuButton =
        document.querySelector(
            ".menu-button"
        );


    const menu =
        document.querySelector(
            ".mobile-menu"
        );


    if (
        !menuButton ||
        !menu
    ) {

        return;

    }


    menuButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            menu.classList.toggle(
                "open"
            );


            menuButton.classList.toggle(
                "active"
            );

        }
    );


    /*
     * Close menu when clicking
     * outside it.
     */

    document.addEventListener(
        "click",
        event => {

            if (
                !menu.contains(
                    event.target
                ) &&
                !menuButton.contains(
                    event.target
                )
            ) {

                menu.classList.remove(
                    "open"
                );


                menuButton.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =====================================================
   STATUS CARD HOVER / TOUCH
===================================================== */

const statusCards =
    document.querySelectorAll(
        ".status-card"
    );


statusCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.classList.add(
                "active"
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.classList.remove(
                "active"
            );

        }
    );

});


/* =====================================================
   REDUCE MOTION
===================================================== */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    reducedMotion.matches
) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}


reducedMotion.addEventListener(
    "change",
    event => {

        document.documentElement.classList.toggle(
            "reduce-motion",
            event.matches
        );

    }
);


/* =====================================================
   DEBUG
===================================================== */

console.log(
    "ON AIR — Status JavaScript loaded."
);