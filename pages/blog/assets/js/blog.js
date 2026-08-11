(function () {
    const grid = document.querySelector('.notes-card-grid');
    const search = document.querySelector('[data-notes-search]');
    const filter = document.querySelector('[data-notes-filter]');
    const sort = document.querySelector('[data-notes-sort]');
    const empty = document.querySelector('[data-notes-empty]');

    if (!grid || !search || !filter || !sort || !empty) {
        return;
    }

    const cards = Array.from(grid.querySelectorAll('[data-notes-card]'));
    const normalizedDate = (card) => Date.parse(card.dataset.date || '') || 0;

    const updateGallery = () => {
        const query = search.value.trim().toLowerCase();
        const selectedType = filter.value;
        const direction = sort.value === 'oldest' ? 1 : -1;

        const orderedCards = cards.toSorted((first, second) => {
            if (sort.value === 'title') {
                return first.dataset.title.localeCompare(second.dataset.title);
            }

            const firstDate = normalizedDate(first);
            const secondDate = normalizedDate(second);

            if (!firstDate || !secondDate) {
                return firstDate ? -1 : secondDate ? 1 : first.dataset.title.localeCompare(second.dataset.title);
            }

            return (firstDate - secondDate) * direction;
        });

        let visibleCount = 0;
        orderedCards.forEach((card) => {
            const matchesType = selectedType === 'all' || card.dataset.type === selectedType;
            const searchableText = card.textContent.toLowerCase();
            const matchesSearch = !query || searchableText.includes(query);
            const isVisible = matchesType && matchesSearch;

            card.hidden = !isVisible;
            grid.append(card);
            visibleCount += Number(isVisible);
        });

        empty.hidden = visibleCount > 0;
    };

    search.addEventListener('input', updateGallery);
    filter.addEventListener('change', updateGallery);
    sort.addEventListener('change', updateGallery);
    updateGallery();
})();
