import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private httpClient: HttpClient) {}

  addNote(data: object): Observable<any> {
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/notes`, data);
  }

  getUserNotes(): Observable<any> {
    return this.httpClient.get(`${environment.BASE_URL}/api/v1/notes`);
  }

  updateNote(id: string, data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.BASE_URL}/api/v1/notes/${id}`,
      data
    );
  }

  deleteNote(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.BASE_URL}/api/v1/notes/${id}`);
  }
}
