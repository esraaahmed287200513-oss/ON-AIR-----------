/* =====================================================
   ON AIR بالعافية
   IDEA PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const jumpscare = document.getElementById("jumpscare");
    const flash = document.getElementById("flash");

    const textOne = document.getElementById("textOne");
    const comicOne = document.getElementById("comicOne");
    const textTwo = document.getElementById("textTwo");
    const comicTwo = document.getElementById("comicTwo");

    const cameraSound = document.getElementById("cameraSound");
    const ideaSound = document.getElementById("ideaSound");


    /* =================================================
       TIMELINE
    ================================================= */

    function startIdeaSequence() {

        /*
         * 0s
         * JUMPSCARE
         */

        jumpscare.classList.add("active");


        /*
         * نفس اللحظة:
         * CAMERA SOUND
         */

        cameraSound.currentTime = 0;

        cameraSound.play().catch(() => {
            console.log("Camera sound blocked until user interaction.");
        });


        /*
         * بعد الـ jumpscare
         * WHITE FLASH
         */

        setTimeout(() => {

            flash.classList.add("active");

        }, 650);


        /*
         * يبدأ صوت الفكرة
         * مع اختفاء الفلاش
         */

        setTimeout(() => {

            ideaSound.currentTime = 0;

            ideaSound.play().catch(() => {
                console.log("Idea sound blocked until user interaction.");
            });

        }, 900);


        /*
         * اختفاء الـ JUMPSCARE
         */

        setTimeout(() => {

            jumpscare.style.opacity = "0";

            setTimeout(() => {
                jumpscare.style.visibility = "hidden";
            }, 500);

        }, 800);


        /*
         * الجملة الأولى
         */

        setTimeout(() => {

            textOne.classList.add("show");

        }, 2200);


        /*
         * COMIC 1
         */

        setTimeout(() => {

            comicOne.classList.add("show");

        }, 4000);


        /*
         * الجملة الثانية
         */

        setTimeout(() => {

            textTwo.classList.add("show");

        }, 6000);


        /*
         * COMIC 2
         */

        setTimeout(() => {

            comicTwo.classList.add("show");

        }, 7800);

    }


    /* =================================================
       START
    ================================================= */

    setTimeout(() => {

        startIdeaSequence();

    }, 300);

});