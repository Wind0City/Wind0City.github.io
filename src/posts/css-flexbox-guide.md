---
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

- `display: flex` - 定义 flex 容器
- `flex-direction` - 主轴方向（row | column）
- `justify-content` - 主轴对齐
- `align-items` - 交叉轴对齐

### 项目属性

- `flex-grow` - 放大比例
- `flex-shrink` - 缩小比例
- `flex-basis` - 初始大小
- `align-self` - 单独对齐

## 实用示例

### 水平垂直居中

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 等分布局

```css
.item {
    flex: 1;
}
```
