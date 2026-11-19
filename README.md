# @portfolio/ui-kit

[English](#english) | [简体中文](#简体中文)

## English

Small, accessible React primitives with typed props and no runtime dependencies beyond React.

### Components

- `Button`: solid, outline, and ghost variants. The loading state disables interaction and exposes `aria-busy`.
- `TextField`: visible label, optional hint or error, linked descriptions, and invalid state.
- `Notice`: info, success, warning, and error announcements.

### Install and build

```sh
npm install
npm run build
```

Import from `@portfolio/ui-kit`. Add CSS for `.ui-button`, `.ui-field`, and `.ui-notice` in your application to control visual styling.

### Design notes

Components preserve native HTML attributes, support refs where useful, and do not impose a styling framework. Verify keyboard and screen-reader behavior in the consuming application.

## 简体中文

一组轻量且注重无障碍体验的 React 基础组件，提供完整的 TypeScript 属性类型。除 React 外没有运行时依赖。

### 组件

- `Button`：提供实心、描边和幽灵三种样式变体。加载状态会禁用交互并设置 `aria-busy`。
- `TextField`：提供可见标签、可选提示或错误信息、关联描述和无效状态。
- `Notice`：用于展示信息、成功、警告和错误提示。

### 安装与构建

```sh
npm install
npm run build
```

从 `@portfolio/ui-kit` 导入组件。在应用中为 `.ui-button`、`.ui-field` 和 `.ui-notice` 添加 CSS，自行控制视觉样式。

### 设计说明

组件保留原生 HTML 属性，并在适用时支持 ref，不强制使用特定样式框架。请在实际使用的应用中检查键盘操作和屏幕阅读器体验。
