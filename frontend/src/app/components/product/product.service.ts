import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Product } from "../product/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3000/products"

  constructor(private snackBar : MatSnackBar, private Http : HttpClient) { }

  showMessage(msg : string, isError : boolean = false ) : void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  create(product : Product) : Observable<Product>{
    return this.Http.post<Product>(this.baseUrl, product).pipe(map((obj) => obj), catchError(e =>  this.errorHandler(e)))
  }

  read() : Observable<Product[]>{
    return this.Http.get<Product[]>(this.baseUrl)
  }

  readById(id : string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.Http.get<Product>(url)
  }

  update(product : Product) : Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.Http.put<Product>(url,product)
  }

  delete(id : number) : Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.Http.delete<Product>(url)
  }

  errorHandler(e : any): Observable<any>{
    this.showMessage('Erro', true)
    return EMPTY
  }
}
