export class Book {

bookID : string;
bookTitle : string;
authorName : string;
description :string;
bookContent: string;
bookUrl:string;
ratings:Rating[];
totalView : number ;
totalPage : number ;
language :string;
publisher: string;
firstPublish :any;
genre:any;
notes:Note[];
readingTime: number;
totalDownloads: number;
uploadedBy: string;
uploadedOn: any;
isbnNumber:string;
imageUrl:string;

}
export class Rating{
    ratingStar:number;
    userEmail:string;
}

export class Note{
    noteTitle:string;
    noteContent:string;
    userEmail:string;
}

