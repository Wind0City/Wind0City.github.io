---
title: Git 工作流最佳实践
date: 2024-04-05
tags: [Git, 工具, 协作]
summary: 介绍团队协作中 Git 分支管理和工作流程的最佳实践。
---

# Git 工作流最佳实践

## 分支策略

### Git Flow

- `main` - 生产分支
- `develop` - 开发分支
- `feature/*` - 功能分支
- `release/*` - 发布分支
- `hotfix/*` - 热修复分支

### GitHub Flow

更简单的流程，适合持续部署：

1. 从 main 创建分支
2. 开发并提交
3. 创建 Pull Request
4. 代码审查
5. 合并到 main

## 提交信息规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型

- `feat` - 新功能
- `fix` - 修复 bug
- `docs` - 文档更新
- `style` - 代码格式
- `refactor` - 重构
- `test` - 测试
