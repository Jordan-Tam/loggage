export const typeDefs = `#graphql

type User {
    _id: String
    username: String
    testStrings: [String]
}

type Bag {
    name: String
    type: String
    # height: Int
    # length: Int
    # width: Int
    # weight: Int
    # storageVolume: Int
    notes: String
    belongsTo: User
}

type Item {
    name: String
    category: String
    bag: [Bag]
    quantity: Int
    weight: Int
    individualOrTotal: String
    notes: String
    belongsTo: User
}

type CategoryViewEntry {
    category: String
    items: [Item]
}

type PackingList {
    _id: String
    owner: User
    name: String
    description: String
    bags: [Bag]
    categories: [String]
    items: [Item]
    categoryView: [CategoryViewEntry]
}

type Template {
    _id: String
    owner: User
    name: String
    description: String
    bags: [Bag]
    categories: [String]
    items: [Item]
}

type Query {
    getAllUsers: [User]
    getAllPackingListsOfUser(userId: String!): [PackingList]
    getPackingListOfUser(userId: String!, listId: String!): PackingList
}

type Mutation {

    # Email, username, and password mutations will be done through existing Better Auth methods.

    # Appends a new packing list subdoc to the "packingLists" array of the user document specified by _id.
    createPackingList(_id: String!, name: String!, description: String!): PackingList

    editPackingListName(packingListId: String!, newName: String!): PackingList
    editPackingListDescription(packingListId: String!, newDescription: String!): PackingList
    
    addPackingListBag: PackingList
    addPackingListCategory: PackingList
    addPackingListPerson: PackingList
    addItem(_id: String!, name: String!): PackingList

    editPackingListBag: PackingList
    editPackingListCategory: PackingList
    editPackingListPerson: PackingList
    editItem: PackingList
    
    deletePackingListBag: PackingList
    deletePackingListCategory: PackingList
    deletePackingListPerson: PackingList
    deleteItem: PackingList

    # Deletes the packing list subdoc from the "packingLists" array of the user document specified by _id.
    deletePackingList(_id: String!, packingListId: String!): PackingList

    # Template mutations.
    createTemplate(_id: String!, name: String!, description: String!): Template
    editTemplate(_id: String!): Template
    deleteTemplate(_id: String!): Template

    # Friending mutations.
    addFriend(_id: String!, friendId: String!): User
    removeFriend(_id: String!, friendId: String!): User

    # Test mutation; delete later.
    addTestString(_id: String!, testString: String!): User
}
`