import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import viteSvgIcons from 'vite-plugin-svg-icons'
import styleImport from 'vite-plugin-style-import';

const setAlias = (alias) => alias.map(v => {return { find: v[0], replacement: path.resolve(__dirname, v[1]) }})
const proxy = (list) => {
    const obj = {}
    list.forEach((v) => {
        obj[v[0]] = {
            target: v[1],
            changeOrigin: true,
            rewrite: (path) => path.replace(new RegExp(`^${v[0]}`), ''),
            ...(/^https:\/\//.test(v[1]) ? { secure: false } : {})
        }
    })
    return obj
}

export default ({ command, mode }) => {
    const root = process.cwd()
    const env = loadEnv(mode, root)
    const prodMock = true
    return {
        resolve: {
            alias: setAlias([
                ['@', 'src'],
                ['/mock', 'mock'],
                ['/server', 'server']
            ])
        },
        server: {
            proxy: env.VITE_PROXY ? proxy(JSON.parse(env.VITE_PROXY)) : {},
            port: env.VITE_PORT
        },
        build: {
            sourcemap: true,
            manifest: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'element-plus': ['element-plus'],
                        echarts: ['echarts'],
                        pinyin: ['pinyin']
                    }
                }
            },
            chunkSizeWarningLimit: 600
        },
        plugins: [
            vue(),
            styleImport({
                libs: [
                  {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                      name = name.slice(3);
                      return `element-plus/packages/theme-chalk/src/${name}.scss`;
                    },
                    resolveComponent: (name) => {
                      return `element-plus/lib/${name}`;
                    },
                  },
                ],
              }),
            viteMockServe({
                mockPath: 'mock',
                localEnabled: command === 'serve',
                prodEnabled: command !== 'serve' && prodMock,
                //  ????????????????????????mock???????????????mock????????????????????????
                injectCode: `
                import { setupProdMockServer } from '/mock/mockProdServer';
                setupProdMockServer();
                `
            }),
            viteSvgIcons({
                // ????????????????????????????????????
                iconDirs: [path.resolve(process.cwd(), 'src/icons')],
                // ??????symbolId??????
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        css: {
            postcss: {
                plugins: [
                    require('postcss-nested'),
                    // require('postcss-simple-vars'),
                    require('postcss-import'), 
                    require('autoprefixer'),
                    require('tailwindcss'),
                ]
            }
        }
    }
}
