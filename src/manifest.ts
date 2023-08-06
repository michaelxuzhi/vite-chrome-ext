import pkg from '../package.json'

const manifest: chrome.runtime.Manifest = {
    manifest_version: 3,
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    host_permissions: ['*://*/*'],
    background: {
        service_worker: 'src/entries/background/main.ts',
    },
    action: {
        default_popup: 'src/entries/popup/index.html',
    },
    options_ui: {
        page: 'src/entries/options/index.html',
        open_in_tab: false,
    },
    web_accessible_resources: [
        {
            resources: [
                'src/entries/content/inject.js',
                'src/entries/content/bundle.js',
                'src/entries/content/main.ts',
            ],
            matches: ['*://*/*'],
        },
    ],
    content_scripts: [
        {
            js: ['src/entries/content/content_script.js'],
            matches: ['http://*/*', 'https://*/*'],
            run_at: 'document_end',
        },
    ],
    permissions: ['tabs', 'bookmarks', 'system.memory'],
    devtools_page: 'src/entries/devtool/devtool_page_out.html',
}

export default manifest
