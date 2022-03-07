const COMPONENTS = {
    projects: 'projects',
    properties: 'properties',
    units: 'units',
    users: 'users',
    tenants: 'tenants',
    transactions: 'transactions',
    draftLeases: 'draft-leases',
    leases: 'leases',
    accounting: 'accounting',
    checkinout: 'checkinout',
    lookups: 'lookups'
}

const METHODS = {
    VIEW: 'GET',
    ADD: 'POST',
    EDIT: 'PUT',
    DELETE: 'DELETE'
}

const administrator = {
    [METHODS.VIEW]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.leases, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.users, COMPONENTS.tenants, COMPONENTS.lookups, COMPONENTS.accounting, COMPONENTS.checkinout],
    [METHODS.ADD]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.leases, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.users, COMPONENTS.tenants, COMPONENTS.lookups, COMPONENTS.accounting, COMPONENTS.checkinout],
    [METHODS.EDIT]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.leases, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.users, COMPONENTS.tenants, COMPONENTS.lookups, COMPONENTS.accounting, COMPONENTS.checkinout],
    [METHODS.DELETE]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.leases, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.users, COMPONENTS.tenants, COMPONENTS.lookups, COMPONENTS.accounting, COMPONENTS.checkinout],
}

const manager = {
    [METHODS.VIEW]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.leases, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.users, COMPONENTS.tenants, COMPONENTS.lookups, COMPONENTS.accounting, COMPONENTS.checkinout],
    [METHODS.ADD]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.leases, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.tenants, COMPONENTS.checkinout],
    [METHODS.EDIT]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.leases, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.tenants, COMPONENTS.checkinout],
    [METHODS.DELETE]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.tenants, COMPONENTS.checkinout],
}

const accountant ={
    [METHODS.VIEW]: [COMPONENTS.accounting],
    [METHODS.ADD]: [COMPONENTS.accounting],
    [METHODS.EDIT]: [COMPONENTS.accounting],
    [METHODS.DELETE]: [COMPONENTS.accounting]
}

const user ={
    [METHODS.VIEW]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.draftLeases, COMPONENTS.leases, COMPONENTS.transactions, COMPONENTS.tenants, COMPONENTS.accounting, COMPONENTS.checkinout],
    [METHODS.ADD]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.tenants, COMPONENTS.checkinout],
    [METHODS.EDIT]: [COMPONENTS.projects, COMPONENTS.properties, COMPONENTS.units, COMPONENTS.draftLeases, COMPONENTS.transactions, COMPONENTS.tenants, COMPONENTS.checkinout],
    [METHODS.DELETE]: [COMPONENTS.draftLeases]
}

const ROLES = {
    Administrator: administrator,
    Manager: manager,
    Accountant : accountant,
    User: user
}

module.exports = {ROLES};
