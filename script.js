document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.getElementById('timeline');
    const addItemBtn = document.getElementById('addItemBtn');
    const toggleDeleteModeBtn = document.getElementById('toggleDeleteModeBtn');
    const editModal = document.getElementById('editModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const editForm = document.getElementById('editForm');
    const imageUrlInput = document.getElementById('imageUrl');
    const titleInput = document.getElementById('title');
    let editingIndex = null;
    let deleteMode = false;
    let currentIndex = 0;

    // Charger la frise à partir de localStorage
    function loadTimeline() {
        const timelineData = JSON.parse(localStorage.getItem('timeline')) || [];
        timeline.innerHTML = ''; // Vider la frise avant de la recharger
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item');
            timelineItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}">
                <p>${item.title}</p>
                <button class="deleteBtn" data-index="${index}">X</button>
            `;
            timelineItem.addEventListener('click', () => selectItem(index));
            const deleteBtn = timelineItem.querySelector('.deleteBtn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteItem(index);
            });
            timeline.appendChild(timelineItem);
        });
        updateDeleteMode();
    }

    // Sélectionner un élément de la frise
    function selectItem(index) {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, idx) => {
            item.classList.remove('selected');
            if (idx === index) {
                item.classList.add('selected');
            }
        });
        currentIndex = index;
    }

    // Navigation avec les touches fléchées
    function handleKeyPress(event) {
        const items = document.querySelectorAll('.timeline-item');
        if (event.key === 'ArrowRight') {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                selectItem(currentIndex);
            }
        } else if (event.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
                selectItem(currentIndex);
            }
        }
    }

    // Ajouter un nouvel élément à la frise
    addItemBtn.addEventListener('click', () => {
        imageUrlInput.value = '';
        titleInput.value = '';
        editingIndex = null;
        editModal.style.display = 'flex';
    });

    // Modifier un élément de la frise
    function editItem(index) {
        const timelineData = JSON.parse(localStorage.getItem('timeline')) || [];
        imageUrlInput.value = timelineData[index].imageUrl;
        titleInput.value = timelineData[index].title;
        editingIndex = index;
        editModal.style.display = 'flex';
    }

    // Sauvegarder l'élément modifié
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const timelineData = JSON.parse(localStorage.getItem('timeline')) || [];
        const newItem = {
            imageUrl: imageUrlInput.value,
            title: titleInput.value
        };
        if (editingIndex === null) {
            // Ajouter un nouvel élément
            timelineData.push(newItem);
        } else {
            // Mettre à jour l'élément existant
            timelineData[editingIndex] = newItem;
        }
        localStorage.setItem('timeline', JSON.stringify(timelineData));
        editModal.style.display = 'none';
        loadTimeline();
    });

    // Fermer la fenêtre modale sans sauvegarder
    closeModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Supprimer un élément de la frise
    function deleteItem(index) {
        const timelineData = JSON.parse(localStorage.getItem('timeline')) || [];
        timelineData.splice(index, 1);
        localStorage.setItem('timeline', JSON.stringify(timelineData));
        loadTimeline();
    }

    // Basculer le mode suppression
    toggleDeleteModeBtn.addEventListener('click', () => {
        deleteMode = !deleteMode;
        updateDeleteMode();
    });

    // Mettre à jour l'état du mode suppression
    function updateDeleteMode() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item) => {
            if (deleteMode) {
                item.classList.add('delete-mode');
            } else {
                item.classList.remove('delete-mode');
            }
        });
    }

    // Initialiser la frise
    loadTimeline();

    // Ajouter un écouteur d'événements pour la navigation au clavier
    document.addEventListener('keydown', handleKeyPress);
});
