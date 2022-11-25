import { Component, OnInit } from '@angular/core';
import { CommandDto } from '../models/interface';
import { CommandService } from '../services/commandes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})

export class ApiComponent implements OnInit {
  array: CommandDto[] = new Array<CommandDto>();

  commandFormGroup: FormGroup = new FormGroup({
    id: new FormControl<number>(+''),

    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    age: new FormControl<number>(+'', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ])
  });

  get name() {
    return this.commandFormGroup.get('name');
  }

  get age() {
    return this.commandFormGroup.get('age');
  }

  get city() {
    return this.commandFormGroup.get('city');
  }

  get country() {
    return this.commandFormGroup.get('country');
  }

  addOrPut = false;

  constructor(private commandService:CommandService) { }

  ngOnInit(): void {
    this.getCommand();
  }

  getCommand() {
    this.commandService.getAll()
    .subscribe((data: CommandDto[]) =>{
      this.array = data;
    })
  }

  deleteCommand(id: number){
    this.commandService.delete(id).subscribe(
      () => {this.array = this.array.filter( (aCommand) => aCommand.id != id)
      })
  }

  postCommand(){
    this.commandService.post(this.commandFormGroup.value)
    .subscribe(
      (eachCommand: any)=>{
          this.array = [eachCommand, ...this.array];
          this.clearInputs();
    })

  }

  // make inputs empty
  clearInputs(){
    this.commandFormGroup.reset({
      name: '',
      price: +''
    });
  }

  // edit commandService
  editCommand(eachCommand: CommandDto){
    this.commandFormGroup.get('id')?.setValue(eachCommand.id);
    this.commandFormGroup.get('name')?.setValue(eachCommand.name);
    this.commandFormGroup.get('age')?.setValue(eachCommand.age);
    this.commandFormGroup.get('city')?.setValue(eachCommand.city);
    this.commandFormGroup.get('country')?.setValue(eachCommand.country);
    this.addOrPut=true;
  }

  // update commandService
  putCommand(){
    this.commandService.updateCommand(this.commandFormGroup.value)
    .subscribe( () => {
      this.clearInputs();
      this.addOrPut = false;
    })
  }
}
