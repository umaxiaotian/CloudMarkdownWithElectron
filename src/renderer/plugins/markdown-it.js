import MarkdownIt from 'markdown-it'
import markdownItGithubToc from "markdown-it-github-toc"
export default ({ app }, inject) => {
    const md = new MarkdownIt({
        langPrefix: 'language-',
        preset: 'default',
        linkify: false,
        breaks: true,
        html: true,
        typegraphy: true,
    })
    md.use(require('markdown-it-emoji'))
    md.use(require('markdown-it-plantuml'))
    md.use(markdownItGithubToc)
    inject('md', md)
}