// Button component with neo-brutalism styling
class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML !== '') {
      this.render();
    }
  }

  get variant() {
    return this.getAttribute('variant') || 'default';
  }

  get size() {
    return this.getAttribute('size') || 'default';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', (e) => {
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
    });
  }

  render() {
    const variantClasses = {
      default: 'btn btn-primary shadow-brutal',
      secondary: 'btn btn-secondary shadow-brutal-sm',
      destructive: 'btn bg-destructive text-white shadow-brutal-sm',
      outline: 'btn bg-white border-2 border-black shadow-brutal-sm',
      ghost: 'btn bg-transparent border-0 shadow-none hover:bg-secondary',
    };

    const sizeClasses = {
      default: 'py-2 px-4',
      sm: 'py-1 px-3 text-sm',
      lg: 'py-3 px-6 text-lg',
    };

    const variantClass = variantClasses[this.variant] || variantClasses.default;
    const sizeClass = sizeClasses[this.size] || sizeClasses.default;
    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        button {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
          border-radius: 0.2rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        button:hover:not(:disabled) {
          transform: translate(0.125rem, 0.125rem);
        }
        button:active:not(:disabled) {
          transform: translate(0.25rem, 0.25rem);
        }
        .shadow-brutal {
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .shadow-brutal-sm {
          box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }
        .btn {
          border: 2px solid black;
          padding: 0.5rem 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .btn-primary {
          background-color: black;
          color: white;
        }
        .btn-secondary {
          background-color: white;
          color: black;
        }
        .bg-destructive {
          background-color: hsl(0, 84.2%, 60.2%);
        }
        .bg-transparent {
          background-color: transparent;
        }
        .border-0 {
          border: none;
        }
        .opacity-50 {
          opacity: 0.5;
        }
        .cursor-not-allowed {
          cursor: not-allowed;
        }
      </style>
      <button class="${variantClass} ${sizeClass} ${disabledClass}" ?disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('ui-button', Button);
