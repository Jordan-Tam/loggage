export const typeDefs = `#graphql

type User {
    _id: String
    testStrings: [String]
}

type Bag {
    name: String
    type: String
    customType: String
    height: Int
    length: Int
    width: Int
    weight: Int
    storageVolume: Int
    notes: String
    assignedTo: User
}

type Item {
    name: String
    category: String
    bag: [Bag]
    quantity: Int
    weight: Int
    individualOrTotal: String
    notes: String
    assignedTo: User
    total_weight: Int # If weight=individual, total_weight = weight * quantity
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