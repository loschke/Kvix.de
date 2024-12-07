import type { TransitionAnimation, TransitionDirectionalAnimations } from "astro:transitions";

// Navigation items in order (used to determine direction)
const NAV_ITEMS = ['/about', '/projekte', '/blog', '/playground', '/guides'];

export function diagonal({ duration = '0.4s' } = {}): TransitionDirectionalAnimations {
    return {
        forwards: {
            old: {
                name: 'diagonal-out',
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fillMode: 'both',
                styles: {
                    animation: `diagonal-out ${duration} cubic-bezier(0.4, 0, 0.2, 1) both`,
                },
            },
            new: {
                name: 'diagonal-in',
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fillMode: 'both',
                styles: {
                    animation: `diagonal-in ${duration} cubic-bezier(0.4, 0, 0.2, 1) both`,
                },
            },
        },
        backwards: {
            old: {
                name: 'diagonal-out-reverse',
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fillMode: 'both',
                styles: {
                    animation: `diagonal-out-reverse ${duration} cubic-bezier(0.4, 0, 0.2, 1) both`,
                },
            },
            new: {
                name: 'diagonal-in-reverse',
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fillMode: 'both',
                styles: {
                    animation: `diagonal-in-reverse ${duration} cubic-bezier(0.4, 0, 0.2, 1) both`,
                },
            },
        },
    };
}

// Add this to your global CSS
const styles = `
@keyframes diagonal-out {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-30px, 30px) scale(0.9);
    opacity: 0;
  }
}

@keyframes diagonal-in {
  0% {
    transform: translate(30px, -30px) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}

@keyframes diagonal-out-reverse {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(30px, 30px) scale(0.9);
    opacity: 0;
  }
}

@keyframes diagonal-in-reverse {
  0% {
    transform: translate(-30px, -30px) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}
`;

// Add the styles to a style tag
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
