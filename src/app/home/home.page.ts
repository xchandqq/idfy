import { DatabaseService } from './../service/database.service';
import { Entity, EntityService } from './../service/entity.service';
import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {  

  platformReady = false;
  hasDatabase = false;

  entityList: Entity[] = [];
  filteredEntityList: Entity[] = [];

  sortEnabled = false;
  sortMode = 0;

  searchEnabled = false;
  searchKeyword = '';

  constructor(private alert: AlertController, private db: DatabaseService, private entityService: EntityService, private platform: Platform) {
    this.platform.ready()
    .then(()=>{
      this.hasDatabase = this.db.canInitialize();  
      if(this.hasDatabase){
        this.db.initialize()
        .then(()=>{
          this.collectEntityList();
          this.platformReady = true;
        })
        .catch((e)=>{console.log(e)});
      }
      else{
        this.entityList.push({id: this.entityList.length, title:'SSS', number:'123-456'});
        this.entityList.push({id: this.entityList.length, title:'GSIS', number:'789-0123'});
        this.entityList.push({id: this.entityList.length, title:'PRC', number:'246-864'});
        this.entityList.push({id: this.entityList.length, title:'Passport', number:'319-753'});
        this.filteredEntityList = this.entityList;
      }
    })
    .catch((e) => {
      console.log(e);      
    });
  }

  ionViewDidEnter(){
    if(this.platformReady){
      this.collectEntityList();
    }
  }

  async onSort(event){
    const al = await this.alert.create({
      header: 'Sort by',
      buttons: [
        {
          text: 'None',
          cssClass: this.sortMode == 0 ? 'alertButtonSelected' : '',
          handler: () => {this.changeSortMode(0)}
        },
        {
          text: 'Name',
          cssClass: this.sortMode == 1 ? 'alertButtonSelected' : '',
          handler: () => {this.changeSortMode(1)}
        },
        {
          text: 'Group',
          cssClass: this.sortMode == 2 ? 'alertButtonSelected' : '',
          handler: () => {this.changeSortMode(2)}
        },
        {
          text: 'Number',
          cssClass: this.sortMode == 3 ? 'alertButtonSelected' : '',
          handler: () => {this.changeSortMode(3)}
        }
        ,
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertCancelButton'
        }
      ]
    });

    al.present();
  }

  onToggleSearch(){
    this.searchEnabled = !this.searchEnabled;
  }

  onSearchChange(event){
    var newList: Entity[] = [];
    for(var ent of this.entityList){
      if(ent.title.toUpperCase().indexOf(this.searchKeyword.toUpperCase()) > -1){
        newList.push(ent);
        continue;
      }

      if(ent.number.toUpperCase().indexOf(this.searchKeyword.toUpperCase()) > -1){
        newList.push(ent);
        continue;
      }

      if(ent.notes != undefined && ent.notes.toUpperCase().indexOf(this.searchKeyword.toUpperCase()) > -1){
        newList.push(ent);
        continue;
      }
    }
    this.filteredEntityList = newList;
  }

  // process
  collectEntityList(){
    this.entityService.getEntityList()
    .then((list: Entity[]) => {
      this.entityList = list;
      this.filteredEntityList = list;
    })
    .catch((e) => {console.log(e)})
  }

  private changeSortMode(mode){
    this.sortEnabled = mode > 0;
    this.sortMode = mode;
  }

  // getters
  getEntityList(): Entity[] {
    return this.searchEnabled? this.filteredEntityList : this.entityList;
  }

}
