---
title: TypeScript 实用技巧
date: 2024-03-10
tags: [TypeScript, 前端, 技巧]
summary: 分享 TypeScript 开发中的实用技巧和最佳实践，提升代码质量。
---

# TypeScript 实用技巧

## 1. 类型推断

让 TypeScript 自动推断类型，减少冗余代码：

```typescript
// 不推荐
const name: string = "hello";

// 推荐
const name = "hello";
```

## 2. 联合类型与类型守卫

```typescript
type Result = Success | Error;

function isSuccess(result: Result): result is Success {
    return result.status === 'success';
}
```

## 3. 泛型约束

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
```

## 4. 工具类型

- `Partial<T>` - 所有属性可选
- `Required<T>` - 所有属性必选
- `Pick<T, K>` - 选取部分属性
- `Omit<T, K>` - 排除部分属性
