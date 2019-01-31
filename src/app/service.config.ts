import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';


export const baseUrl = environment.baseUrl;

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export function handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
}
