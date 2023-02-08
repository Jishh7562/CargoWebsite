import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { CargoService } from '../services/cargo.service';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo.page.html',
  styleUrls: ['./add-cargo.page.scss'],
})
export class AddCargoPage{
  public data = ['Amsterdam', 'Buenos Aires', 'Cairo', 'Geneva', 'Hong Kong', 'Istanbul', 'London', 'Madrid', 'New York', 'Panama City'];
  public results = [...this.data];

  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }
  constructor(
    private service: CargoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private fb: FormBuilder
  ) { }

  form = new FormGroup({
    invoiceNo : new FormControl('',[Validators.required,Validators.maxLength(25),]),
    Date : new FormControl('',[Validators.required,Validators.maxLength(25),]),
    From : new FormControl('',[Validators.required,Validators.maxLength(50),]),
    To : new FormControl('',[Validators.required,Validators.maxLength(50),]),
    noOfArticles : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    packingMode : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    Description : new FormControl('',[Validators.required,Validators.maxLength(100),]),
    actualWeight : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    doubleWeight : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    chargeWeight : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    ewayBillNo : new FormControl('',[Validators.required,Validators.maxLength(50),]),
    Rate : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    Freight : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    Handling : new FormControl('',[Validators.required,Validators.maxLength(50),]),
    gatePass : new FormControl('',[Validators.required,Validators.maxLength(50),]),
    doorDelivery : new FormControl('',[Validators.required,Validators.maxLength(50),]),
    CGST : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    SGST : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    IGST : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    grandTotal : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    Value : new FormControl('',[Validators.required,Validators.maxLength(10),]),
    paymentMode : new FormControl('',[Validators.required,Validators.maxLength(50),]),
   });

   async add(form: FormGroup) {
    const headers = {
      enctype: 'multipart/form-data;',
      'Content-Type': 'application/json',
      Accept: 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
    };
    if (form.value.invoiceNo === '' || form.value.Date === '') {
      const toast = await this.toastCtrl.create({
        message: 'Please fill all details!',
        duration: 1500,
        icon: 'checkmark-circle-outline'
      });

      await toast.present();
    }
    else {
      const formData = new FormData();

      const formDataJsonString = JSON.stringify(formData);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: formDataJsonString,
      };
      const dataJson = {
        invoiceNo: form.value.invoiceNo,
        Date: form.value.Date,
        From: form.value.From,
        To: form.value.To,
        noOfArticles: form.value.noOfArticles,
        packingMode: form.value.packingMode,
        Description: form.value.Description,
        actualWeight:form.value.actualWeight,
        doubleWeight:form.value.doubleWeight,
        chargeWeight:form.value.chargeWeight,
        ewayBillNo:form.value.ewayBillNo,
        Rate:form.value.Rate,
        Freight:form.value.Freight,
        Handling:form.value.Handling,
        gatePass:form.value.gatePass,
        doorDelivery:form.value.doorDelivery,
        CGST:form.value.CGST,
        SGST:form.value.SGST,
        IGST:form.value.IGST,
        grandTotal:form.value.grandTotal,
        Value:form.value.Value,
        paymentMode:form.value.paymentMode,
      };

      this.service.add(dataJson).subscribe(async res=>{
      console.log(res);
      this.router.navigateByUrl('/agent-dash');
      const toast = await this.toastCtrl.create({
        message: 'Cargo Added Succesfully!',
        duration: 1500,
        icon: 'checkmark-circle-outline'
      });

      await toast.present();
      },async err=>{
        const toast = await this.toastCtrl.create({
          message: err.error.error,
          duration: 1500,
          icon: 'alert'
        });
        await toast.present();
      });
      console.log('dataJson:', dataJson);

    }
  }

}
