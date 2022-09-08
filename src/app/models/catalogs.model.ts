/*
*
*   Description example
*
*/
/*
description() {
    return {
        type: {
            type: 'string'
        },
        name: {
            type: 'boolean'
        },
        responsables: {
            type: 'array',
            items: 'object',
            default: { name:'', phone: '' },
            description: {
                name: {
                    type: 'string'
                },
                phone: { 
                    type: 'string'
                },
            }
        },
        phones: {
            type: 'array',
            items: 'number',
            default: ''
        },
        url_file: {
            type: 'array',
            items: 'file',
            default: '',
        },
        file: {
            type: 'file',
            format:'image/jpeg,image/png'
        },
        doc: {
            type: 'object',
            items: {
                name: {
                    type: 'string'
                },
                file: { 
                    type: 'file', 
                    format:'image/jpeg,image/png'
                },
            },
        },
        documents: {
            type: 'array',
            items: 'object',
            default: { name:'', file: '' },
            description: {
                name: {
                    type: 'string'
                },
                file: { 
                    type: 'file', 
                    format:'image/jpeg,image/png'
                },
            }
        },
        sort: {
            type: 'number'
        },
    }
}
*/

/**
 * @interface CredencialQualitas - Describe qualitas credentials properties
 */
export class CredencialQualitas {
    _id: string;
    identifier: string = '';
    username: string = '';
    password: string = '';
    expire: Date = null;
    //sort: number = 99;
  
    constructor(model: any = null) {
        if ( model ) {
            Object.keys(model).forEach( k => {
                if ( this.hasOwnProperty(k) || (k === '_id') ) {
                  this[k] = model[k];
                }
            });
        }
    }

    // Internal function to dinamically contrstruct interface
    description() {
        return {
            identifier: {
                type: 'string',
                label: 'Clave del agente *'
            },
            username: {
                type: 'string',
                label: 'Cuenta *'
            },
            password: {
                type: 'password',
                label: 'Contraseña *'
            },
            expire: {
                type: 'date',
                label: 'Fecha de expiración'
            },
            sort: {
                type: 'number',
                label: 'Posición de ordenamiento',
            },
        }
    }
    
    exportables() {
        return {
        };
    }
}

/**
 * @interface CredencialHDI - Describe hdi credentials properties
 */
export class CredencialHDI {
    _id: string;
    identifier: string = '';
    username: string = '';
    password: string = '';
    expire: Date = null;
    //sort: number = 99;
  
    constructor(model: any = null) {
        if ( model ) {
            Object.keys(model).forEach( k => {
                if ( this.hasOwnProperty(k) || (k === '_id') ) {
                  this[k] = model[k];
                }
            });
        }
    }

    // Internal function to dinamically contrstruct interface
    description() {
        return {
            identifier: {
                type: 'string',
                label: 'Clave del agente *'
            },
            username: {
                type: 'string',
                label: 'Cuenta *'
            },
            password: {
                type: 'password',
                label: 'Contraseña *'
            },
            expire: {
                type: 'date',
                label: 'Fecha de expiración'
            },
            sort: {
                type: 'number',
                label: 'Posición de ordenamiento',
            },
        }
    }
    
    exportables() {
        return {
        };
    }
}

/**
 * @interface CredencialChubb - Describe chubb credentials properties
 */
export class CredencialChubb {
    _id: string;
    identifier: string = '';
    username: string = '';
    password: string = '';
    expire: Date = null;
    //sort: number = 99;
  
    constructor(model: any = null) {
        if ( model ) {
            Object.keys(model).forEach( k => {
                if ( this.hasOwnProperty(k) || (k === '_id') ) {
                  this[k] = model[k];
                }
            });
        }
    }

    // Internal function to dinamically contrstruct interface
    description() {
        return {
            identifier: {
                type: 'string',
                label: 'Clave del agente *'
            },
            username: {
                type: 'string',
                label: 'Cuenta *'
            },
            password: {
                type: 'password',
                label: 'Contraseña *'
            },
            expire: {
                type: 'date',
                label: 'Fecha de expiración'
            },
            sort: {
                type: 'number',
                label: 'Posición de ordenamiento',
            },
        }
    }
    
    exportables() {
        return {
        };
    }
}