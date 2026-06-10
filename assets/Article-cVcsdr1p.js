const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-markdown-a2d9Fo5F.js","assets/rolldown-runtime-COnpUsM8.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{i as t,r as n,t as r}from"./vendor-markdown-a2d9Fo5F.js";import{c as i,o as a,s as o}from"./vendor-router-OZLZLCui.js";import{n as s,t as c}from"./vendor-motion-ZnDoRK0J.js";import{a as l,f as u}from"./vendor-ui-DZfVG7Ko.js";import{r as d,t as f}from"./animations-DwIQ-tXu.js";var p=e(t(),1),m=n(),h={all:{label:`All`,tags:[]},web:{label:`Web`,tags:[`React`,`CSS`,`TypeScript`,`前端`,`JavaScript`,`HTML`]},AI:{label:`AI`,tags:[`AI`,`人工智能`,`机器学习`]},deeplearning:{label:`Deep Learning`,tags:[`深度学习`,`神经网络`,`Deep Learning`]},other:{label:`Other`,tags:[`Git`,`工具`,`协作`,`Other`]}},g=({articles:e})=>{let t=a(),[n,r]=(0,p.useState)(`all`),[i,o]=(0,p.useState)(!1),u=(0,p.useRef)(null),[g,_]=(0,p.useState)(``);(0,p.useEffect)(()=>{if(!i)return;let e=e=>{u.current&&!u.current.contains(e.target)&&o(!1)},t=e=>{e.key===`Escape`&&o(!1)};return document.addEventListener(`pointerdown`,e),document.addEventListener(`keydown`,t),()=>{document.removeEventListener(`pointerdown`,e),document.removeEventListener(`keydown`,t)}},[i]);let v=(0,p.useMemo)(()=>{let t=e;if(n!==`all`){let e=h[n].tags;t=t.filter(t=>t.tags.some(t=>e.includes(t)))}if(g.trim()){let e=g.toLowerCase();t=t.filter(t=>t.title.toLowerCase().includes(e)||t.summary.toLowerCase().includes(e)||t.tags.some(t=>t.toLowerCase().includes(e)))}return t},[e,n,g]),y=e=>{t(`/article/${e}`)},b=e=>{r(e),o(!1)},x=(e,t)=>t.trim()?e.split(RegExp(`(${t})`,`gi`)).map((e,n)=>e.toLowerCase()===t.toLowerCase()?(0,m.jsx)(`mark`,{className:`bg-yellow-300/50 text-inherit rounded px-0.5`,children:e},n):e):e;return(0,m.jsxs)(`div`,{className:`glass-shell h-full w-full overflow-auto rounded-[2rem] p-4 sm:p-6`,children:[(0,m.jsxs)(`div`,{className:`mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`,children:[(0,m.jsxs)(`div`,{className:`flex min-w-0 flex-1 items-center gap-3`,children:[(0,m.jsxs)(`div`,{ref:u,className:`relative flex-shrink-0`,children:[(0,m.jsx)(`button`,{className:`glass-control inline-flex h-10 w-10 items-center justify-center rounded-2xl`,"aria-label":`文章分类筛选`,onClick:()=>o(e=>!e),"aria-expanded":i,"aria-controls":`article-category-menu`,children:(0,m.jsxs)(`svg`,{className:`h-6 w-6 text-white`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,strokeWidth:2,children:[(0,m.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M4 6h16`}),(0,m.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M4 12h16`}),(0,m.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M4 18h16`})]})}),i&&(0,m.jsx)(`div`,{id:`article-category-menu`,role:`menu`,className:`glass-panel absolute left-0 top-full z-10 mt-1 min-w-[120px] rounded-xl py-2 shadow-lg`,children:Object.keys(h).map(e=>(0,m.jsx)(`button`,{onClick:()=>b(e),role:`menuitemradio`,"aria-checked":n===e,className:`w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200 rounded-sm ${n===e?`bg-white/10 font-medium`:``}`,children:h[e].label},e))})]}),(0,m.jsxs)(`div`,{className:`relative min-w-0 flex-1 max-w-md`,children:[(0,m.jsx)(l,{className:`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50`}),(0,m.jsx)(`input`,{type:`text`,value:g,onChange:e=>_(e.target.value),placeholder:`搜索文章...`,className:`glass-control h-10 w-full rounded-2xl py-2 pl-10 pr-10 text-sm placeholder-white/45`}),g&&(0,m.jsx)(`button`,{onClick:()=>_(``),"aria-label":`清除搜索`,className:`absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white`,children:`×`})]})]}),(0,m.jsx)(`h1`,{className:`text-2xl font-bold text-white flex-shrink-0`,children:`文章列表`})]}),(n!==`all`||g)&&(0,m.jsxs)(`div`,{className:`mb-4 text-white/60 text-sm flex items-center gap-2`,children:[n!==`all`&&(0,m.jsxs)(`span`,{children:[`分类：`,h[n].label,(0,m.jsx)(`button`,{onClick:()=>r(`all`),className:`ml-2 px-2 py-0.5 bg-white/10 rounded hover:bg-white/20 transition`,children:`清除`})]}),g&&(0,m.jsxs)(`span`,{children:[`搜索："`,g,`"`,(0,m.jsx)(`button`,{onClick:()=>_(``),className:`ml-2 px-2 py-0.5 bg-white/10 rounded hover:bg-white/20 transition`,children:`清除`})]})]}),(0,m.jsx)(c.div,{className:`space-y-4`,variants:d,initial:`initial`,animate:`animate`,children:(0,m.jsx)(s,{mode:`popLayout`,children:v.map((e,t)=>(0,m.jsxs)(c.article,{variants:f,layout:!0,initial:`initial`,animate:`animate`,exit:`exit`,transition:{delay:t*.05},onClick:()=>y(e.id),className:`rounded-2xl border border-white/15 bg-white/10 p-4 transition-all duration-200 hover:border-white/30 hover:bg-white/15`,whileHover:{y:-2},whileTap:{scale:.99},children:[(0,m.jsx)(`h2`,{className:`text-xl font-semibold text-white mb-2`,children:x(e.title,g)}),(0,m.jsxs)(`div`,{className:`flex items-center gap-4 mb-2 text-white/60 text-sm`,children:[(0,m.jsx)(`span`,{children:e.date}),(0,m.jsx)(`div`,{className:`flex gap-2 flex-wrap`,children:e.tags.map(e=>(0,m.jsx)(c.span,{className:`px-2 py-0.5 bg-white/10 rounded-full text-xs`,whileHover:{scale:1.1},children:x(e,g)},e))})]}),(0,m.jsx)(`p`,{className:`text-white/80 text-sm line-clamp-2`,children:x(e.summary,g)})]},e.id))})}),(0,m.jsx)(s,{mode:`wait`,children:v.length===0&&(0,m.jsx)(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:`text-center text-white/60 py-8`,children:n===`all`&&!g?`暂无文章`:`没有找到匹配的文章`})})]})};function _(e){let t=e.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);if(!t)return{frontmatter:{title:`无标题`,date:new Date().toISOString().split(`T`)[0],tags:[],summary:``},content:e};let[,n,r]=t,i={},a=n.split(`
`);for(let e of a){if(!e.trim())continue;let t=e.indexOf(`:`);if(t===-1)continue;let n=e.slice(0,t).trim(),r=e.slice(t+1).trim();r.startsWith(`[`)&&r.endsWith(`]`)&&(r=r.slice(1,-1).split(`,`).map(e=>e.trim().replace(/['"]/g,``))),i[n]=r}return{frontmatter:i,content:r}}function v(e,t){let{frontmatter:n,content:r}=_(t);return{id:e,frontmatter:n,content:r}}var y=Object.entries({"getting-started-with-react":`---
title: React 入门指南
date: 2024-01-15
tags: [React, 前端, 教程]
summary: 这是一篇关于 React 基础知识的入门教程，涵盖组件、状态、生命周期等核心概念。
---

# React 入门指南

## 什么是 React？

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发维护。

## 核心概念

### 1. 组件化开发

React 将 UI 拆分为独立的、可复用的组件：

\`\`\`jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### 2. 状态管理

使用 useState 管理组件内部状态：

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

### 3. 生命周期

useEffect Hook 让你在函数组件中执行副作用操作：

\`\`\`jsx
useEffect(() => {
    document.title = \`You clicked \${count} times\`;
}, [count]);
\`\`\`

## 总结

React 的组件化思想让代码更加模块化和可维护。
`,"css-flexbox-guide":`---
title: CSS Flexbox 完全指南
date: 2024-02-20
tags: [CSS, 布局, 前端]
summary: 深入理解 CSS Flexbox 布局，掌握现代网页布局的核心技术。
---

# CSS Flexbox 完全指南

## 什么是 Flexbox？

Flexbox 是一种一维布局模型，它提供了更有效的方式来排列、对齐和分配容器中项目的空间。

## 核心属性

### 容器属性

- \`display: flex\` - 定义 flex 容器
- \`flex-direction\` - 主轴方向（row | column）
- \`justify-content\` - 主轴对齐
- \`align-items\` - 交叉轴对齐

### 项目属性

- \`flex-grow\` - 放大比例
- \`flex-shrink\` - 缩小比例
- \`flex-basis\` - 初始大小
- \`align-self\` - 单独对齐

## 实用示例

### 水平垂直居中

\`\`\`css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
\`\`\`

### 等分布局

\`\`\`css
.item {
    flex: 1;
}
\`\`\`
`,"typescript-tips":`---
title: TypeScript 实用技巧
date: 2024-03-10
tags: [TypeScript, 前端, 技巧]
summary: 分享 TypeScript 开发中的实用技巧和最佳实践，提升代码质量。
---

# TypeScript 实用技巧

## 1. 类型推断

让 TypeScript 自动推断类型，减少冗余代码：

\`\`\`typescript
// 不推荐
const name: string = "hello";

// 推荐
const name = "hello";
\`\`\`

## 2. 联合类型与类型守卫

\`\`\`typescript
type Result = Success | Error;

function isSuccess(result: Result): result is Success {
    return result.status === 'success';
}
\`\`\`

## 3. 泛型约束

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
\`\`\`

## 4. 工具类型

- \`Partial<T>\` - 所有属性可选
- \`Required<T>\` - 所有属性必选
- \`Pick<T, K>\` - 选取部分属性
- \`Omit<T, K>\` - 排除部分属性
`,"git-workflow":`---
title: Git 工作流最佳实践
date: 2024-04-05
tags: [Git, 工具, 协作]
summary: 介绍团队协作中 Git 分支管理和工作流程的最佳实践。
---

# Git 工作流最佳实践

## 分支策略

### Git Flow

- \`main\` - 生产分支
- \`develop\` - 开发分支
- \`feature/*\` - 功能分支
- \`release/*\` - 发布分支
- \`hotfix/*\` - 热修复分支

### GitHub Flow

更简单的流程，适合持续部署：

1. 从 main 创建分支
2. 开发并提交
3. 创建 Pull Request
4. 代码审查
5. 合并到 main

## 提交信息规范

\`\`\`
<type>(<scope>): <subject>

<body>

<footer>
\`\`\`

### 类型

- \`feat\` - 新功能
- \`fix\` - 修复 bug
- \`docs\` - 文档更新
- \`style\` - 代码格式
- \`refactor\` - 重构
- \`test\` - 测试
`}).map(([e,t])=>v(e,t));function b(){return y.map(e=>({id:e.id,title:e.frontmatter.title,summary:e.frontmatter.summary,date:e.frontmatter.date,tags:e.frontmatter.tags}))}function x(e){let t=y.find(t=>t.id===e);if(t)return{id:t.id,title:t.frontmatter.title,summary:t.frontmatter.summary,date:t.frontmatter.date,tags:t.frontmatter.tags,content:t.content}}var S=({scrollRef:e})=>{let[t,n]=(0,p.useState)(0);return(0,p.useEffect)(()=>{let t=e.current;if(!t)return;let r=()=>{let e=t.scrollHeight-t.clientHeight;n(e>0?t.scrollTop/e*100:0)};return t.addEventListener(`scroll`,r,{passive:!0}),r(),()=>t.removeEventListener(`scroll`,r)},[e]),(0,m.jsx)(`div`,{className:`pointer-events-none absolute left-0 right-0 top-0 z-20 h-1 bg-white/10`,children:(0,m.jsx)(`div`,{className:`h-full bg-gradient-to-r from-cyan-200 to-fuchsia-300 transition-all duration-150`,style:{width:`${t}%`}})})},C=({content:e,wordsPerMinute:t=300})=>{let n=(e.match(/[一-龥]/g)||[]).length+(e.replace(/[一-龥]/g,``).match(/[a-zA-Z]+/g)||[]).length;return(0,m.jsxs)(`span`,{className:`text-sm text-white/60`,children:[Math.ceil(n/t),` 分钟阅读`]})},w=({headings:e,scrollRef:t})=>{let[n,r]=(0,p.useState)(``);if((0,p.useEffect)(()=>{let n=t.current;if(!n)return;let i=()=>{let t=``;e.forEach(e=>{let r=document.getElementById(e.id);if(!r)return;let i=n.getBoundingClientRect().top;r.getBoundingClientRect().top-i<=120&&(t=e.id)}),r(t)};return n.addEventListener(`scroll`,i,{passive:!0}),i(),()=>n.removeEventListener(`scroll`,i)},[e,t]),e.length===0)return null;let i=e=>{let n=t.current,r=document.getElementById(e);if(!n||!r)return;let i=r.getBoundingClientRect().top-n.getBoundingClientRect().top+n.scrollTop-16;n.scrollTo({top:Math.max(i,0),behavior:`smooth`})};return(0,m.jsxs)(`nav`,{className:`glass-panel-soft rounded-2xl p-4`,children:[(0,m.jsx)(`h3`,{className:`mb-3 text-sm font-semibold text-white/80`,children:`目录`}),(0,m.jsx)(`ul`,{className:`space-y-1`,children:e.map(e=>(0,m.jsx)(`li`,{children:(0,m.jsx)(`button`,{onClick:()=>i(e.id),className:`w-full rounded-xl px-2 py-1 text-left text-sm transition-colors ${e.level===1?`font-medium`:e.level===2?`pl-4`:`pl-6`} ${n===e.id?`bg-white/16 text-white`:`text-white/58 hover:bg-white/10 hover:text-white`}`,children:e.text})},e.id))})]})},T=({variant:e=`text`,width:t,height:n,className:r=``})=>{let i={text:`rounded h-4`,rectangular:`rounded-lg`,circular:`rounded-full`},a={text:{width:`100%`,height:`1rem`},rectangular:{width:`100%`,height:`100px`},circular:{width:`40px`,height:`40px`}},o=t||a[e].width,s=n||a[e].height;return(0,m.jsx)(c.div,{className:`bg-white/10 ${i[e]} ${r}`,style:{width:typeof o==`number`?`${o}px`:o,height:typeof s==`number`?`${s}px`:s},animate:{opacity:[.5,1,.5]},transition:{duration:1.5,repeat:1/0,ease:`easeInOut`}})};function E(e){return e.toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu,``).replace(/\s+/g,`-`).replace(/-+/g,`-`).replace(/^-|-$/g,``)}function D(e){let t=new Map,n=null;return e.split(`
`).map((e,r)=>{let i=e.match(/^\s{0,3}(```+|~~~+)/);if(i){let e=i[1][0];return n===e?n=null:n===null&&(n=e),null}if(n!==null)return null;let a=e.match(/^\s{0,3}(#{1,3})\s+(.+)$/);if(!a)return null;let o=a[1].length,s=a[2].replace(/\s+#+\s*$/,``).trim(),c=E(s)||`heading-${r}`,l=t.get(c)??0;return t.set(c,l+1),{id:l===0?c:`${c}-${l+1}`,text:s,level:o}}).filter(e=>e!==null)}var O=(0,p.lazy)(()=>i(()=>import(`./vendor-markdown-a2d9Fo5F.js`).then(e=>e.n),__vite__mapDeps([0,1])));function k(e){return()=>t=>{let n=0,r=t=>{if(t.type===`heading`&&t.depth!==void 0&&t.depth>=1&&t.depth<=3){let r=e[n++];r&&(t.data={...t.data,hProperties:{...t.data?.hProperties,id:r}})}t.children?.forEach(r)};r(t)}}var A=()=>{let{id:e}=o(),t=a(),n=x(e||``),i=(0,p.useRef)(null),s=(0,p.useMemo)(()=>n?D(n.content):[],[n]),c=(0,p.useMemo)(()=>k(s.map(e=>e.id)),[s]),l=()=>{t(`/article`)};return n?(0,m.jsxs)(`div`,{className:`relative h-full w-full`,children:[(0,m.jsx)(S,{scrollRef:i}),(0,m.jsxs)(`div`,{ref:i,className:`glass-shell relative h-full w-full overflow-auto rounded-[2rem] p-4 text-left sm:p-6`,children:[(0,m.jsxs)(`button`,{onClick:l,className:`glass-control mb-6 inline-flex h-10 items-center gap-2 rounded-2xl px-3 text-sm font-medium`,children:[(0,m.jsx)(u,{className:`h-4 w-4`}),`返回列表`]}),(0,m.jsxs)(`header`,{className:`mb-8 pb-6 border-b border-white/20`,children:[(0,m.jsx)(`h1`,{className:`mb-4 text-left text-3xl font-bold leading-tight text-white sm:text-4xl`,children:n.title}),(0,m.jsxs)(`div`,{className:`flex items-center gap-4 text-white/60 text-sm flex-wrap`,children:[(0,m.jsx)(`span`,{children:n.date}),(0,m.jsx)(C,{content:n.content}),(0,m.jsx)(`div`,{className:`flex gap-2`,children:n.tags.map(e=>(0,m.jsx)(`span`,{className:`px-2 py-0.5 bg-white/10 rounded-full`,children:e},e))})]})]}),(0,m.jsxs)(`div`,{className:`flex gap-6`,children:[(0,m.jsx)(`aside`,{className:`hidden lg:block flex-shrink-0 w-48`,children:(0,m.jsx)(`div`,{className:`sticky top-4`,children:(0,m.jsx)(w,{headings:s,scrollRef:i})})}),(0,m.jsx)(`article`,{className:`flex-1 text-left min-w-0`,children:(0,m.jsx)(p.Suspense,{fallback:(0,m.jsxs)(`div`,{className:`space-y-4`,children:[(0,m.jsx)(T,{variant:`text`,height:`1.5rem`,width:`60%`}),(0,m.jsx)(T,{variant:`text`,height:`1rem`}),(0,m.jsx)(T,{variant:`text`,height:`1rem`}),(0,m.jsx)(T,{variant:`text`,height:`1rem`,width:`80%`})]}),children:(0,m.jsx)(O,{remarkPlugins:[r,c],components:{code({className:e,children:t,...n}){return e===void 0?(0,m.jsx)(`code`,{className:`bg-white/10 px-1.5 py-0.5 rounded text-sm`,...n,children:t}):(0,m.jsx)(`code`,{className:`block bg-white/10 p-4 rounded-xl text-sm overflow-x-auto`,...n,children:t})},pre({children:e}){return(0,m.jsx)(`pre`,{className:`my-4`,children:e})},h1:({children:e,id:t})=>(0,m.jsx)(`h1`,{id:t,className:`mt-8 mb-4 scroll-mt-4 text-2xl font-bold text-white`,children:e}),h2:({children:e,id:t})=>(0,m.jsx)(`h2`,{id:t,className:`mt-6 mb-3 scroll-mt-4 text-xl font-semibold text-white`,children:e}),h3:({children:e,id:t})=>(0,m.jsx)(`h3`,{id:t,className:`mt-5 mb-2 scroll-mt-4 text-lg font-medium text-white`,children:e}),h4:({children:e})=>(0,m.jsx)(`h4`,{className:`mt-4 mb-2 text-base font-medium text-white`,children:e}),p:({children:e})=>(0,m.jsx)(`p`,{className:`text-white/90 leading-relaxed mb-4`,children:e}),ul:({children:e})=>(0,m.jsx)(`ul`,{className:`list-disc list-inside text-white/90 mb-4 space-y-2 pl-4`,children:e}),ol:({children:e})=>(0,m.jsx)(`ol`,{className:`list-decimal list-inside text-white/90 mb-4 space-y-2 pl-4`,children:e}),li:({children:e})=>(0,m.jsx)(`li`,{className:`text-white/90 leading-relaxed`,children:e}),a:({href:e,children:t})=>(0,m.jsx)(`a`,{href:e,className:`text-blue-400 hover:text-blue-300 underline`,target:`_blank`,rel:`noopener noreferrer`,children:t}),blockquote:({children:e})=>(0,m.jsx)(`blockquote`,{className:`border-l-4 border-white/30 pl-4 italic text-white/70 my-4`,children:e}),table:({children:e})=>(0,m.jsx)(`div`,{className:`overflow-x-auto my-4`,children:(0,m.jsx)(`table`,{className:`min-w-full border border-white/20 rounded-lg`,children:e})}),thead:({children:e})=>(0,m.jsx)(`thead`,{className:`bg-white/10`,children:e}),tbody:({children:e})=>(0,m.jsx)(`tbody`,{className:`divide-y divide-white/10`,children:e}),tr:({children:e})=>(0,m.jsx)(`tr`,{className:`border-b border-white/10`,children:e}),th:({children:e})=>(0,m.jsx)(`th`,{className:`px-4 py-2 text-left text-white font-medium`,children:e}),td:({children:e})=>(0,m.jsx)(`td`,{className:`px-4 py-2 text-white/80`,children:e}),hr:()=>(0,m.jsx)(`hr`,{className:`border-white/20 my-6`}),img:({src:e,alt:t})=>(0,m.jsx)(`img`,{src:e,alt:t,className:`max-w-full rounded-lg my-4`})},children:n.content})})})]})]})]}):(0,m.jsxs)(`div`,{className:`glass-shell flex h-full w-full flex-col items-center justify-center rounded-[2rem] p-6`,children:[(0,m.jsx)(`p`,{className:`text-white/80 text-xl mb-4`,children:`文章不存在`}),(0,m.jsxs)(`button`,{onClick:l,className:`glass-control inline-flex h-10 items-center gap-2 rounded-2xl px-3 text-sm font-medium`,children:[(0,m.jsx)(u,{className:`h-4 w-4`}),`返回列表`]})]})};export{b as n,g as r,A as t};