import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `portfolio-organism`
 * A component that renders a portafolio in a basic syntax
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PortfolioOrganism extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        :host div.top-row-container {
          display: flex;
          justify-content: space-between;
        }
        :host div.experience-container {
          width: 68%;
        }
        :host div.experience-container .enterprise-title {
          color: var(--portfolio-organism-enterprise-title-color, #000);
        }
        :host div.skills-container {
          width: 30%;
        }
        :host div.experience-container h1, :host div.skills-container h1, :host div.certifications-container h1, :host div.projects-container h1 {
          color: var(--portfolio-organism-main-titles-color, #000);
        }
        :host div.experience-item-container {
          background: var(--portfolio-organism-experience-item-background, #D3D3D3);
          padding: 0.5rem;
          margin: 0.5rem 0;
        }
        :host div.experience-item-container h2, :host div.experience-item-container h3 {
          margin: 0;
          color: var(--portfolio-organism-experience-item-title-color, #000);
        }
        :host div.experience-item-container hr {
          margin: 0;
          border: 0.5px solid var(--portfolio-organism-experience-item-title-divider-color, #000);
          width: 110%;
        }
        :host div.experience-item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        :host div.experience-item-head small {
          color: var(--portfolio-organism-experience-item-head-date-color, #000);
        }
        :host div.experience-item-head small a {
          color: var(--portfolio-organism-experience-item-head-source-color, #00F);
        }
        :host div.experience-item-description {
          padding: 0.5rem 0 0 0;
          color: var(--portfolio-organism-experience-item-description-color, #000);
        }
        :host ul.experience-item-skill-container li {
          padding: 0 auto;
          color: var(--portfolio-organism-experience-item-skill-text-color, #000);
        }
        :host div.experience-item-tools {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          align-items: flex-start;
        }
        :host div.experience-item-tools div.experience-item-tools-item {
          padding: 0.250rem;
          margin: 0.125rem 0.125rem;
          border-radius: 5px;
          background: var(--portfolio-organism-experience-item-tools-item-background, transparent);
          border: 1px solid var(--portfolio-organism-experience-item-tools-item-border-color, #000);
          color: var(--portfolio-organism-experience-item-tools-item-color, #000);
        }
        :host div.skills-item-container {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        :host div.skills-item-container span.skills-item {
          background: var(--portfolio-organism-skills-container-item-background, #D3D3D3);
          color: var(--portfolio-organism-skills-container-item-color, #000);
          margin: 0.250rem 0;
          padding: 0.5rem;
        }
        @media (max-width: 600px) {
          :host div.top-row-container {
            display: block;
          }
          :host div.top-row-container div.experience-container, :host div.top-row-container div.skills-container {
            width: 100%;
          }
        }
        :host .projects-item-container {
          display: flex;
          flex-wrap: wrap;
        }
        :host .projects-item {
          background: var(--portfolio-organism-projects-item-background, #D3D3D3);
          padding: 0.5rem;
          max-width: 150px;
        }
        :host div.projects-item h3 {
          text-align: center;
          color: var(--portfolio-organism-projects-item-title-color, #000);
        }
        :host div.projects-item p {
          text-align: center;
          color: var(--portfolio-organism-projects-item-description-color, #000);
        }
        :host div.projects-item-container a {
          text-align: center;
          display: block;
          color: inherit;
          text-decoration: none;
        }
      </style>
      <div class="top-row-container">
        <div class="experience-container">
          <h1>[[projectsTitle]]</h1>
          <template is="dom-repeat" items="[[portfolioData.projects]]" as="project">
              <div class="experience-item-container">
                <div class="experience-item-head">
                  <h3>[[project.name]]<hr class="small-divider"></h3><small>[[_hasEndDate(project.endDate)]] - <a target="_blank" href="[[project.url]]">View source</a></small>
                </div>
                <div class="experience-item-content-container">
                  <div class="experience-item-description">[[project.description]]</div>
                  <div class="experience-item-labours">
                    <ul class="experience-item-skill-container">
                      <template is="dom-repeat" items="[[project.tasks]]" as="task">
                        <li>[[task]]</li>
                      </template>
                    </ul>
                  </div>
                  <div class="experience-item-tools">
                    <template is="dom-repeat" items="[[project.technologies]]" as="techUsed">
                      <div class="experience-item-tools-item">[[techUsed]]</div>
                    </template>
                  </div>
                </div>
              </div>
          </template>
        </div>
        <div class="skills-container">
          <h1>[[skillsTitle]]</h1>
          <div class="skills-item-container">
            <template is="dom-repeat" items="[[portfolioData.skills]]" as="skill">
              <span class="skills-item">[[skill]]</span>
            </template>
          </div>
        </div>
      </div>

      <div class="experience-container">
        <h1>[[certificationsTitle]]</h1>
        <template is="dom-repeat" items="[[portfolioData.certifications]]" as="certification">

            <div class="experience-item-container">
              <div class="experience-item-head">
                <h2>[[certification.title]]<hr class="small-divider"></h2><small>[[_hasEndDate(certification.endDate)]]</small>
              </div>
              <div class="experience-item-content-container">
                <div class="experience-item-description">[[certification.description]]</div>
                <div class="experience-item-labours">
                  <ul class="experience-item-skill-container">
                    <template is="dom-repeat" items="[[certification.learned]]">
                      <li>[[item]]</li>
                    </template>
                  </ul>
                </div>
                <div class="experience-item-tools">
                  <template is="dom-repeat" items="[[certification.tools]]">
                    <div class="experience-item-tools-item">[[item]]</div>
                  </template>
                </div>
              </div>
            </div>

        </template>
      </div>
    `;
  }
  _hasEndDate(endDate) {
    return endDate || 'In progress';
  }
  static get properties() {
    return {
      portfolioTitle: {
        type: String,
        value: ''
      },
      skillsTitle: {
        type: String,
        value: ''
      },
      certificationsTitle: {
        type: String,
        value: ''
      },
      portfolioData: {
        type: Array,
        value: () => ({})
      },
      projectsTitle: {
        type: String,
        value: ''
      }
    };
  }
}

window.customElements.define('portfolio-organism', PortfolioOrganism);
