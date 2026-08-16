/* =====================================================
   ON AIR بالعافيةِ
   PRODUCTION + DELIVERABLES JAVASCRIPT
===================================================== */

"use strict";


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initProductionJournal();
    initDeliverables();
    initDeliverableStatus();

});


/* =====================================================
   PRODUCTION JOURNAL
===================================================== */

function initProductionJournal() {

    const productionDays =
        document.querySelectorAll(
            ".production-day"
        );


    if (!productionDays.length) {
        return;
    }


    productionDays.forEach(day => {

        const button =
            day.querySelector(
                ".day-header"
            );


        if (!button) {
            return;
        }


        /* -------------------------------------------------
           ACCESSIBILITY
        ------------------------------------------------- */

        button.setAttribute(
            "role",
            "button"
        );


        button.setAttribute(
            "tabindex",
            "0"
        );


        const isInitiallyOpen =
            day.classList.contains("open");


        button.setAttribute(
            "aria-expanded",
            isInitiallyOpen
                ? "true"
                : "false"
        );


        /* -------------------------------------------------
           CLICK
        ------------------------------------------------- */

        button.addEventListener(
            "click",
            () => {

                toggleProductionDay(
                    day,
                    productionDays
                );

            }
        );


        /* -------------------------------------------------
           KEYBOARD
        ------------------------------------------------- */

        button.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleProductionDay(
                        day,
                        productionDays
                    );

                }

            }
        );

    });

}


/* =====================================================
   TOGGLE PRODUCTION DAY
===================================================== */

function toggleProductionDay(
    selectedDay,
    allDays
) {

    const isOpen =
        selectedDay.classList.contains(
            "open"
        );


    /* -------------------------------------------------
       CLOSE ALL
    ------------------------------------------------- */

    allDays.forEach(day => {

        day.classList.remove(
            "open"
        );


        const button =
            day.querySelector(
                ".day-header"
            );


        if (button) {

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* -------------------------------------------------
       OPEN SELECTED
    ------------------------------------------------- */

    if (!isOpen) {

        selectedDay.classList.add(
            "open"
        );


        const button =
            selectedDay.querySelector(
                ".day-header"
            );


        if (button) {

            button.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }

}


/* =====================================================
   DELIVERABLES
===================================================== */

function initDeliverables() {

    const deliverableLinks =
        document.querySelectorAll(
            ".deliverable-link"
        );


    deliverableLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                /* -------------------------------------------------
                   EMPTY / PLACEHOLDER LINK
                ------------------------------------------------- */

                if (
                    !href ||
                    href === "#" ||
                    href.trim() === ""
                ) {

                    event.preventDefault();

                    handleLockedDeliverable(
                        link
                    );

                }

            }
        );

    });

}


/* =====================================================
   LOCKED DELIVERABLE
===================================================== */

function handleLockedDeliverable(
    element
) {

    const item =
        element.closest(
            ".deliverable-item"
        );


    if (
        item &&
        item.dataset.status === "available"
    ) {

        return;

    }


    showProductionNotification(
        "LOCKED",
        "هذا الملف غير متاح حاليًا."
    );

}


/* =====================================================
   DELIVERABLE STATUS
===================================================== */

function initDeliverableStatus() {

    const deliverables =
        document.querySelectorAll(
            ".deliverable-item"
        );


    if (!deliverables.length) {
        return;
    }


    deliverables.forEach(item => {

        const status =
            item.getAttribute(
                "data-status"
            );


        /* -------------------------------------------------
           REMOVE OLD STATES
        ------------------------------------------------- */

        item.classList.remove(
            "locked",
            "coming-soon",
            "available"
        );


        /* -------------------------------------------------
           APPLY CURRENT STATE
        ------------------------------------------------- */

        switch (status) {

            case "locked":

                item.classList.add(
                    "locked"
                );

                item.setAttribute(
                    "aria-disabled",
                    "true"
                );

                break;


            case "coming-soon":

                item.classList.add(
                    "coming-soon"
                );

                item.setAttribute(
                    "aria-disabled",
                    "true"
                );

                break;


            case "available":

                item.classList.add(
                    "available"
                );

                item.removeAttribute(
                    "aria-disabled"
                );

                break;


            default:

                break;

        }

    });

}


/* =====================================================
   DELIVERABLE INTERACTION
===================================================== */

document.addEventListener(
    "click",
    event => {

        const item =
            event.target.closest(
                ".deliverable-item"
            );


        if (!item) {
            return;
        }


        const status =
            item.getAttribute(
                "data-status"
            );


        if (
            status === "locked" ||
            status === "coming-soon"
        ) {

            event.preventDefault();


            const title =
                status === "coming-soon"
                    ? "COMING SOON"
                    : "LOCKED";


            const message =
                status === "coming-soon"
                    ? "هذا الملف سيكون متاحًا قريبًا."
                    : "هذا الملف غير متاح حاليًا.";


            showProductionNotification(
                title,
                message
            );

        }

    }
);


/* =====================================================
   PRODUCTION NOTIFICATION
===================================================== */

function showProductionNotification(
    title,
    message
) {

    let notification =
        document.querySelector(
            ".production-notification"
        );


    /* -------------------------------------------------
       CREATE NOTIFICATION
    ------------------------------------------------- */

    if (!notification) {

        notification =
            document.createElement(
                "div"
            );


        notification.className =
            "production-notification";


        notification.innerHTML = `
            <div class="production-notification-inner">
                <span class="production-notification-title"></span>
                <span class="production-notification-message"></span>
            </div>
        `;


        document.body.appendChild(
            notification
        );

    }


    /* -------------------------------------------------
       CONTENT
    ------------------------------------------------- */

    const titleElement =
        notification.querySelector(
            ".production-notification-title"
        );


    const messageElement =
        notification.querySelector(
            ".production-notification-message"
        );


    if (titleElement) {

        titleElement.textContent =
            title;

    }


    if (messageElement) {

        messageElement.textContent =
            message;

    }


    /* -------------------------------------------------
       SHOW
    ------------------------------------------------- */

    notification.classList.remove(
        "is-visible"
    );


    requestAnimationFrame(() => {

        notification.classList.add(
            "is-visible"
        );

    });


    /* -------------------------------------------------
       AUTO HIDE
    ------------------------------------------------- */

    clearTimeout(
        notification._hideTimer
    );


    notification._hideTimer =
        setTimeout(() => {

            notification.classList.remove(
                "is-visible"
            );

        }, 3200);

}


/* =====================================================
   PRODUCTION SCROLL REVEAL
===================================================== */

function initProductionReveal() {

    const elements =
        document.querySelectorAll(
            [
                ".production-day",
                ".deliverable-item",
                ".production-status",
                ".production-footer"
            ].join(",")
        );


    if (!elements.length) {
        return;
    }


    /* -------------------------------------------------
       REDUCED MOTION
    ------------------------------------------------- */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(element => {

            element.classList.add(
                "production-visible"
            );

        });

        return;

    }


    /* -------------------------------------------------
       OBSERVER
    ------------------------------------------------- */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    entry.target.classList.add(
                        "production-visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.08,
                rootMargin:
                    "0px 0px -6% 0px"
            }
        );


    elements.forEach(element => {

        element.classList.add(
            "production-reveal"
        );


        observer.observe(
            element
        );

    });

}


/* =====================================================
   INITIALIZE REVEAL
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initProductionReveal
);


/* =====================================================
   PRODUCTION PAGE READY
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "production-ready"
        );

    }
);


/* =====================================================
   DEBUG
===================================================== */

console.log(
    "ON AIR — Production JS loaded successfully."
);