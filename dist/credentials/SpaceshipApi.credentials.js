"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceshipApi = void 0;
class SpaceshipApi {
    constructor() {
        this.name = 'spaceshipApi';
        this.displayName = 'Spaceship API';
        this.documentationUrl = 'https://docs.spaceship.dev/';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                default: '',
                required: true,
            },
            {
                displayName: 'API Secret',
                name: 'apiSecret',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
            },
        ];
    }
}
exports.SpaceshipApi = SpaceshipApi;
//# sourceMappingURL=SpaceshipApi.credentials.js.map