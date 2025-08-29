// Input component with neo-brutalism styling
class Input extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['type', 'placeholder', 'value', 'disabled'];
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

  get type() {
    return this.getAttribute('type') || 'text';
  }

  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  addEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('input', (e) => {
      this.setAttribute('value', e.target.value);
      this.dispatchEvent(new CustomEvent('input', { 
        bubbles: true, 
        composed: true,
        detail: { value: e.target.value }
      }));
    });
  }

  render() {
    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .input-container {
          position: relative;
          width: 100%;
        }
        input {
          display: block;
          width: 100%;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          line-height: 1.5;
          padding: 0.5rem 0.75rem;
          background-color: white;
          border: 2px solid black;
          border-radius: 0.2rem;
          box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
          transition: all 0.2s ease;
        }
        input:focus {
          outline: none;
          box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
        }
        .opacity-50 {
          opacity: 0.5;
        }
        .cursor-not-allowed {
          cursor: not-allowed;
        }
        .w-40 {
          width: 10rem;
        }
      </style>
      <div class="input-container">
        <input 
          type="${this.type}" 
          placeholder="${this.placeholder}" 
          value="${this.value}" 
          ?disabled="${this.disabled}"
          class="${disabledClass} w-40"
        />
      </div>
    `;
  }
}

customElements.define('ui-input', Input);
