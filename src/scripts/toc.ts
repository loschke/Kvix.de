// Types
interface TOCHeading extends HTMLElement {
    id: string;
    textContent: string | null;
}

interface TOCItem extends HTMLElement {
    dataset: {
        heading: string;
    };
}

// Constants
const SCROLL_BUFFER = 150;
const SCROLL_OFFSET = 100;
const INIT_DELAY = 100;

// Utility functions
const debug = (message: string, data?: unknown): void => {
    if (import.meta.env.DEV) {
        console.log(`[TOC] ${message}`, data || '');
    }
};

const getHeadings = (): TOCHeading[] => {
    return Array.from(document.querySelectorAll<TOCHeading>(
        ".prose h1[id], .prose h2[id], .prose h3[id], .prose h4[id], .prose h5[id], .prose h6[id]"
    ));
};

const getTOCItems = (): TOCItem[] => {
    return Array.from(document.querySelectorAll<TOCItem>(".toc-item"));
};

const getActiveHeadingIndex = (headings: TOCHeading[]): number => {
    const scrollPosition = window.scrollY;

    for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const headingTop = heading.getBoundingClientRect().top + scrollPosition;

        if (scrollPosition >= headingTop - SCROLL_BUFFER) {
            return i;
        }
    }

    return 0;
};

const updateActiveHeading = (headings: TOCHeading[], tocItems: TOCItem[]): void => {
    const activeIndex = getActiveHeadingIndex(headings);
    const activeHeading = headings[activeIndex];

    if (!activeHeading) return;

    debug('Active heading:', activeHeading.id);

    tocItems.forEach(item => {
        const isActive = item.dataset.heading === activeHeading.id;
        item.classList.toggle('active', isActive);
    });
};

const scrollToHeading = (id: string): void => {
    const heading = document.getElementById(id);
    if (!heading) return;

    const elementPosition = heading.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    history.pushState(null, '', `#${id}`);
};

type CleanupFunction = () => void;

// Main initialization function
const initTOC = async (): Promise<CleanupFunction | void> => {
    debug('Initializing TOC');

    // Wait for content to be fully rendered
    await new Promise<void>((resolve) => {
        setTimeout(resolve, INIT_DELAY);
    });

    const headings = getHeadings();
    const tocItems = getTOCItems();

    debug('Found headings:', headings.map(h => ({ id: h.id, text: h.textContent })));
    debug('Found TOC items:', tocItems.length);

    if (!headings.length || !tocItems.length) {
        debug('No headings or TOC items found');
        return;
    }

    // Optimized scroll handler with requestAnimationFrame
    let isScrolling = false;
    const onScroll = (): void => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                updateActiveHeading(headings, tocItems);
                isScrolling = false;
            });
        }
    };

    // Event Listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Click handlers
    tocItems.forEach(item => {
        item.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const headingId = item.dataset.heading;
            if (headingId) {
                scrollToHeading(headingId);
                tocItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // Initial update
    updateActiveHeading(headings, tocItems);
    debug('TOC initialization completed');

    // Return cleanup function
    return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
    };
};

// Export setup function
export const setupTOC = async (): Promise<void> => {
    debug('Setting up TOC');
    try {
        await initTOC();
    } catch (error: unknown) {
        console.error('[TOC] Setup failed:', error instanceof Error ? error.message : 'Unknown error');
    }
};

// Initialize on various events
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => void setupTOC());
} else {
    void setupTOC();
}

// Handle Astro View Transitions
document.addEventListener('astro:page-load', () => void setupTOC());
document.addEventListener('astro:after-swap', () => void setupTOC());
