import { CSSResultGroup, html, css, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";

@customElement("ha-tile-image")
export class HaTileImage extends LitElement {
  @property() public imageUrl?: string;

  protected render(): TemplateResult {
    return html`
      <div class="image">
        ${this.imageUrl ? html`<img src=${this.imageUrl} />` : null}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .image {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        display: flex;
        flex: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .image img {
        width: 100%;
        height: 100%;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-tile-image": HaTileImage;
  }
}