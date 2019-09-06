import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DataService } from 'app/data.service';
import { Response } from '../models/response.model';
import { DataService } from '../data.service';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  createCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  public categories: Object[];
  public showEditForm: boolean = false;
  public tab: any = 1;
  idcategorySelected: any;

  constructor(private fb: FormBuilder, private dataService: DataService,) {

    this.createCategoryForm = this.fb.group({
      // calidad: ['Alta (300 DPI)'], // select
      name: ['', Validators.required],
      description: ['']
    });

    this.editCategoryForm = this.fb.group({
      // calidad: ['Alta (300 DPI)'], // select
      name: ['', Validators.required],
      description: ['']
    });
  }
  
  ngOnInit() {
    this.listCategories();
  }
  
  // Funciones de comunicación con la base de datos
  listCategories(){
    this.dataService.getCategories().subscribe((res)=>{
      // console.log('respuesta > ', res);
      if(!isNullOrUndefined(res)){
        this.categories = res;
      }else{
        this.showNotification('top','center','No se pudo traer las categrías.','danger');
      }
    })
  }

  getCategory(idcategory){
    this.dataService.getCategory(idcategory).subscribe((res)=>{
      console.log('respuesta > ', res);
      if(!isNullOrUndefined(res)){
        this.editCategoryForm.controls['name'].setValue(res['name']);
        this.editCategoryForm.controls['description'].setValue(res['description']);
        this.showEditForm = true;
        this.setTab(3);
      }else{
        this.showNotification('top','center','No se pudo traer la categría de id = '+idcategory, 'danger');
      }
    })
  }
  
  updateCategory(){
    let datosFormEdit = this.editCategoryForm.value;
    // console.log('this.idcategorySelected > ',this.idcategorySelected)
    // console.log('datosFormEdit > ',datosFormEdit)
    this.dataService.updateCategory(this.idcategorySelected, datosFormEdit).subscribe((res)=>{
      // console.log('respuesta update > ', res);
      if(!isNullOrUndefined(res)){
        this.showNotification('top','center','Se editó la categoría correctamente.','success');
        this.setTab(1);
        this.listCategories();
      }else{
        this.showNotification('top','center','No se pudo editar la categoría. Intentelo de nuevo!','danger');
      }
    })
  }

  saveCategory(){
    let datosForm = this.createCategoryForm.value;
    // console.log('datosForm create > ',datosForm)
    this.dataService.saveCategory(datosForm).subscribe((res)=>{
      // console.log('respuesta save > ', res);
      if(!isNullOrUndefined(res)){
        this.categories = res;
        this.showNotification('top','center','Se creó la categoría correctamente.','success');
        this.setTab(1);
        this.listCategories();
      }else{
        this.showNotification('top','center','No se pudo crear la categría. Intentelo de nuevo!','danger');
      }
    })
  }
  
  deleteCategory(idcategory){
    this.dataService.deleteCategory(idcategory).subscribe((res)=>{
      // console.log('respuesta delete > ', res);
      if(!isNullOrUndefined(res)){
        this.categories = res;
        this.showNotification('top','center','Se eliminó la categoría correctamente.','success');
        this.listCategories();
      }else{
        this.showNotification('top','center','No se pudo eliminar la categoría. Intentelo de nuevo!','danger');
      }
    })
  }


  // Funciones secundarias
  /**
   * *  Autor - Romario Augusto Estrada Flórez - ww.romaef.com
   * editCategory - Coge el idcategory, lo guarda temporalmente y luego va por la info de esa categoría
   * @param idcategory [Number] - el id de la categoría
   */
  editCategory(idcategory){
    this.idcategorySelected = idcategory;
    this.getCategory(idcategory);
  }
  /**
   * *  Autor - Romario Augusto Estrada Flórez - ww.romaef.com
   * setTab - da el numero de tab la variables this.tab
   * @param newTab [Number] - Es el número del tab, listar es  = 1, crear es = 2, editar es = 3
   */
  setTab(newTab){
      if(newTab == 1 || newTab == 2){
        this.editCategoryForm.controls['name'].setValue('');
        this.editCategoryForm.controls['description'].setValue('');

        this.createCategoryForm.controls['name'].setValue('');
        this.createCategoryForm.controls['description'].setValue('');

        this.showEditForm = false;
      }
      this.tab = newTab;
  };
  
  // Si existe agrega ese tab a this.tab
  isSet(tabNum){
    return this.tab === tabNum;
  };

  
  /**
   *  Autor - Romario Augusto Estrada Flórez - ww.romaef.com
   * showNotification - Muestra unmensaje de notificación.
   * @param from [String] - Es la posición en la que se quiere mostrar de la pantalla - top, right, left, bottom
   * @param align [String] - Es la posición en la que se quiere mostrar de la pantalla - top, right, left, bottom
   * @param message [String] - El mensaje que quieres que se vea en el mensaje de notificación
   * @param type [String] - '','info','success','warning','danger'
   */
  showNotification(from, align, message, type){
    $.notify({
        icon: "notifications",
        message: message

    },{
        type: type,
        timer: 3000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
