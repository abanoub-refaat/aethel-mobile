const { withAndroidManifest, withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

function withFileProviderPaths(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const xmlDir = path.join(
        config.modRequest.platformProjectRoot,
        "app/src/main/res/xml"
      );
      const xmlPath = path.join(xmlDir, "file_provider_paths.xml");

      if (!fs.existsSync(xmlDir)) {
        fs.mkdirSync(xmlDir, { recursive: true });
      }

      fs.writeFileSync(
        xmlPath,
        `<?xml version="1.0" encoding="utf-8"?>
<paths>
  <files-path name="files" path="." />
  <cache-path name="cache" path="." />
</paths>`
      );

      return config;
    },
  ]);
}

function withFileProviderManifest(config) {
  return withAndroidManifest(config, async (config) => {
    const manifest = config.modResults;
    const app = manifest.manifest.application[0];

    if (!app.provider) app.provider = [];

    const exists = app.provider.some(
      (p) => p.$["android:authorities"] === "${applicationId}.provider"
    );

    if (!exists) {
      app.provider.push({
        $: {
          "android:name": "androidx.core.content.FileProvider",
          "android:authorities": "${applicationId}.provider",
          "android:exported": "false",
          "android:grantUriPermissions": "true",
        },
        "meta-data": [
          {
            $: {
              "android:name": "android.support.FILE_PROVIDER_PATHS",
              "android:resource": "@xml/file_provider_paths",
            },
          },
        ],
      });
    }

    return config;
  });
}

module.exports = function withFileProvider(config) {
  config = withFileProviderPaths(config);
  config = withFileProviderManifest(config);
  return config;
};
