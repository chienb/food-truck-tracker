// Card component with neo-brutalism styling
class Card extends HTMLElement {
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
      default: 'neo-brutal',
      small: 'neo-brutal-sm',
    };

    const variantClass = variantClasses[this.variant] || variantClasses.default;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 1rem;
        }
        .card {
          padding: 1.5rem;
          background-color: white;
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translate(0.125rem, 0.125rem);
        }
        .neo-brutal {
          border: 2px solid black;
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .neo-brutal-sm {
          border: 2px solid black;
          box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }
      </style>
      <div class="card ${variantClass}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-card', Card);
