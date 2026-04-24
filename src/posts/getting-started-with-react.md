---
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

```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

### 2. 状态管理

使用 useState 管理组件内部状态：

```jsx
const [count, setCount] = useState(0);
```

### 3. 生命周期

useEffect Hook 让你在函数组件中执行副作用操作：

```jsx
useEffect(() => {
    document.title = `You clicked ${count} times`;
}, [count]);
```

## 总结

React 的组件化思想让代码更加模块化和可维护。
