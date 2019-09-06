import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from './app.config';
import { Response } from './models/response.model';
import { Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  constructor(private _http: HttpClient, private config: AppConfig) {}

  // GETS
  getCategories(){
    return this._http.get<Response[]>(this.config.api+'Categories')
  }

  getCategory(idcategory){
    return this._http.get<Response[]>(this.config.api+'Categories/'+idcategory)
  }

  saveCategory(data){
    data.idcategory = 0;
    return this._http.post<Response[]>(this.config.api+'Categories', data);
  }
  
  updateCategory(idCategory, data){
    return this._http.patch<Response[]>(this.config.api+'Categories/'+idCategory, data);
  }

  deleteCategory(idCategory){
    return this._http.delete<Response[]>(this.config.api+'Categories/'+idCategory);
  }
 
}