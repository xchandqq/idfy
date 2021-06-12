import { Entity, EntityService } from './../service/entity.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.page.html',
  styleUrls: ['./entity.page.scss'],
})
export class EntityPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private entityService: EntityService, private alert: AlertController, private nav: NavController) { }

  id = '';
  modelName = '';
  modelNumber = '';
  modelNotes = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.entityService.getEntity(this.id)
      .then((entity: Entity) => {
        this.modelName = entity.title;
        this.modelNumber = entity.number;
        this.modelNotes = entity.notes;
      })
    });
  }

  //
  async onDelete(){
    const msg = await this.alert.create({
      message: 'Delete this entity?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.entityService.deleteEntity({
              id: Number.parseInt(this.id),
              title: this.modelName,
              number: this.modelNumber
            })
            .then(()=>{
              this.nav.back();
            })
            .catch((e) => {console.log(e)});
          }
        }
      ]
    });
    msg.present();
  }

}
