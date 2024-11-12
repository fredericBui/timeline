document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.getElementById('timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    let currentIndex = 0;

    // Fonction pour mettre à jour l'élément sélectionné
    function updateSelectedItem() {
        timelineItems.forEach((item, index) => {
            item.classList.remove('selected');
            if (index === currentIndex) {
                item.classList.add('selected');
                item.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center'
                });
            }
        });
    }

    // Gestion de la navigation avec les touches fléchées
    function handleKeyPress(event) {
        if (event.key === 'ArrowRight') {
            if (currentIndex < timelineItems.length - 1) {
                currentIndex++;
            }
        } else if (event.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
            }
        }
        updateSelectedItem();
    }

    // Ajouter un écouteur pour les touches du clavier
    document.addEventListener('keydown', handleKeyPress);

    // Initialisation de l'affichage
    updateSelectedItem();
});
