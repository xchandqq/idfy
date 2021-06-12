import { element } from 'protractor';
import { EntityService } from './../service/entity.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.page.html',
  styleUrls: ['./create-entity.page.scss'],
})
export class CreateEntityPage implements OnInit {

  @ViewChild('nameValidationWrap', {read: ElementRef}) nameValidationWrap: ElementRef;
  @ViewChild('numberValidationWrap', {read: ElementRef}) numberValidationWrap: ElementRef;
  @ViewChild('numberInput') numberInput;
  @ViewChild('notesTextArea') notesTextArea;

  constructor(private alert: AlertController, private nav: NavController, private entityService: EntityService) { }

  modelName = '';
  modelNumber = '';
  modelNotes = '';

  modelNameValidation = '';
  modelNumberValidation = '';

  ngOnInit() {
  }

  //
  leavePage(){
    this.nav.back();
  }

  //
  async onCancel(){
    if(this.hasName() || this.hasNotes() || this.hasNumber()){
      const msg = await this.alert.create({
        message: 'Discard entity?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Discard',
            handler: ()=>{ this.leavePage();}
          }
        ]
      });
      msg.present();
    }
    else{
      this.leavePage();
    }
  }

  onFinish(){
    if(!this.hasName()){
      const nameWrap = this.nameValidationWrap.nativeElement as HTMLElement;
      nameWrap.classList.add('show-validation');

      const nameValidationLabel = nameWrap.getElementsByClassName('validation-message')[0] as HTMLElement;
      nameValidationLabel.innerHTML = 'Please enter a name for this entity';
      return;
    }

    if(!this.hasNumber()){
      const numberWrap = this.numberValidationWrap.nativeElement as HTMLElement;
      numberWrap.classList.add('show-validation');

      const numberValidationLabel = numberWrap.getElementsByClassName('validation-message')[0] as HTMLElement;
      numberValidationLabel.innerHTML = 'Please enter a number for this entity';
      return;
    }

    this.entityService.nameExists(this.modelName)
    .then((exists)=>{
      if(exists){    
        const nameWrap = this.nameValidationWrap.nativeElement as HTMLElement;
        nameWrap.classList.add('show-validation');
    
        const nameValidationLabel = nameWrap.getElementsByClassName('validation-message')[0] as HTMLElement;
        nameValidationLabel.innerHTML = 'This name already exists';
      }
      else{
        if(this.entityService.canAddEntity){
          this.entityService.addEntity({
            title: this.modelName,
            number: this.modelNumber,
            notes: this.modelNotes,
            groupId: -1
          })
          .then(()=>{
            this.leavePage();
          });
        }
      }
    })
    .catch((e) => {console.log(e)});
  }

  onFocusNameInput(){
    this.nameValidationWrap.nativeElement.classList.remove('show-validation');
    // this.modelNameValidation = ''    
  }

  onFocusNumberInput(){
    this.numberValidationWrap.nativeElement.classList.remove('show-validation');
    // this.modelNumberValidation = ''    
  }

  onKeyUp(isNameInput: boolean, event){
    if(event.key == 'Enter'){      
      if(isNameInput) this.numberInput.setFocus();
      else this.notesTextArea.setFocus();
    }
  }

  //
  private hasName(){
    return this.modelName.length > 0;
  }

  private hasNumber(){
    return this.modelNumber.length > 0;
  }

  private hasNotes(){
    return this.modelNotes.length > 0;
  }

}
