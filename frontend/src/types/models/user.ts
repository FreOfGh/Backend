type User =  {
    userId: string,
    username: string,
    password: string,
    cardDesign: string,
    status: string,
    tokens: number,
    createdAt: Date,
    "updatedAt": Date
}

export default User;