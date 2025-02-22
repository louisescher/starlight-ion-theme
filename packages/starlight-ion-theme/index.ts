import type { StarlightPlugin } from "@astrojs/starlight/types";
import icon from 'astro-icon';
import { createResolver } from "./utils/create-resolver";
import type { StarlightExpressiveCodeOptions } from "@astrojs/starlight/expressive-code";
import { ionDark, ionLight } from "./ec-theme";
import type { AstroIntegration } from "astro";
import { viteVirtualModulePluginBuilder } from "./utils/virtual-module-plugin-builder"

interface FooterLink {
  text: string;
  href: string;
  newTab?: boolean;
}

interface FooterIcon {
  name: string;
  href: string;
  newTab?: boolean;
}

interface FooterOptions {
  text: string;
  links?: FooterLink[];
  icons?: FooterIcon[];
}

interface Config {
  /**
   * Options passed to `astro-icon`. When setting the `iconDir` option, you must use the `resolve` function exported from this module to resolve the path.
   * 
   * For more information, see the [astro-icon documentation](https://astroicon.dev).
   */
  icons: Parameters<typeof icon>[0];
  /**
   * Whether to use the custom EC theme. Defaults to `true`. Setting this to false will both remove the custom EC theme and the custom CSS.
   */
  useCustomECTheme?: boolean;
  /**
   * The footer options for the site. If not provided, the footer will not be shown.
   */
  footer?: FooterOptions;
  /**
   * Allows you to disable specific overrides. Defaults to `true` for all overrides.
   */
  overrides?: {
    /**
     * Set to `false` to disable Ion's custom SiteTitle override. Defaults to `true`.
     */
    SiteTitle?: boolean;
    /**
     * Set to `false` to disable Ion's Sidebar override. When set to `true`, you will not be able to use sidebar icons anymore.
     */
    Sidebar?: boolean;
    /**
     * Set to `false` to hide Ion's footer. Defaults to `true`.
     */
    Pagination?: boolean;
    /**
     * Set to `false` to disable Ion's hero override. Defaults to `true`.
     */
    Hero?: boolean;
    /**
     * Set to `false` to disable Ion's head override. Defaults to `true`.
     */
    Head?: boolean;
    /**
     * Set to `false` to disable Ion's page title override. Defaults to `true`.
     */
    PageTitle?: boolean;
  }
}

/**
 * Resolves a path relative to the base path.
 * @param path - The path to resolve.
 * @param base - The base path to resolve from. Usually `import.meta.url`.
 * @deprecated
 */
function resolve(path: string, base: string) {
  const { resolve } = createResolver(base);

  return resolve(path);
}

function integration(pluginConfig?: Config): AstroIntegration {
  return {
    name: 'Ion',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        const globals = viteVirtualModulePluginBuilder(
          'ion:globals',
          'ion-theme-globals',
`export const icons = ${JSON.stringify(pluginConfig ? !!pluginConfig.icons : false)};
export const footer = ${JSON.stringify(pluginConfig?.footer || { text: "" })};`);

        updateConfig({
          vite: {
            plugins: [globals()],
          },
        });
      },
    }
  }
}

function createPlugin(pluginConfig?: Config): StarlightPlugin {
	return {
		name: "starlight-ion-theme",
		hooks: {
			setup: ({ config, updateConfig, addIntegration }) => {
        addIntegration(integration(pluginConfig));
        addIntegration(icon(pluginConfig ? pluginConfig.icons : undefined));

        const customCss = config.customCss 
          ? ['starlight-ion-theme/styles/theme.css', ...config.customCss] 
          : ['starlight-ion-theme/styles/theme.css'];

        if (pluginConfig?.useCustomECTheme !== false) {
          customCss.push('starlight-ion-theme/styles/ec-theme.css');
        }

        let ecConfig: boolean | StarlightExpressiveCodeOptions = config.expressiveCode || {};

        if (pluginConfig?.useCustomECTheme !== false && !!ecConfig) {
          if (typeof ecConfig === 'boolean') ecConfig = {};

          ecConfig.themes = [ionDark, ionLight];
        }

        const userSpecifiedComponents = config.components || {};
        const enabledOverrides = pluginConfig?.overrides || {};

        updateConfig({
          customCss,
          components: {
            SiteTitle: userSpecifiedComponents.SiteTitle || enabledOverrides.SiteTitle !== false ? 'starlight-ion-theme/components/SiteTitle.astro' : undefined,
            Sidebar: userSpecifiedComponents.Sidebar || enabledOverrides.Sidebar !== false ? 'starlight-ion-theme/components/Sidebar.astro' : undefined,
            Pagination: userSpecifiedComponents.Pagination || enabledOverrides.Pagination !== false ? 'starlight-ion-theme/components/Pagination.astro' : undefined,
            Hero: userSpecifiedComponents.Hero || enabledOverrides.Hero !== false ? 'starlight-ion-theme/components/Hero.astro' : undefined,
            Head: userSpecifiedComponents.Head || enabledOverrides.Head !== false ? 'starlight-ion-theme/components/Head.astro' : undefined,
            PageTitle: userSpecifiedComponents.PageTitle || enabledOverrides.PageTitle !== false ? 'starlight-ion-theme/components/PageTitle.astro' : undefined,
          },
          expressiveCode: ecConfig,
        });
			},
		},
	};
}

export { createPlugin as ion, resolve };
