import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CommandDto } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  urlApi= environment.api;

  constructor(private http:HttpClient) {   }

  // GET all
  getAll(){
    return this.http.get<CommandDto[]>(this.urlApi);
  }

  // eliminar
  delete(id: number){
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  // crear
  post(command: CommandDto){
      return this.http.post<CommandDto>(this.urlApi, command);
  }

  // actualizar
  updateCommand(command: CommandDto){
    return this.http.put(`${this.urlApi}/${command.id}`, command);
  }

  // buscar
  search(id: number){
      return this.http.get<CommandDto>(`${this.urlApi}/${id}`); //${id}
  }

}


