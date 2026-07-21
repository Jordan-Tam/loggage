export const typeDefs = `#graphql

type User {
    _id: String
    username: String
    testStrings: [String]
}

type Bag {
    name: String
    type: String
    height: Int
    length: Int
    width: Int
    weight: Int
    storageVolume: Int
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

type BagViewEntry {
    bag: String
    items: [Item]
}

type PeopleViewEntry {
    person: String
    items: [Item]
}

type PackingList {
    _id: String
    owner: User
    name: String
    description: String
    collaborators: [User]
    bags: [Bag]
    categories: [String]
    items: [Item]
    weightUnit: String
    categoryView: [CategoryViewEntry]
}

type Query {
    getAllUsers: [User]
    getAllPackingListsOfUser(userId: String!): [PackingList]
    getPackingListOfUser(userId: String!, listId: String!): PackingList
}

type Mutation {
    createPackingList(_id: String!, name: String!, description: String!): PackingList
    editPackingList(name: String!): PackingList
    addFriend(_id: String!): User
    addTestString(_id: String!, testString: String!): User
}
`