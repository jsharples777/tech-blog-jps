

export type Comment = {
    id:number,
    content:string,
    createdBy: number,
    changedOn: number,
    commentOn: number
};

export type User = {
    id:number,
    username:string,
}

export type BlogEntry = {
    id:number,
    title: string,
    content:string,
    createdBy:number,
    changedOn:number,
    User:User|null,
    Comments:Comment[]
};

