import packageJson from './package.json' assert { type: 'json' };

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['storage', 'tabs'],
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-16.png',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [],
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'icon-128.png', 'icon-16.png'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
