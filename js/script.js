/* ==========================================================================
   个人技术博客 —— 视图切换 + 文章数据 + 渲染
   ========================================================================== */

// ---------- 文章数据 ----------
// 新增文章：往 posts 数组里加一个对象即可，字段照抄现有格式。
const posts = [
  {
    id: 1,
    title: 'Git 入门：版本控制其实没那么难',
    date: '2026-09-02',
    tags: ['Git', '版本控制'],
    excerpt: '第一次接触 Git 总觉得命令又乱又难记，其实抓住「工作区 → 暂存区 → 仓库」这条主线，一切就清晰了。',
    content: `
      <p>很多人第一次用 Git 时，会对着 <code>git add</code>、<code>git commit</code>、<code>git push</code> 一脸懵。其实 Git 的核心模型只有三个区域：</p>
      <ul>
        <li><strong>工作区</strong>：你电脑上正在编辑的文件。</li>
        <li><strong>暂存区</strong>：准备提交的改动，相当于「购物车」。</li>
        <li><strong>仓库</strong>：已经保存下来的历史版本。</li>
      </ul>
      <h2>常用命令速查</h2>
      <pre><code>git init          # 初始化一个仓库
git status        # 查看当前状态
git add .         # 把所有改动加入暂存区
git commit -m "描述"  # 提交到本地仓库
git log --oneline # 查看提交历史</code></pre>
      <h2>一次提交的完整流程</h2>
      <p>修改文件后，通常走「三步走」：</p>
      <pre><code>git add .
git commit -m "feat: 新增文章列表"
git push          # 推送到远程仓库</code></pre>
      <blockquote>小技巧：commit message 写得清晰一点，未来回看历史时你会感谢现在的自己。</blockquote>
      <p>掌握这条主线后，再去理解分支（branch）、合并（merge）就会轻松很多——它们不过是在这条主线上「开副本」而已。</p>
    `,
  },
  {
    id: 2,
    title: '用 Figma MCP 打通设计到代码',
    date: '2026-09-05',
    tags: ['Figma', 'MCP', '效率'],
    excerpt: '设计稿和代码之间总有一道鸿沟。Figma MCP 让我们可以直接读取设计、甚至把设计一键转成代码，效率提升不止一倍。',
    content: `
      <p>以前拿到设计稿，前端要手动「像素级还原」，量间距、取色值、切图……费时又容易出错。Figma MCP 的出现，把设计和代码直接连了起来。</p>
      <h2>MCP 是什么</h2>
      <p>MCP（Model Context Protocol）是一套让 AI 工具与外部服务通信的标准协议。Figma 官方提供了 MCP 服务，AI 助手就能直接读取 Figma 文件的结构、样式和资源。</p>
      <h2>它能做什么</h2>
      <ul>
        <li><strong>读取设计</strong>：拿到画布上的组件、层级和样式。</li>
        <li><strong>设计转代码</strong>：根据设计生成对应的 HTML/CSS 或组件代码。</li>
        <li><strong>代码转设计</strong>：反过来把已有页面推回 Figma 做标注。</li>
      </ul>
      <h2>一个典型流程</h2>
      <pre><code>1. 在 Figma 里完成设计稿
2. 通过 MCP 让 AI 读取设计
3. 生成代码并在本地运行核对
4. 微调样式，完成交付</code></pre>
      <blockquote>心得：工具再好也只是辅助，理解设计意图和代码结构，才是打通两者真正的关键。</blockquote>
    `,
  },
  {
    id: 3,
    title: 'HTML5 + CSS3 + JS：从零搭一个个人博客',
    date: '2026-09-08',
    tags: ['HTML', 'CSS', 'JavaScript'],
    excerpt: '不用任何框架，只用最基础的三大件，也能搭出一个像样的个人博客。这篇记录我从零搭建的过程与思路。',
    content: `
      <p>这个博客本身，就是用纯 HTML5 + CSS3 + JS 手写的。没有构建工具、没有框架，打开 <code>index.html</code> 就能跑。</p>
      <h2>三个文件，各司其职</h2>
      <ul>
        <li><code>index.html</code> —— 页面结构，放导航和各个视图容器。</li>
        <li><code>style.css</code> —— 全部样式，用 CSS 变量统一主题色。</li>
        <li><code>script.js</code> —— 数据与交互，负责视图切换和文章渲染。</li>
      </ul>
      <h2>「单页」是怎么实现的</h2>
      <p>核心思路是把多个「视图」都写进一个页面，再用 JS 控制显隐：</p>
      <pre><code>function showView(name) {
  document.querySelectorAll('.view').forEach(v => {
    v.classList.toggle('is-hidden', v.id !== 'view-' + name);
  });
}</code></pre>
      <p>点导航就调用 <code>showView('posts')</code>，隐藏其他视图、显示目标视图，看起来就像多页面，其实一次加载完成。</p>
      <h2>文章是怎么渲染的</h2>
      <p>文章数据存在一个 JS 数组里，渲染时遍历生成 HTML 字符串，再一次性塞进容器。以后想加文章，往数组里添一条就行，完全不用改结构。</p>
      <blockquote>总结：最基础的工具往往最能帮你理解底层原理。先学会走，再考虑用框架跑起来。</blockquote>
    `,
  },
];

