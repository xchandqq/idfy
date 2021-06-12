import { Injectable } from '@angular/core';
import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Entity } from './entity.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private config: SQLiteDatabaseConfig = {
    name: 'idfy.db',
    location: 'default'
  }

  private obj: SQLiteObject = undefined;

  constructor(private sqlite: SQLite) { }

  canInitialize(): boolean{
    return this.sqlite.create(this.config) != undefined;
  }

  initialize(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.sqlite.create(this.config)
      .then((obj: SQLiteObject) => {
        obj.executeSql('create table if not exists entity_table (id INTEGER PRIMARY KEY, title TEXT, number TEXT, notes TEXT, group_id INTEGER)', [])
        .then(()=>{
          obj.executeSql('create table if not exists group_table (id INTEGER PRIMARY KEY, title TEXT)', [])
          .then(() => {
            this.obj = obj;
            resolve('');
          })
          .catch((e)=>{reject(e)});
        })
        .catch((e)=>{reject(e)});
      })
      .catch((e) => {reject(e)});
    });
  }

  selectEntityList(): Promise<Entity[]>{
    return new Promise((resolve, reject) => {
      this.obj.executeSql('select * from entity_table', [])
      .then((data)=>{
        const itemCount = data.rows.length;
        var entityList: Entity[] = [];
        for(var i = 0; i<itemCount; i++){
          entityList.unshift({
            id: data.rows.item(i).id,
            title: data.rows.item(i).title,
            number: data.rows.item(i).number,
            notes: data.rows.item(i).notes,
            groupId: data.rows.item(i).group_id,
          })
        }
        resolve(entityList);
      })
      .catch((e)=>{reject(e)});
    });
  }

  selectEntityByName(name: string): Promise<number>{
    return new Promise((resolve, reject) => {
      this.obj.executeSql('select * from entity_table where title = \"'+name+'\"', [])
      .then((data)=>{
        resolve(data.rows.length);
      })
      .catch((e)=>{reject(e)});
    });
  }

  selectEntityById(id): Promise<Entity>{
    return new Promise((resolve, reject) => {
      this.obj.executeSql('select * from entity_table where id = '+id, [])
      .then((data)=>{
        let entity: Entity = {
          id: id,
          title: data.rows.item(0).title,
          number: data.rows.item(0).number,
          notes: data.rows.item(0).notes,
          groupId: data.rows.item(0).group_id
        }
        resolve(entity);
      })
      .catch((e)=>{reject(e)});
    });
  }

  insertEntity(entity: Entity): Promise<any>{
    return new Promise((resolve, reject) => {
      var sql = 'insert into entity_table (id, title, number, notes, group_id) VALUES (?, \"' + entity.title + '\", \'' + entity.number + '\', \'' + entity.notes + '\', ' + entity.groupId + ')';
      console.log(sql);      
      this.obj.executeSql(sql, [])
      .then(()=>{
        resolve('done');
      })
      .catch((e)=>{reject(e)});
    });
  }

  deleteEntity(entity: Entity): Promise<any>{
    return new Promise((resolve, reject) => {
      this.obj.executeSql('delete from entity_table where id = '+entity.id, [])
      .then(()=>{
        resolve('done');
      })
      .catch((e)=>{reject(e)});
    });
  }
}
