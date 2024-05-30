import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { NlpService } from '../services/nlp.service';
import { RecommendationService } from '../services/recommendation.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';


interface Book {
	bookID: Number,
	bookTitle: String,
	author_name: String,
	description: String,
	bookContent: String,
	bookUrl: any,
	ratings: any,
	totalView: Number,
	totalPage: Number,
	language: String,
	publisher: String,
	firstPublish: Number,
	genre: String,
	notes: any,
	readingTime: Number,
	totalDownloads: Number,
	uploadedBy: String,
	uploadedOn: Date,
	isbnNumber: String,
	imageUrl: String
}

@Component({
	selector: 'app-book-card',
	templateUrl: './book-card.component.html',
	styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {


	control: FormControl = new FormControl('');


	@Input() public book: any;

	constructor(public httpClient: HttpClient,
		private sb: FormBuilder,
		private recommendationService: RecommendationService,
		private router: Router,
		private nlpService: NlpService,
		private bookService: BookService,
		private dialog: MatDialog) { }

	books: any = [];
	selected = 0;
	searchForm: FormGroup;
	isSearch = true;
	errorMessage = "";
	isFavourite: boolean;

	ngOnInit(): void {
		this.getAllBooks();
		// this.httpClient.get('http://localhost:3000/books').subscribe(data => {
		// 	console.log("json response", data);
		// 	this.books = data;
		// });
		this.searchForm = new FormGroup(
			{
				searchBar: new FormControl('')
			}
		);

	}

	getAllBooks() {
		this.recommendationService.getAllBooksInDatabase().subscribe(data => {
			console.log("json response", data);
			this.books = data;
		});
	}

	onSearch() {
		console.log("On Click of Search ", this.searchForm.value);
		this.nlpService.nlpFilter(this.searchForm.value.searchBar).subscribe(data => {
			console.log("In onSearch() from nlpService : ", data);
			if (data.length > 0) {
				this.books = data;
				this.errorMessage = "";
			}
			else {
				this.errorMessage = "No books found";
			}
		}, error => {
			console.log("In error of onSearch() from nlpService ", error);
		});
	}


	clearSearch() {
		this.searchForm.reset();
	}
	closeSearch(value) {
		this.isSearch = !value;
	}

	readBook(bookUrl: string, bookTitle: string) {
		console.log("In readBook() : ", bookUrl);
		this.recommendationService.addToRead(sessionStorage.getItem("userName"), bookUrl).subscribe(data => {
			console.log("After addToRead backend call : ", data);
		},
			error => {
				console.log("Error in call : ", error);
			});
		this.router.navigate(["/readbook/${bookUrl}/${bookTitle}"]);
		// this.router.navigate(["/readbook"]);
	}

	filterBooks(event) {
		console.log("In filterBooks() of bookCardComponent : ", event);
		this.books = event;
	}

	downloadBook(bookUrl: string,bookTitle) {
		this.bookService.downloadBook(bookUrl,bookTitle).subscribe(data => {
			console.log("On success of downloadBook() :", data);
			this.openDialog();
		}, error => {
			console.log("On failure of downloadBook() ", error);
			this.openDialog();
		})
	}

	openDialog() {
		// this.dialog.open(DialogBoxComponent);
		const dialogForUpdate = this.dialog.open(DialogBoxComponent, {
			width: '450px',
			data: "Book Downloaded Successfully"
		});
		dialogForUpdate.afterClosed().subscribe(result => {

		});
	}

	toggleFavourites(bookTitle: string) {
		this.recommendationService.checkIfFavourite(sessionStorage.getItem("userName"), bookTitle)
			.subscribe(data => {
				console.log("Check if favourites successful : ", data);
				if (data == "Book is favourite") {
					this.recommendationService.removeFromFavourites(sessionStorage.getItem("userName"), bookTitle)
						.subscribe(data => {
							this.isFavourite = false;
							console.log("Remove from favourites successful : ", data)
						}, error => {
							console.log("Remove from favourites failed : ", error)
						});
				}
				else if (data == "Not favourite") {
					this.recommendationService.addToFavourites(sessionStorage.getItem("userName"), bookTitle)
						.subscribe(data => {
							this.isFavourite = true;
							console.log("Add to favourites successful : ", data)
						}, error => {
							console.log("Add to favourites failed : ", error)
						});
				}
			}, error => {
				console.log("check if favourites failed : ", error)
			});
	}
}
