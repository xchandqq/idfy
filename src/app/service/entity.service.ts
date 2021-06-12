import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private database: DatabaseService, private platform: Platform, private toast: ToastController) {
  }
  
  public nameExists(name: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.database.selectEntityByName(name)
      .then((count) => {
        if(count > 0) resolve(true);
        else resolve(false);
      })
      .catch((e) => {reject(e)});
    });
  }

  public canAddEntity(): boolean{
    return false;
  }

  public addEntity(entity: Entity): Promise<any>{
    return new Promise((resolve, reject) => {
      this.database.insertEntity(entity)
      .then(()=>{
        this.showToast(entity.title + ' has been added');
        resolve('done');
      })
      .catch((e) => {
        this.showToast('Failed to add entity');
        reject(e)
      });
    });
  }

  public getEntity(id): Promise<Entity>{
    return this.database.selectEntityById(id);
  }

  public getEntityList(): Promise<Entity[]>{
    return this.database.selectEntityList();
  }

  public deleteEntity(entity: Entity): Promise<any>{
    return new Promise((resolve, reject) => {
      this.database.deleteEntity(entity)
      .then(()=>{
        this.showToast(entity.title + ' has been deleted');
        resolve('done');
      })
      .catch((e) => {reject(e)});
    });
  }

  public editEntity(entity: Entity){
    this.showToast(entity.title + ' has been modified');
  }

  private async showToast(message: string){
    const msg = await this.toast.create({
      message: message,
      duration: 2000
    });
    msg.present();
  }

}

export interface Entity{
  id?: number;
  title: string;
  number: string;
  notes?: string;
  groupId?: number;
}

export interface Group{
  id: number;
  title: string;
  order: number;
}