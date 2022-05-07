import { config, RouterLinkStub } from '@vue/test-utils'
import { RouterView } from 'vue-router'

config.global.stubs = {
    RouterLink: RouterLinkStub,
    RouterView: RouterView
}