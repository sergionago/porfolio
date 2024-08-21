let carouselIndex = 0;
let scrollIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ball-animation").scrollIntoView({ behavior: "smooth" });

    setTimeout(() => { //Retardo para esperar a aplicar las funciones cuando finalice la animación de inicio
        showContent();
        writeCodeAnimation();
        !navigator.userAgentData.mobile ? setupScrolling() : document.body.classList.remove("overflowed");
    }, 4000);

    document.querySelector("#header-element #hero-menu #menu-button").addEventListener("click", () => {
        showMenu();
    });

    document.querySelectorAll("#header-element #hero-menu #menu-list li a").forEach(element => {
        element.addEventListener("click", () => {
            toSection(element.dataset.target);
        });
    });

    document.querySelectorAll("#header-element .mixLetters").forEach(element => {
        element.addEventListener("mouseenter", (event) => {
            const { id, innerText } = event.currentTarget;
            mixChars(id, innerText);
        });
    });

    document.querySelector("#tech-content button.nextItem").addEventListener("click", (event) => {
        carouselForward(event.currentTarget);
    });

    document.querySelector("#tech-content button.prevItem").addEventListener("click", (event) => {
        carouselBackward(event.currentTarget);
    });
});

async function writeCodeAnimation() {

    const codeText = //PEGADO A LA IZQUIERDA PARA QUE SE ESCRIBA DENTRO DE LA ETIQUETA PRE SIN TABULACIONES INNECESARIAS
        `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Porfolio</title>
</head>
<body>
    <main>
        <div id="web-developer-info">
            <h1>Sergio Navarro González</h1>
            <h2>Desarrollador Web</h2>
        </div>
    </main>
</body>
</html>`

    let index = 0;

    while (index <= codeText.length) {
        const char = codeText.slice(0, index);
        await write(char);
        index++;
    }

}

async function write(char) {
    const codeElement = document.getElementById("code-animation");
    return new Promise((resolve) => {
        setTimeout(() => {
            codeElement.innerHTML = Prism.highlight(char, Prism.languages.html);
            resolve();
        }, 50);
    })
}

function showContent() {
    const divToShow = document.getElementById("hero-content");
    const divToHide = document.getElementById("animation-container");
    divToHide.style.display = "none";
    divToShow.classList.add("active");
}

/*Scroll menú header*/
function toSection(idSection) {
    const elements = Array.from(document.querySelectorAll(".content-section"));
    const elementToScroll = document.getElementById(idSection);
    const index = elements.findIndex((element => element == elementToScroll));
    scrollIndex = index;

    elementToScroll.scrollIntoView({ behavior: 'smooth' });
}

/*Scroll entre secciones*/
function setupScrolling() {

    window.addEventListener("wheel", (event) => {
        const elements = document.querySelectorAll(".content-section");

        if (event.deltaY > 0 && scrollIndex < elements.length - 1) {
            event.preventDefault();
            scrollIndex++;
        } else if (event.deltaY < 0 && scrollIndex !== 0) {
            event.preventDefault();
            scrollIndex--;
        }

        elements[scrollIndex].scrollIntoView({ behavior: 'smooth' });
    }, { passive: false });
}

function showMenu() {
    const menuContent = document.getElementById("menu-content");
    const menuBars = document.getElementById("menu-bars");
    const menuList = document.getElementById("menu-list");

    if (menuContent.classList.contains("active")) {
        menuContent.classList.remove("active");
        menuBars.classList.remove("open");

        setTimeout(() => { //Retardo para que de tiempo a que termine la transición antes de ocultar los enlaces
            menuList.style.display = "none";
        }, 600);

    } else {
        menuContent.classList.add("active");
        menuBars.classList.add("open");
        menuList.style.display = "block";
    }

}

async function mixChars(idElement, originalString) {
    const mixElement = document.getElementById(idElement);
    const originalText = originalString;
    mixElement.innerText = "";

    let index = originalText.length - 1;


    for (let i = index; i !== 0; i--) {
        let randomChar = Math.floor(Math.random() * originalText.length);
        let char = originalText.charAt(randomChar);
        await writeMixedChar(idElement, char);
        index--;
    }

    setTimeout(() => {
        mixElement.innerText = originalText;
    }, 35);
}

async function writeMixedChar(idElement, charToWrite) {
    const mixElement = document.getElementById(idElement);
    let acumChar = "";
    acumChar = acumChar + charToWrite;

    return new Promise((resolve) => {
        setTimeout(() => {
            mixElement.innerText += acumChar;
            resolve();
        }, 35);
    });
}

function carouselBackward(button) {
    const nextButton = document.querySelector("#tech-content button.nextItem");
    const carousel = document.querySelector("#container-tech.carousel-container");
    const offset = document.querySelector(".carousel-container .carousel-item").clientWidth;

    if (carouselIndex > 0) {
        carouselIndex--;
        if (nextButton.classList.contains("inactive")) {
            nextButton.classList.remove("inactive");
        }
    }
    if (carouselIndex <= 0) {
        button.classList.add("inactive");
    }

    carousel.style.transform = `translateX(${-(offset * carouselIndex)}px)`;
}

function carouselForward(button) {
    const prevButton = document.querySelector("#tech-content button.prevItem");
    const carousel = document.querySelector("#container-tech.carousel-container");
    const carouselItems = document.querySelectorAll("#container-tech.carousel-container .carousel-item").length;
    const offset = document.querySelector(".carousel-container .carousel-item").clientWidth;

    if (carouselIndex < carouselItems - 1) {
        carouselIndex++;
        if (prevButton.classList.contains("inactive")) {
            prevButton.classList.remove("inactive");
        }
    }

    if (carouselIndex >= carouselItems - 1) {
        button.classList.add("inactive");
    }

    carousel.style.transform = `translateX(${-(offset * carouselIndex)}px)`;
}

function debounce(fn) {

    let timer;
    if (timer) {
        clearTimeout(timer)
    }
    return () => {
        timer = setTimeout(300)
    }
}