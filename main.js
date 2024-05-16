const spinner = document.querySelector('.spinner');
spinner.classList.add('visible'); // Mostrar el spinner al comienzo

let products = [];

fetch('/productos.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        products.forEach(product => {
            cargarProductos(product);
        });
    })
    .finally(() => {
        spinner.classList.remove('visible'); // Ocultar el spinner al completar la carga de productos
    });

const divContainer = document.querySelector('#containerCards');

function cargarProductos(product) {
    const div = document.createElement("div");
    div.classList.add("container__cards");
    div.innerHTML = `
        <div class="card" id="cards">
            <div class="card__img">
                <img src="${product.image}" alt="${product.title}" class="card__img-img">
            </div>
            <div class="card__description">
                <p class="card__description-product"> <i class="fa-solid fa-star"></i> ${product.title}</p>
                <p class="card__description-price">$ ${product.price}</p>
            </div>
        </div>
    `;
    divContainer.appendChild(div);
}

const botonesCategorias = document.querySelectorAll('.buttons__categories');
const titulo = document.querySelector('#titulo');

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        divContainer.innerHTML = "";
        titulo.innerHTML = e.currentTarget.textContent.trim();

        botonesCategorias.forEach(otherButton => {
            otherButton.querySelector('button').classList.remove("active");
        });
        e.currentTarget.querySelector('button').classList.add("active");

        if (e.currentTarget.id !== "todos") {
            const productsSelected = products.filter(product => product.categorie.toLowerCase() === e.currentTarget.id.toLowerCase());
            productsSelected.forEach(product => {
                cargarProductos(product);
            });

            /* compara si la categoria del json es lo mismo del id que esta en el html
            es decir, si categoria en el json vinos es igual al id vinos, en minuscula*/
        } else {
            titulo.innerHTML = "Todos los productos";
            products.forEach(product => {
                cargarProductos(product);
            });
        }
    });
});

const openMenu = document.querySelector('#open');
const closeMenu = document.querySelector('#close');
const menu = document.querySelector('#menu');
const botones = document.querySelectorAll('.buttons__categories'); // Agrega referencia a los botones de categoría

openMenu.addEventListener('click', () => {
    menu.classList.add('opened');
});

closeMenu.addEventListener('click', () => {
    menu.classList.remove('opened');
});

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        menu.classList.remove('opened');
        
    });
});
