"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncOperationFields = exports.asyncOperationOperations = void 0;
exports.asyncOperationOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'asyncOperation',
                ],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Obtain async operation details',
                action: 'Get an async operation',
            },
        ],
        default: 'get',
    },
];
exports.asyncOperationFields = [
    {
        displayName: 'Operation ID',
        name: 'operationId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                operation: [
                    'get',
                ],
                resource: [
                    'asyncOperation',
                ],
            },
        },
        default: '',
    },
];
//# sourceMappingURL=AsyncOperationDescription.js.map