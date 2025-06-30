const { getDefaultConfig } = require("expo/metro-config");

const path = require("node:path");

const myExtraModuleDir = path.resolve(
	__dirname,
	"../../../notus-api/packages/expo-sdk",
);
const extraNodeModules = {
	"@notus-api/expo-sdk": myExtraModuleDir,
};
const watchFolders = [
	// Include extra module dir to work around Metro's bug where resolver.extraNodeModules
	// does not work without corresponding watchFolders, see also
	// https://github.com/facebook/metro/issues/834
	myExtraModuleDir,
];

const config = {
	watchFolders: watchFolders,
	resolver: {
		extraNodeModules: new Proxy(extraNodeModules, {
			get: (target, name) =>
				// redirects dependencies referenced from myExtraModule/ to local node_modules
				name in target
					? target[name]
					: path.join(process.cwd(), `node_modules/${name}`),
		}),
		// unstable_enableSymlinks: true,  // defaults to true since Metro v0.79.0
	},
	resetCache: true, // https://metrobundler.dev/docs/configuration/#resetcache
};

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
	...defaultConfig,
	...config,
	resolver: {
		...defaultConfig.resolver,
		...config.resolver,
	},
	watchFolders: [...(defaultConfig.watchFolders || []), ...config.watchFolders],
};
