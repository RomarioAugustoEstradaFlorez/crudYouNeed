import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DataService } from 'app/data.service';
import { Response } from '../models/response.model';
import { DataService } from '../data.service';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  createBillForm: FormGroup;
  editBillForm: FormGroup;
  public bills: Object[];
  public showEditForm: boolean = false;
  public tab: any = 1;
  idBillSelected: any;
  createTotal: number;
  editTotal: number;

  constructor(private fb: FormBuilder, private dataService: DataService,) {

    this.createBillForm = this.fb.group({
      // calidad: ['Alta (300 DPI)'], // select
      name: ['', Validators.required],
      value: ['', Validators.required],
      iva: ['', Validators.required],
      total: ['', Validators.required]
    });

    this.editBillForm = this.fb.group({
      // calidad: ['Alta (300 DPI)'], // select
      name: ['', Validators.required],
      value: ['', Validators.required],
      iva: ['', Validators.required],
      total: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.listBills();
  }
  
  // Funciones de comunicación con la base de datos
  listBills(){
    this.dataService.getBills().subscribe((res)=>{
      // console.log('respuesta > ', res);
      if(!isNullOrUndefined(res)){
        this.bills = res;
      }else{
        this.showNotification('top','center','No se pudo traer las facturas.','danger');
      }
    })
  }

  getBill(idBill){
    this.dataService.getBill(idBill).subscribe((res)=>{
      console.log('respuesta > ', res);
      if(!isNullOrUndefined(res)){
        this.editBillForm.controls['name'].setValue(res['name']);
        this.editBillForm.controls['value'].setValue(res['value']);
        this.editBillForm.controls['iva'].setValue(res['iva']);
        this.editBillForm.controls['total'].setValue(res['total']);

        this.editForIvaResult();
        this.showEditForm = true;
        this.setTab(3);
      }else{
        this.showNotification('top','center','No se pudo traer la factura de id = '+idBill, 'danger');
      }
    })
  }
  
  updateBill(){
    let datosFormEdit = this.editBillForm.value;
    // console.log('this.idBillSelected > ',this.idBillSelected)
    // console.log('datosFormEdit > ',datosFormEdit)
    this.dataService.updateBill(this.idBillSelected, datosFormEdit).subscribe((res)=>{
      // console.log('respuesta update > ', res);
      if(!isNullOrUndefined(res)){
        this.showNotification('top','center','Se editó la factura correctamente.','success');
        this.setTab(1);
        this.listBills();
      }else{
        this.showNotification('top','center','No se pudo editar la factura. Intentelo de nuevo!','danger');
      }
    })
  }

  saveBill(){
    let datosForm = this.createBillForm.value;
    // console.log('datosForm create > ',datosForm)
    this.dataService.saveBill(datosForm).subscribe((res)=>{
      // console.log('respuesta save > ', res);
      if(!isNullOrUndefined(res)){
        this.bills = res;
        this.showNotification('top','center','Se creó la factura correctamente.','success');
        this.setTab(1);
        this.listBills();
      }else{
        this.showNotification('top','center','No se pudo crear la factura. Intentelo de nuevo!','danger');
      }
    })
  }
  
  deleteBill(idBill){
    this.dataService.deleteBill(idBill).subscribe((res)=>{
      // console.log('respuesta delete > ', res);
      if(!isNullOrUndefined(res)){
        this.bills = res;
        this.showNotification('top','center','Se eliminó la factura correctamente.','success');
        this.listBills();
      }else{
        this.showNotification('top','center','No se pudo eliminar la factura. Intentelo de nuevo!','danger');
      }
    })
  }


  // Funciones secundarias
  /**
   * *  Autor - Romario Augusto Estrada Flórez - ww.romaef.com
   * editBill - Coge el idBill, lo guarda temporalmente y luego va por la info de esa factura
   * @param idBill [Number] - el id de la factura
   */
  editBill(idBill){
    this.idBillSelected = idBill;
    this.getBill(idBill);
  }
  /**
   * *  Autor - Romario Augusto Estrada Flórez - ww.romaef.com
   * setTab - da el numero de tab la variables this.tab
   * @param newTab [Number] - Es el número del tab, listar es  = 1, crear es = 2, editar es = 3
   */
  setTab(newTab){
      if(newTab == 1 || newTab == 2){
        this.editBillForm.controls['name'].setValue('');
        this.editBillForm.controls['value'].setValue('');
        this.editBillForm.controls['iva'].setValue('');
        this.editBillForm.controls['total'].setValue('');

        this.createBillForm.controls['name'].setValue('');
        this.createBillForm.controls['value'].setValue('');
        this.createBillForm.controls['iva'].setValue('');
        this.createBillForm.controls['total'].setValue('');

        this.showEditForm = false;
      }
      this.tab = newTab;
  };
  
  // Si existe agrega ese tab a this.tab
  isSet(tabNum){
    return this.tab === tabNum;
  };

  createForIvaResult(){
    var value = this.createBillForm.value.value;
    var iva = '1.'+ this.createBillForm.value.iva;
    let ivad = parseFloat(iva);
    let total:number = (value / ivad);
    this.createBillForm.controls['total'].setValue(Math.floor(total));
    this.createTotal = Math.floor(total);
  }

  editForIvaResult(){
    var value = Math.floor(this.editBillForm.value.value);
    var iva = '1.'+ this.editBillForm.value.iva;
    let ivad = parseFloat(iva);
    var total:number = (value / ivad);
    this.editBillForm.controls['total'].setValue(Math.floor(total));
    this.editTotal = Math.floor(total);
  }
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
