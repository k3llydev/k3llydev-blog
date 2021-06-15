import {LitElement, html, css} from 'lit-element';
import moment from 'moment';

class GitBlogList extends LitElement {
  constructor() {
    super();
    this.paginationSize = 3;
    this.contentFile = 'content.md';
    this.titleFile = 'title.txt';
    this.branch = "master";
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host div.posts-container {
        padding: 8px;
      }

      :host div.post-item {
        max-width: 500px;
        padding: 0.5rem;
        margin: 16px auto;
        text-align: center;
      }

      :host div.post-item h2 {
        margin: 0 0 0.3rem 0;
        text-align: center;
      }

      :host div.post-item h2:hover {
        cursor: pointer;
      }

      :host .skeleton-bar {
        background: var(--git-blog-list-skeleton-bar-background, #666);
      }

      :host div.post-item h2.posts-item-title a {
        color: var(--git-blog-list-post-item-color, #000);
        text-decoration: var(--git-blog-list-post-item-text-decoration, none);
        margin: 0;
      }

      :host button.exit-post {
        background: var(--git-blog-list-exit-post-button-background, transparent);
        border: var(--git-blog-list-exit-post-button-border, 1px solid #000);
        color: var(--git-blog-list-exit-post-button-color, #000);
        @apply --git-blog-list-exit-post-button;
      }

      :host button.exit-post:hover {
        cursor: pointer;
      }

      :host .post-list-date {
        color: var(--git-blog-list-post-list-date-color, #000);
      }

      :host div.post-description {
        margin-top: 1rem;
      }

      :host div.post-description .author-value {
        color: var(--git-blog-list-description-author-value-color, #000);
      }

      :host div.post-description .date-value {
        color: var(--git-blog-list-description-date-value-color, #000);
      }

      :host article a {
        color: var(--git-blog-list-markdown-a-color, #0000FF);
        text-decoration: var(--git-blog-list-markdown-a-text-decoration, underline);
      }

      :host article pre {
        background: var(--git-blog-list-markdown-pre-background, #EEEEEE);
        padding: 1rem;
      }

      :host article h1 {
        color: var(--git-blog-list-markdown-h1-color, #000);
      }

      :host article h2 {
        color: var(--git-blog-list-markdown-h2-color, #000);
      }

      :host article h3 {
        color: var(--git-blog-list-markdown-h3-color, #000);
      }

      :host article img {
        max-width: 100%;
        height: 40vw;
        text-align: center;
      }
    `;
  }
  render() {
    return html`
    <link rel="stylesheet" href="https://unpkg.com/placeholder-loading/dist/css/placeholder-loading.min.css">
      ${
        this.listPost
          ? this._renderPost
          : html`<div class="posts-container">${this._renderPosts}</div>`
      }
    `;
  }
  async _getPostData(post) {
    const name = post.name;
    const {titleFile, contentFile, githubRepo, githubUser, branch} = this;
    const url = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${branch}/${name}`;
    const date = await fetch(`https://api.github.com/repos/${this.githubUser}/${this.githubRepo}/commits`).then(r=>r.json()).then(d=>d[d.length-1].commit.author.date);
    const content = await fetch(`${url}/${contentFile}`).then(r=>r.text());
    const title = await fetch(`${url}/${titleFile}`).then(r=>r.text());
    return {
      name,
      content,
      title,
      date
    };
  }

  get _loadingSkeleton() {
    const {paginationSize} = this;
    return [..."*".repeat(paginationSize)].map(_=>html`
          <div class="ph-col-12">
            <div class="ph-row">
              <div class="skeleton-bar ph-col-8 big"></div>
              <div class="skeleton-bar ph-col-6 big"></div>
              <div class="ph-col-12 empty"></div>
            </div>
          </div>`)
  }

  get _renderPosts() {
    return this.posts ? html`
    ${this.posts.map( (post, index) => html`
      <div class="post-item">
        <h2>
          <a @click="${this.showPost}" data-postid="${index}" class="posts-item-title">
            ${post.title}
          </a>
        </h2><small class="post-list-date">${moment(post.date).format('MMMM Do YYYY, h:mmA')}</small>
      </div>
    `)}` : this._loadingSkeleton;
  }

  get _renderPost() {
    const {currentPost} = this;
    return html`
      <button class="exit-post" @click="${this.exitPost}">Go back</button>
      <h1 class="post-title">${currentPost.title}</h1>
      <div class="post-description"><span class="author">Author: </span><span class="author-value">${currentPost.author}</span> <span class="date">Posted on: </span><span class="date-value">${moment(currentPost.date).format('MMMM Do YYYY, h:mmA')}</span></div>
      <br>
      <article .innerHTML="${this._transpileMarkdown(currentPost.content)}"></article>`;
  }

  _transpileMarkdown(markdown) {
    return marked(markdown, {
      baseUrl: `https://raw.githubusercontent.com/${this.githubUser}/${this.githubRepo}/${this.branch}/${this.currentPost.name}/`
    });
  }

  async loadPosts() {
    const url = `https://api.github.com/repos/${this.githubUser}/${this.githubRepo}/contents/`;
    let data = await fetch(url).then(r => r.json());
    data = data.filter(e=>e.type==='dir');
    data = await Promise.all(data.map(e=>this._getPostData(e)));
    this.posts = data;
  }
  firstUpdated() {
    this.loadPosts();
  }
  showPost(event) {
    const id = event.target.dataset.postid;
    this.listPost = true;
    this.currentPost = {
      title: this.posts[id].title,
      content: this.posts[id].content,
      name: this.posts[id].name,
      date: this.posts[id].date,
      author: this.githubUser
    }
  }
  exitPost() {
    this.listPost = false;
  }
  static get properties() {
    return {
      posts: {
        type: Array
      },
      contentFile: {
        type: String
      },
      titleFile: {
        type: String
      },
      listPost: {
        type: Boolean
      },
      currentPost: {
        type: Object
      },
      paginationSize: {
        type: Number
      },
      githubUser: {
        type: String
      },
      githubRepo: {
        type: String
      },
      branch: {
        type: String
      },
      postsTitle: {
        type: String
      }
    };
  }
}

window.customElements.define('git-blog-list', GitBlogList);
