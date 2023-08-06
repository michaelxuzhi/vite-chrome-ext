console.log('content注入开始')

injectCustomScripts('src/entries/content/inject.js')
injectCustomHtml()

function injectCustomScripts(jsPath) {
    let js_src = chrome.runtime.getURL(jsPath)
    let new_script_node = document.createElement('script')
    new_script_node.type = 'text/javascript'
    new_script_node.src = js_src
    document.documentElement.appendChild(new_script_node)

    let page_script_node = document.createElement('script')
    page_script_node.type = 'module'
    let page_src = chrome.runtime.getURL(`src/entries/content/main.js`)
    page_script_node.src = page_src
    document.documentElement.appendChild(page_script_node)
    // console.log('inject_js 节点注入完毕')
}

function injectCustomHtml(htmlPath) {
    let attach_page = document.createElement('div')
    attach_page.id = 'content_attach'
    attach_page.style = `width:50vw;height:30vh;border:1px black solid;position:absolute;bottom:0;left:25vw;`

    let inject_vue = document.createElement('div')
    inject_vue.id = 'inject_html'
    inject_vue.style = `width:100%;height:100%;`
    attach_page.appendChild(inject_vue)
    document.body.appendChild(attach_page)
    // injectCustomScripts('src/entries/content/bundle.js')
    console.log('inject_html 节点注入完毕')
}

console.log('content注入结束')
