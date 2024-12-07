console.log('TOC script loaded');

function initTOC() {
    console.log('Initializing TOC');

    // Warte bis der Content vollständig gerendert ist
    setTimeout(() => {
        const headings = Array.from(document.querySelectorAll<HTMLElement>(
            ".prose h1[id], .prose h2[id], .prose h3[id], .prose h4[id], .prose h5[id], .prose h6[id]"
        ));
        const tocItems = document.querySelectorAll<HTMLElement>(".toc-item");

        console.log('Found headings:', headings.map(h => ({ id: h.id, text: h.textContent })));
        console.log('Found TOC items:', tocItems.length);

        if (!headings.length || !tocItems.length) {
            console.log('No headings or TOC items found');
            return;
        }

        function getActiveHeadingIndex(headings: HTMLElement[]): number {
            const scrollPosition = window.scrollY;
            const buffer = 150; // Puffer für bessere Erkennung

            for (let i = headings.length - 1; i >= 0; i--) {
                const heading = headings[i];
                const headingTop = heading.getBoundingClientRect().top + scrollPosition;

                if (scrollPosition >= headingTop - buffer) {
                    return i;
                }
            }

            return 0;
        }

        function updateActiveHeading() {
            const activeIndex = getActiveHeadingIndex(headings);
            const activeHeading = headings[activeIndex];

            if (!activeHeading) return;

            console.log('Active heading:', activeHeading.id);

            // Aktualisiere TOC
            tocItems.forEach(item => {
                const headingId = item.getAttribute('data-heading');
                const isActive = headingId === activeHeading.id;

                if (isActive && !item.classList.contains('active')) {
                    item.classList.add('active');
                } else if (!isActive && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        }

        // Optimierte Scroll-Handler-Funktion mit Throttling
        let isScrolling = false;
        function onScroll() {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    updateActiveHeading();
                    isScrolling = false;
                });
            }
        }

        // Event Listeners
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        // Click handler
        tocItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const id = item.getAttribute('data-heading');
                if (id) {
                    const heading = document.getElementById(id);
                    if (heading) {
                        // Scroll mit Offset
                        const offset = 100;
                        const elementPosition = heading.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        history.pushState(null, '', `#${id}`);

                        // Aktualisiere aktives Element nach dem Klick
                        tocItems.forEach(i => i.classList.remove('active'));
                        item.classList.add('active');
                    }
                }
            });
        });

        // Initiale Aktualisierung
        updateActiveHeading();
        console.log('TOC initialization completed');

        // Cleanup
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, 100); // Kleine Verzögerung für sicheres Rendering
}

// Exportiere die Setup-Funktion
export function setupTOC() {
    console.log('Setting up TOC');
    return initTOC();
}

// Führe Setup bei verschiedenen Ereignissen aus
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTOC);
} else {
    setupTOC();
}

// Reagiere auf Astro's View Transitions
document.addEventListener('astro:page-load', setupTOC);
document.addEventListener('astro:after-swap', setupTOC);
