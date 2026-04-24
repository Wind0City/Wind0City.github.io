/**
 * Markdown 文件类型声明
 *
 * 告诉 TypeScript 如何处理 .md 文件的导入
 * 使用 ?raw 后缀导入时，返回字符串类型
 */

// 声明 .md 文件的模块类型
declare module "*.md?raw" {
    const content: string;
    export default content;
}
