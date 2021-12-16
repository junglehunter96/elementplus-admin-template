import theme from '@/config/theme'
import { store } from '@/store/index'
export default function(num) {
    const themeStyle = num >= theme.length ? theme[0] : theme[num]
    const { color } = store.state.layout.setting
    const themeDom = document.createElement('style')
    themeDom.className = 'layout-side-setting'
    themeDom.innerText = `
    :root {
        --color-primary: ${color.primary};
    }
    .layout-sidebar-logo {
        background-color: ${themeStyle.logoBg || themeStyle.sidebarBg};
        color: ${themeStyle.logoColor || themeStyle.sidebarColor};
    }
    .layout-sidebar {
        background-color: ${themeStyle.sidebarBg};
    }
    .layout-sidebar .el-menu {
        background-color: ${themeStyle.sidebarBg};
        border-right: 0;
    }
    .layout-sidebar .el-menu .el-menu {
        background-color: ${themeStyle.sidebarChildrenBg};
    }
    .layout-sidebar .el-sub-menu__title {
        color: ${themeStyle.sidebarColor};
    }
    .layout-sidebar .el-menu-item {
        color: ${themeStyle.sidebarColor};
    }
    .layout-sidebar .el-menu-item:focus,
    .layout-sidebar .el-menu-item:hover,
    .layout-sidebar .el-sub-menu__title:hover {
        background-color: transparent;
        color: ${themeStyle.sidebarActiveColor};
    }
    .layout-sidebar .el-menu-item-group__title {
        padding: 0;
    }
    .layout-sidebar .el-sub-menu.is-active > .el-sub-menu__title,
    .layout-sidebar .el-sub-menu.is-active > .el-sub-menu__title > i {
        color: ${themeStyle.sidebarActiveColor};
    }
    .layout-sidebar .el-menu-item.is-active {
        background-color: ${themeStyle.sidebarActiveBg};
        color: ${themeStyle.sidebarActiveColor};
        border-right: 3px solid ${themeStyle.sidebarActiveBorderRightBG};
    }
${themeStyle.navbarBg ? `
    .layout-main-navbar {
        background-color: ${themeStyle.navbarBg};
    }
    ` : ''
}
${themeStyle.navbarColor ? `
    .layout-main-navbar {
        color: ${themeStyle.navbarColor};
    }
    .layout-main-navbar .el-breadcrumb .el-breadcrumb__inner,
    .layout-main-navbar .el-breadcrumb .el-breadcrumb__separator,
    .layout-main-navbar .el-breadcrumb .el-breadcrumb__inner:hover,
    .layout-main-navbar .el-breadcrumb .el-breadcrumb__separator:hover,
    .layout-main-navbar .el-dropdown {
        color: ${themeStyle.navbarColor};
    }
    ` : ''
}
${themeStyle.tagsBg ? `
    .layout-main-tags {
        background-color: ${themeStyle.tagsBg};
    }
    ` : ''
}
${themeStyle.tagsColor ? `
    .layout-main-tags {
        color: ${themeStyle.tagsColor};
    }
    ` : ''
}
    .layout-main-content {
        background-color: ${themeStyle.mainBg};
    }
    .layout-tags-active {
        background-color: ${themeStyle.tagsActiveBg};
        color: ${themeStyle.tagsActiveColor};
    }
    .layout-sidebar-sidesetting > i {
        background-color: ${themeStyle.sidebarActiveBg};
        color: ${themeStyle.sidebarColor};
    }
    `.replace(/\n/g, '').replace(/ {4}/g, '')
    const prevTheme = document.querySelector('style.layout-side-setting')
    prevTheme && prevTheme.remove()
    document.head.appendChild(themeDom)
    return themeDom
}