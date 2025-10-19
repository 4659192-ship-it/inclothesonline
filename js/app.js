// Animación al hacer scroll
const secciones = document.querySelectorAll('.fade');

const observador = new IntersectionObserver(
  (entradas, observer) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observer.unobserve(entrada.target); // solo anima una vez
      }
    });
  },
  { threshold: 0.2 }
);

secciones.forEach(seccion => observador.observe(seccion));

document.addEventListener("DOMContentLoaded", () => {

    // ==============================================
    // LÓGICA PARA EL PRIMER CARRUSEL: IMAGEN GRANDE (Auto-pase, Puntos, SIN Flechas)
    // ==============================================
    const diapositivasGrandes = document.querySelectorAll('.diapositiva-grande');
    const puntosContenedorGrande = document.getElementById('puntosCarruselGrande');

    let indiceDiapositivaGrande = 0;
    let intervaloAutoPlayGrande;

    function mostrarDiapositivasGrandes() {
        diapositivasGrandes.forEach(slide => {
            slide.style.display = 'none';
        });

        if (indiceDiapositivaGrande >= diapositivasGrandes.length) {
            indiceDiapositivaGrande = 0;
        }
        if (indiceDiapositivaGrande < 0) {
            indiceDiapositivaGrande = diapositivasGrandes.length - 1;
        }

        diapositivasGrandes[indiceDiapositivaGrande].style.display = 'block';
        actualizarPuntosGrandes();
    }

    function generarPuntosGrandes() {
        puntosContenedorGrande.innerHTML = '';
        for (let i = 0; i < diapositivasGrandes.length; i++) {
            const punto = document.createElement('span');
            punto.classList.add('punto-grande');
            punto.dataset.index = i;
            punto.addEventListener('click', () => {
                indiceDiapositivaGrande = i;
                mostrarDiapositivasGrandes();
                reiniciarAutoPlayGrande();
            });
            puntosContenedorGrande.appendChild(punto);
        }
        actualizarPuntosGrandes();
    }

    function actualizarPuntosGrandes() {
        const puntos = document.querySelectorAll('.puntos-navegacion-grande .punto-grande');
        puntos.forEach((punto, index) => {
            if (index === indiceDiapositivaGrande) {
                punto.classList.add('activo');
            } else {
                punto.classList.remove('activo');
            }
        });
    }

    function iniciarAutoPlayGrande() {
        intervaloAutoPlayGrande = setInterval(() => {
            indiceDiapositivaGrande++;
            mostrarDiapositivasGrandes();
        }, 5000); // Pasa cada 5 segundos
    }

    function detenerAutoPlayGrande() {
        clearInterval(intervaloAutoPlayGrande);
    }

    function reiniciarAutoPlayGrande() {
        detenerAutoPlayGrande();
        iniciarAutoPlayGrande();
    }

    // Inicialización del carrusel de imagen grande
    if (diapositivasGrandes.length > 0) { // Asegurarse de que haya diapositivas antes de inicializar
        generarPuntosGrandes();
        mostrarDiapositivasGrandes();
        iniciarAutoPlayGrande();
    }


    // ==============================================
});