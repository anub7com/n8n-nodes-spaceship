"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactAttributeFields = exports.contactAttributeOperations = void 0;
exports.contactAttributeOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'contactAttribute',
                ],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Read attribute details by contact ID',
                action: 'Get contact attributes',
            },
            {
                name: 'Save',
                value: 'save',
                description: 'Save contact attributes',
                action: 'Save contact attributes',
            },
        ],
        default: 'save',
    },
];
exports.contactAttributeFields = [
    {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'contactAttribute',
                ],
            },
        },
        default: '',
    },
    {
        displayName: 'Attributes',
        name: 'attributes',
        type: 'fixedCollection',
        placeholder: 'Add Attribute',
        displayOptions: {
            show: {
                operation: [
                    'save',
                ],
                resource: [
                    'contactAttribute',
                ],
            },
        },
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        options: [
            {
                displayName: 'Attribute',
                name: 'attribute',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                    },
                ],
            },
        ],
    },
];
//# sourceMappingURL=ContactAttributeDescription.js.map