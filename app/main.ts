/// <reference path="libs.d.ts" />

require('./main.scss');

import {
    bootstrap
} from 'angular2/platform/browser';
import {
    Component,
    provide
} from 'angular2/core';
import {
    ROUTER_PROVIDERS,
    LocationStrategy,
    PathLocationStrategy,
    ROUTER_DIRECTIVES,
    APP_BASE_HREF
} from 'angular2/router';

import {
    D3Component
} from './d3/d3-component';

@Component({
    selector: 'stencil-app',
    directives: [
        ROUTER_DIRECTIVES,
        D3Component
        ],
    template: require('./main.html')
})

export class StencilApp {
    constructor() {
        // no-op
    }
}

bootstrap(
    StencilApp, [
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: PathLocationStrategy }),
        provide(APP_BASE_HREF, { useValue: '/main' })
    ]
);
