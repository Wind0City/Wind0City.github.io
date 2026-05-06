const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-markdown-a2d9Fo5F.js","assets/rolldown-runtime-COnpUsM8.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{i as t,r as n,t as r}from"./vendor-markdown-a2d9Fo5F.js";import{a as i,o as a,s as o}from"./vendor-router-IMR0tLQG.js";import{n as s,t as c}from"./vendor-motion-ZnDoRK0J.js";import{a as l}from"./vendor-ui-ChhXXj4l.js";import{r as u,t as d}from"./animations-DwIQ-tXu.js";var f=e(t(),1),p=n(),m={all:{label:`All`,tags:[]},web:{label:`Web`,tags:[`React`,`CSS`,`TypeScript`,`前端`,`JavaScript`,`HTML`]},AI:{label:`AI`,tags:[`AI`,`人工智能`,`机器学习`]},deeplearning:{label:`Deep Learning`,tags:[`深度学习`,`神经网络`,`Deep Learning`]},other:{label:`Other`,tags:[`Git`,`工具`,`协作`,`Other`]}},h=({articles:e})=>{let t=i(),[n,r]=(0,f.useState)(`all`),[a,o]=(0,f.useState)(!1),[h,g]=(0,f.useState)(``),_=(0,f.useMemo)(()=>{let t=e;if(n!==`all`){let e=m[n].tags;t=t.filter(t=>t.tags.some(t=>e.includes(t)))}if(h.trim()){let e=h.toLowerCase();t=t.filter(t=>t.title.toLowerCase().includes(e)||t.summary.toLowerCase().includes(e)||t.tags.some(t=>t.toLowerCase().includes(e)))}return t},[e,n,h]),v=e=>{t(`/article/${e}`)},y=e=>{r(e),o(!1)},b=(e,t)=>t.trim()?e.split(RegExp(`(${t})`,`gi`)).map((e,n)=>e.toLowerCase()===t.toLowerCase()?(0,p.jsx)(`mark`,{className:`bg-yellow-300/50 text-inherit rounded px-0.5`,children:e},n):e):e;return(0,p.jsxs)(`div`,{className:`w-full h-full overflow-auto bg-black/30 rounded-xl p-6`,children:[(0,p.jsxs)(`div`,{className:`flex items-center gap-4 mb-6`,children:[(0,p.jsxs)(`div`,{className:`relative flex-shrink-0`,onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),children:[(0,p.jsx)(`button`,{className:`p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200`,"aria-label":`文章分类筛选`,children:(0,p.jsxs)(`svg`,{className:`w-6 h-6 text-white`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,strokeWidth:2,children:[(0,p.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M4 6h16`}),(0,p.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M4 12h16`}),(0,p.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M4 18h16`})]})}),a&&(0,p.jsx)(`div`,{className:`absolute top-full left-0 pt-1 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg min-w-[120px] z-10`,children:Object.keys(m).map(e=>(0,p.jsx)(`button`,{onClick:()=>y(e),className:`w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200 rounded-sm ${n===e?`bg-white/10 font-medium`:``}`,children:m[e].label},e))})]}),(0,p.jsxs)(`div`,{className:`relative flex-1 max-w-md`,children:[(0,p.jsx)(l,{className:`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50`}),(0,p.jsx)(`input`,{type:`text`,value:h,onChange:e=>g(e.target.value),placeholder:`搜索文章...`,className:`w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30`}),h&&(0,p.jsx)(`button`,{onClick:()=>g(``),className:`absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white`,children:`×`})]}),(0,p.jsx)(`h1`,{className:`text-2xl font-bold text-white flex-shrink-0`,children:`文章列表`})]}),(n!==`all`||h)&&(0,p.jsxs)(`div`,{className:`mb-4 text-white/60 text-sm flex items-center gap-2`,children:[n!==`all`&&(0,p.jsxs)(`span`,{children:[`分类：`,m[n].label,(0,p.jsx)(`button`,{onClick:()=>r(`all`),className:`ml-2 px-2 py-0.5 bg-white/10 rounded hover:bg-white/20 transition`,children:`清除`})]}),h&&(0,p.jsxs)(`span`,{children:[`搜索："`,h,`"`,(0,p.jsx)(`button`,{onClick:()=>g(``),className:`ml-2 px-2 py-0.5 bg-white/10 rounded hover:bg-white/20 transition`,children:`清除`})]})]}),(0,p.jsx)(c.div,{className:`space-y-4`,variants:u,initial:`initial`,animate:`animate`,children:(0,p.jsx)(s,{mode:`popLayout`,children:_.map((e,t)=>(0,p.jsxs)(c.article,{variants:d,layout:!0,initial:`initial`,animate:`animate`,exit:`exit`,transition:{delay:t*.05},onClick:()=>v(e.id),className:`p-4 bg-white/10 rounded-xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300`,whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},children:[(0,p.jsx)(`h2`,{className:`text-xl font-semibold text-white mb-2`,children:b(e.title,h)}),(0,p.jsxs)(`div`,{className:`flex items-center gap-4 mb-2 text-white/60 text-sm`,children:[(0,p.jsx)(`span`,{children:e.date}),(0,p.jsx)(`div`,{className:`flex gap-2 flex-wrap`,children:e.tags.map(e=>(0,p.jsx)(c.span,{className:`px-2 py-0.5 bg-white/10 rounded-full text-xs`,whileHover:{scale:1.1},children:b(e,h)},e))})]}),(0,p.jsx)(`p`,{className:`text-white/80 text-sm line-clamp-2`,children:b(e.summary,h)})]},e.id))})}),(0,p.jsx)(s,{mode:`wait`,children:_.length===0&&(0,p.jsx)(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:`text-center text-white/60 py-8`,children:n===`all`&&!h?`暂无文章`:`没有找到匹配的文章`})})]})};function g(e){let t=e.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);if(!t)return{frontmatter:{title:`无标题`,date:new Date().toISOString().split(`T`)[0],tags:[],summary:``},content:e};let[,n,r]=t,i={},a=n.split(`
`);for(let e of a){if(!e.trim())continue;let t=e.indexOf(`:`);if(t===-1)continue;let n=e.slice(0,t).trim(),r=e.slice(t+1).trim();r.startsWith(`[`)&&r.endsWith(`]`)&&(r=r.slice(1,-1).split(`,`).map(e=>e.trim().replace(/['"]/g,``))),i[n]=r}return{frontmatter:i,content:r}}function _(e,t){let{frontmatter:n,content:r}=g(t);return{id:e,frontmatter:n,content:r}}var v=Object.entries({"getting-started-with-react":`---
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
`}).map(([e,t])=>_(e,t));function y(){return v.map(e=>({id:e.id,title:e.frontmatter.title,summary:e.frontmatter.summary,date:e.frontmatter.date,tags:e.frontmatter.tags}))}function b(e){let t=v.find(t=>t.id===e);if(t)return{id:t.id,title:t.frontmatter.title,summary:t.frontmatter.summary,date:t.frontmatter.date,tags:t.frontmatter.tags,content:t.content}}var x=()=>{let[e,t]=(0,f.useState)(0);return(0,f.useEffect)(()=>{let e=()=>{let e=window.scrollY,n=document.documentElement.scrollHeight-document.documentElement.clientHeight;t(n>0?e/n*100:0)};return window.addEventListener(`scroll`,e),e(),()=>window.removeEventListener(`scroll`,e)},[]),(0,p.jsx)(`div`,{className:`fixed top-0 left-0 right-0 h-1 bg-white/10 z-50`,children:(0,p.jsx)(`div`,{className:`h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-150`,style:{width:`${e}%`}})})},S=({content:e,wordsPerMinute:t=300})=>{let n=(e.match(/[一-龥]/g)||[]).length+(e.replace(/[一-龥]/g,``).match(/[a-zA-Z]+/g)||[]).length;return(0,p.jsxs)(`span`,{className:`text-sm text-white/60`,children:[Math.ceil(n/t),` 分钟阅读`]})},C=({content:e})=>{let[t,n]=(0,f.useState)(``),r=(0,f.useMemo)(()=>{let t=e.split(`
`),n=[];return t.forEach((e,t)=>{let r=e.match(/^(#{1,3})\s+(.+)$/);if(r){let e=r[1].length,i=r[2].trim(),a=`heading-${t}`;n.push({id:a,text:i,level:e})}}),n},[e]);(0,f.useEffect)(()=>{let e=()=>{let e=document.querySelectorAll(`h1, h2, h3`),t=``;e.forEach(e=>{e.getBoundingClientRect().top<=100&&(t=e.id)}),n(t)};return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]);let i=(0,f.useCallback)(e=>{let t=document.getElementById(e);t&&t.scrollIntoView({behavior:`smooth`})},[]);return r.length===0?null:(0,p.jsxs)(`nav`,{className:`p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20`,children:[(0,p.jsx)(`h3`,{className:`text-sm font-semibold text-white/80 mb-3`,children:`目录`}),(0,p.jsx)(`ul`,{className:`space-y-1`,children:r.map(e=>(0,p.jsx)(`li`,{children:(0,p.jsx)(`button`,{onClick:()=>i(e.id),className:`w-full text-left text-sm py-1 px-2 rounded transition-colors ${e.level===1?`font-medium`:e.level===2?`pl-4`:`pl-6`} ${t===e.id?`bg-white/20 text-white`:`text-white/60 hover:text-white hover:bg-white/10`}`,children:e.text})},e.id))})]})},w=({variant:e=`text`,width:t,height:n,className:r=``})=>{let i={text:`rounded h-4`,rectangular:`rounded-lg`,circular:`rounded-full`},a={text:{width:`100%`,height:`1rem`},rectangular:{width:`100%`,height:`100px`},circular:{width:`40px`,height:`40px`}},o=t||a[e].width,s=n||a[e].height;return(0,p.jsx)(c.div,{className:`bg-white/10 ${i[e]} ${r}`,style:{width:typeof o==`number`?`${o}px`:o,height:typeof s==`number`?`${s}px`:s},animate:{opacity:[.5,1,.5]},transition:{duration:1.5,repeat:1/0,ease:`easeInOut`}})},T=(0,f.lazy)(()=>o(()=>import(`./vendor-markdown-a2d9Fo5F.js`).then(e=>e.n),__vite__mapDeps([0,1]))),E=()=>{let{id:e}=a(),t=i(),n=b(e||``),o=()=>{t(`/article`)};return n?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(x,{}),(0,p.jsxs)(`div`,{className:`w-full h-full overflow-auto bg-black/50 rounded-xl p-6 text-left`,children:[(0,p.jsx)(`button`,{onClick:o,className:`mb-6 px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white hover:bg-white/20 transition inline-flex items-center gap-2`,children:(0,p.jsx)(`span`,{children:`⬅`})}),(0,p.jsxs)(`header`,{className:`mb-8 pb-6 border-b border-white/20`,children:[(0,p.jsx)(`h1`,{className:`text-3xl font-bold text-white mb-4 text-left`,children:n.title}),(0,p.jsxs)(`div`,{className:`flex items-center gap-4 text-white/60 text-sm flex-wrap`,children:[(0,p.jsx)(`span`,{children:n.date}),(0,p.jsx)(S,{content:n.content}),(0,p.jsx)(`div`,{className:`flex gap-2`,children:n.tags.map(e=>(0,p.jsx)(`span`,{className:`px-2 py-0.5 bg-white/10 rounded-full`,children:e},e))})]})]}),(0,p.jsxs)(`div`,{className:`flex gap-6`,children:[(0,p.jsx)(`aside`,{className:`hidden lg:block flex-shrink-0 w-48`,children:(0,p.jsx)(`div`,{className:`sticky top-4`,children:(0,p.jsx)(C,{content:n.content})})}),(0,p.jsx)(`article`,{className:`flex-1 text-left min-w-0`,children:(0,p.jsx)(f.Suspense,{fallback:(0,p.jsxs)(`div`,{className:`space-y-4`,children:[(0,p.jsx)(w,{variant:`text`,height:`1.5rem`,width:`60%`}),(0,p.jsx)(w,{variant:`text`,height:`1rem`}),(0,p.jsx)(w,{variant:`text`,height:`1rem`}),(0,p.jsx)(w,{variant:`text`,height:`1rem`,width:`80%`})]}),children:(0,p.jsx)(T,{remarkPlugins:[r],components:{code({className:e,children:t,...n}){return e===void 0?(0,p.jsx)(`code`,{className:`bg-white/10 px-1.5 py-0.5 rounded text-sm`,...n,children:t}):(0,p.jsx)(`code`,{className:`block bg-white/10 p-4 rounded-xl text-sm overflow-x-auto`,...n,children:t})},pre({children:e}){return(0,p.jsx)(`pre`,{className:`my-4`,children:e})},h1:({children:e})=>(0,p.jsx)(`h1`,{className:`text-2xl font-bold text-white mt-8 mb-4`,children:e}),h2:({children:e})=>(0,p.jsx)(`h2`,{className:`text-xl font-semibold text-white mt-6 mb-3`,children:e}),h3:({children:e})=>(0,p.jsx)(`h3`,{className:`text-lg font-medium text-white mt-5 mb-2`,children:e}),h4:({children:e})=>(0,p.jsx)(`h4`,{className:`text-base font-medium text-white mt-4 mb-2`,children:e}),p:({children:e})=>(0,p.jsx)(`p`,{className:`text-white/90 leading-relaxed mb-4`,children:e}),ul:({children:e})=>(0,p.jsx)(`ul`,{className:`list-disc list-inside text-white/90 mb-4 space-y-2 pl-4`,children:e}),ol:({children:e})=>(0,p.jsx)(`ol`,{className:`list-decimal list-inside text-white/90 mb-4 space-y-2 pl-4`,children:e}),li:({children:e})=>(0,p.jsx)(`li`,{className:`text-white/90 leading-relaxed`,children:e}),a:({href:e,children:t})=>(0,p.jsx)(`a`,{href:e,className:`text-blue-400 hover:text-blue-300 underline`,target:`_blank`,rel:`noopener noreferrer`,children:t}),blockquote:({children:e})=>(0,p.jsx)(`blockquote`,{className:`border-l-4 border-white/30 pl-4 italic text-white/70 my-4`,children:e}),table:({children:e})=>(0,p.jsx)(`div`,{className:`overflow-x-auto my-4`,children:(0,p.jsx)(`table`,{className:`min-w-full border border-white/20 rounded-lg`,children:e})}),thead:({children:e})=>(0,p.jsx)(`thead`,{className:`bg-white/10`,children:e}),tbody:({children:e})=>(0,p.jsx)(`tbody`,{className:`divide-y divide-white/10`,children:e}),tr:({children:e})=>(0,p.jsx)(`tr`,{className:`border-b border-white/10`,children:e}),th:({children:e})=>(0,p.jsx)(`th`,{className:`px-4 py-2 text-left text-white font-medium`,children:e}),td:({children:e})=>(0,p.jsx)(`td`,{className:`px-4 py-2 text-white/80`,children:e}),hr:()=>(0,p.jsx)(`hr`,{className:`border-white/20 my-6`}),img:({src:e,alt:t})=>(0,p.jsx)(`img`,{src:e,alt:t,className:`max-w-full rounded-lg my-4`})},children:n.content})})})]})]})]}):(0,p.jsxs)(`div`,{className:`w-full h-full flex flex-col items-center justify-center bg-white/5 rounded-xl`,children:[(0,p.jsx)(`p`,{className:`text-white/80 text-xl mb-4`,children:`文章不存在`}),(0,p.jsx)(`button`,{onClick:o,className:`px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white hover:bg-white/20 transition`,children:`返回列表`})]})};export{y as n,h as r,E as t};