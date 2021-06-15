import {html, css, LitElement} from 'lit';
import '@polymer/iron-icon/iron-icon.js';
import 'fa-icons';
import './components/git-blog-list/git-blog-list';

/**
 * @customElement
 * @litelement
 */
class Blog extends LitElement {

  static get properties() {
    return {
      currentPage: {
        type: String,
        value: 'home'
      },
      navigationElement: Object
    };
  }
  
  constructor() {
    super();
    // this.currentPage = 'home';
    // this.portfolio = data;
    // this.addEventListener('navigate-to-home', this._router);
    // this.addEventListener('navigate-to-portfolio', this._router);
    // this.addEventListener('navigate-to-blog', this._router);
  }

  static get styles() {
    return css`

      .header-container {
        display: block;
          width: 100%; 
          height: 60px; 
          background: var(--k3-main-background-color, #333333);
          font-family: var(--k3-main-font-family, 'Ubuntu Mono', monospace);
          color: white;
          font-size: calc(1em + 1vw);
      }
        header {
          display: flex;
          justify-content: space-between;
          height: 100%;
          @apply --navigation-handler-header;
        }

        :host div {
          margin: auto 1rem;
        }

        .link {
          color: var(--k3-primary-color, #a432a8);
          @apply --navigation-handler-link;
        }

        a:hover {
          cursor: pointer;
        }
      .home-center{
        width: 700px;
        height: 400px;
        position:absolute;
        left:0; right:0;
        top:0; bottom:0;
        margin:auto;
        max-width:100%;
        max-height:100%;
        overflow:hidden;    
      }
  
      .home-center-mobile{
        width: 96%;
        height: 50vh;
        position:absolute;
        left:0; right:0;
        top:0; bottom:0;
        margin:auto;
        max-width:100%;
        max-height:100%;
        overflow:hidden;    
        display: none;
        text-align: center;
        color: white;
        font-family: 'Ubuntu Mono', monospace;
      }
      
      @media (max-width: 600px) {
        .home-center {
          display: none;
        }
        .home-center-mobile{
          display: block;
        }
        .portfolio-container {
          display: block; 
        }
        .portfolio-description-container, .portfolio-cards-container {
          width: 96%;
        }
        .home-background-icon img {
          filter: opacity(0.3);
        }
      }
    
      .home-networks{
        position: absolute;
        bottom: 0;
        width: 100vw;
        height: 5vh;
        text-align: center;
      }
    
      .home-networks fa-icon {
        position: relative;
        margin: 0 0.5rem;
        text-decoration: none;
        font-size: calc(1em + 1vw);
      }

      .home-background-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: -11;
      }

      .home-background-icon img {
        width: 300px;
        height: 300px;
      }

      fa-icon {
        color: var(--k3-text-color-main, #33d8ff);
        --fa-icon-width: calc(1rem + 1vw);
        --fa-icon-height: calc(1rem + 1vw);
      }

      .home-profile{
        margin: 0;
        position: absolute;
        top: 85%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        color: red;
        text-align: center;
        display: flex;
      }
    
      .home-profile span{
        font-family: 'Ubuntu Mono', monospace;
        color: white;
      }
    
      .home-profile-item {
        text-align: center;
      }

      .safe-zone {
        width: 90%;
        padding: 15px;
        margin: 0 auto;
      }

      .portfolio h1, .blog h1 {
        font-family: 'Ubuntu Mono', monospace;
        color: var(--k3-text-color-third, #FFF);
        text-decoration: underline;
      }

      git-blog-list {
        /* Posts list */
        --git-blog-list-title-color: var(--k3-text-color-third, #FFF);
        --git-blog-list-post-list-date-color: var(--k3-bright-primary-color, #33d8ff);

        /* Exit button */
        --git-blog-list-exit-post-button-border: 1px solid var(--k3-text-color-main, #33d8ff);
        --git-blog-list-exit-post-button-color: #FFF;

        /* Post description */
        --git-blog-list-description-author-value-color: var(--k3-primary-color, #33d8ff);
        --git-blog-list-description-date-value-color: var(--k3-primary-color, #33d8ff);


        /* MARKDOWN */
        --git-blog-list-exit-post-button-background: var(--k3-text-color-main, #33d8ff);
        --git-blog-list-markdown-h1-color: var(--k3-primary-color, #33d8ff);
        --git-blog-list-markdown-h2-color: var(--k3-primary-color, #33d8ff);
        --git-blog-list-markdown-a-color: var(--k3-primary-color, #33d8ff);
        --git-blog-list-markdown-a-color: var(--k3-primary-color, #33d8ff);
        --git-blog-list-markdown-pre-background: #444;
        color: var(--k3-text-color-third, #FFF);
        font-family: 'Ubuntu Mono', monospace;
      }

      portfolio-organism {
        font-family: 'Ubuntu Mono', monospace;

        /** Titles color */
        --portfolio-organism-main-titles-color: #FFF;
        --portfolio-organism-experience-item-title-color: var(--k3-bright-primary-color, #33d8ff);
        --portfolio-organism-experience-item-title-divider-color: #666;
        --portfolio-organism-enterprise-title-color: #FFF;

        /** Experience items */
        --portfolio-organism-experience-item-background: #404040;
        --portfolio-organism-experience-item-head-date-color: #FFF;
        --portfolio-organism-experience-item-skill-text-color: #FFF;
        --portfolio-organism-experience-item-description-color: #FFF;
        --portfolio-organism-experience-item-head-source-color: var(--k3-bright-primary-color, #33d8ff);

        /** Experience item tools */
        /* --portfolio-organism-experience-item-tools-item-background: var(--k3-primary-color, #33d8ff); */
        --portfolio-organism-experience-item-tools-item-color: #D3D3D3;
        --portfolio-organism-experience-item-tools-item-border-color: #666;

        /** Skills */
        --portfolio-organism-skills-container-item-background: var(--k3-primary-color, #33d8ff);
        --portfolio-organism-skills-container-item-color: #FFF;

        /** Personal projects */
        --portfolio-organism-projects-item-background: #404040;
        --portfolio-organism-projects-item-title-color: var(--k3-bright-primary-color, #33d8ff);
        --portfolio-organism-projects-item-description-color: #FFF;
      }
    `;
  }

  _router(params) {
    this.currentPage = params.detail.navigateTo;
  }

  _showMail(e) {
    e.preventDefault();
    let mail = String.fromCharCode(104,101,108,108,111,64,107,51,108,108,121,46,100,101,118);
    alert(`Only for humans. \nContact me at: ${mail}`);
  }

  _blog() {
    return html`
      <div class="safe-zone blog">
        <git-blog-list githubUser="k3llydev" githubRepo="blog.k3lly.dev"></git-blog-list>
      </div>
    `;
  }

  _navigation() {
      return this._blog();
  }

  _goToPortfolio() {
    console.log('should navigate');
  }

  render() {
    return html`
    <div class="header-container">
      <header id="navigation-header">
        <div class="topleft-name">k3llydev (<a on-click="_gotoPortfolio"><span class="link">portfolio</span></a>)</div>
      </header>
    </div>
      ${ this._navigation() }
    `;
  }
  
}

window.customElements.define('main-app', Blog);
