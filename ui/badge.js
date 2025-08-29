// Badge component with neo-brutalism styling for status pills
class Badge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['variant'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML !== '') {
      this.render();
    }
  }

  get variant() {
    return this.getAttribute('variant') || 'default';
  }

  render() {
    const variantClasses = {
      default: 'bg-black text-white',
      ready: 'bg-green-200 text-black',
      preparing: 'bg-yellow-200 text-black',
      waiting: 'bg-gray-200 text-black',
      secondary: 'bg-white text-black',
      outline: 'bg-white text-black',
    };

    const variantClass = variantClasses[this.variant] || variantClasses.default;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          border: 2px solid black;
          border-radius: 0.375rem;
          padding: 0.375rem 1rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1;
        }
        .bg-black {
          background-color: black;
        }
        .text-white {
          color: white;
        }
        .bg-green-200 {
          background-color: #bbf7d0;
        }
        .bg-yellow-200 {
          background-color: #fef08a;
        }
        .bg-gray-200 {
          background-color: #e5e7eb;
        }
        .bg-white {
          background-color: white;
        }
        .text-black {
          color: black;
        }
      </style>
      <span class="badge ${variantClass}">
        <slot></slot>
      </span>
    `;
  }
}

customElements.define('ui-badge', Badge);
