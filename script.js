
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



function firstPageAnimation() {
    let tl = gsap.timeline();

    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,


    }).to(".boundingelem", {
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        delay: -1,
        stagger: .2,
    }).from("#herofooter", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
    })
}

// jab mouse move ho to hum log skew kar paaye aur maximum skew and minimum skew define kar paaye, jab mouse move ho to chapta ki value badhe, aur jab mouse chalna band ho jaaye to chapta hata lo

var timeout;

function circlechaptakero() {
    // default scale value
    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;

    window.addEventListener("mousemove", function (details) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8, 1.2, details.clientX - xprev);

        yscale = gsap.utils.clamp(.8, 1.2, details.clientX - yprev);

        xprev = details.clientX;
        yprev = details.clientY;

        circlemousefollewer(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px ,${details.clientY}px) scale(1,1)`
        }, 100)

    })
}


function circlemousefollewer(xscale, yscale) {
    window.addEventListener("mousemove", function (details) {
        document.querySelector('#minicircle').style.transform = `translate(${details.clientX}px ,${details.clientY}px) scale(${xscale},${yscale})`
    })
}

circlechaptakero();
circlemousefollewer();
firstPageAnimation();

// teeno element ko select karo, uske baad teeno par ek mousemove lagao, jab mouse move ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki X & Y position pta karo, ab mouse ki X & y position ke bdle uss image ko show karo and uss image ko move karo, move karte waqt rotate karo and jaise jaise mouse tez chale vaise vaise rotation bhi tez ho jaye.

var rotate = 0;
var diffrot = 0

document.querySelectorAll(".elem").forEach(function (elem) {
    elem.addEventListener("mouseleave", function (details) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })

    })

    elem.addEventListener("mousemove", function (details) {

        var diff = details.clientY - elem.getBoundingClientRect().top;

        diffrot = details.clientX - rotate;

        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotation: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        })

    })
})