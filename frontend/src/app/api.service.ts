import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Csv } from './csv';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  addCsv(Csv: Csv): Observable<Csv> {
    return this.http.post<Csv>(apiUrl, Csv, httpOptions).pipe(
      tap((s: Csv) => console.log(`added Csv w/ id=${s._id}`)),
      catchError(this.handleError<Csv>('addSales'))
    );
  }
getCsv(): Observable<Csv[]> {
    return this.http.get<Csv[]>(`${apiUrl}`)
      .pipe(
        tap(Csv => console.log('fetched Csv')),
        catchError(this.handleError('getCsv', []))
      );
  }
  deleteCsv(id: string): Observable<Csv> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Csv>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Csv id=${id}`)),
      catchError(this.handleError<Csv>('deleteSales'))
    );
  }
}