// ---------- 工具函数 ----------

/** 按 id 获取文章 */
function getPostById(id) {
  return posts.find(p => p.id === id);
}

/** 格式化日期为「2026年9月2日」 */
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
}

/** 生成标签 HTML */
function renderTags(tags) {
  return tags.map(t => `<span class="tag">${t}</span>`).join(' ');
}

/** 生成文章列表项 HTML */
function renderPostItem(post) {
  return `
    <article class="post-item" data-post-id="${post.id}">
      <h2 class="post-item-title">${post.title}</h2>
      <div class="post-meta">
        <span>${formatDate(post.date)}</span>
        <span class="dot">·</span>
        ${renderTags(post.tags)}
      </div>
      <p class="post-item-excerpt">${post.excerpt}</p>
    </article>
  `;
}

/** 生成文章详情 HTML */
function renderPostDetail(post) {
  return `
    <header>
      <h1>${post.title}</h1>
      <div class="post-meta">
        <span>${formatDate(post.date)}</span>
        <span class="dot">·</span>
        ${renderTags(post.tags)}
      </div>
    </header>
    <div class="post-body">${post.content}</div>
  `;
}

// ---------- 视图切换 ----------

const VIEWS = ['home', 'posts', 'post', 'about'];

function showView(name) {
  VIEWS.forEach(v => {
    document.getElementById('view-' + v).classList.toggle('is-hidden', v !== name);
  });

  // 同步导航高亮（详情页归属于「文章」）
  const activeNav = name === 'post' ? 'posts' : name;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('is-active', link.dataset.nav === activeNav);
  });

  // 回到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** 打开文章详情 */
function openPost(id) {
  const post = getPostById(id);
  if (!post) return;
  document.getElementById('post-detail').innerHTML = renderPostDetail(post);
  showView('post');
}

// ---------- 初始渲染 ----------

function init() {
  // 渲染精选文章（首页取前 3 篇）
  document.getElementById('featured-posts').innerHTML =
    posts.slice(0, 3).map(renderPostItem).join('');

  // 渲染完整文章列表
  document.getElementById('post-list').innerHTML = posts.map(renderPostItem).join('');
  document.getElementById('post-count').textContent = posts.length;

  // 页脚年份
  document.getElementById('year').textContent = new Date().getFullYear();
}

/** 监听文章卡片点击（事件委托） */
document.addEventListener('click', e => {
  const postItem = e.target.closest('[data-post-id]');
  if (postItem) {
    openPost(Number(postItem.dataset.postId));
  }
});

/** 监听导航点击 */
document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showView(el.dataset.nav);
  });
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
