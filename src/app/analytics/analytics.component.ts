import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
// tslint:disable
export class AnalyticsComponent implements OnInit {

  display: boolean = false;
  displaypost:boolean = false;
  displaypin:boolean = false;
  displaystory:boolean = false;

  closeResult = '';
  data: any;
  dataAbonne:any;
  bardata:any;

  constructor(private modalService: NgbModal,private primengConfig: PrimeNGConfig) {
    this.bardata = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'LinkedIn',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'FaceBook',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86]
        },
        {
          label: 'Twitter',
          backgroundColor: '#FFD700',
          borderColor: '#B8860B',
          data: [38, 25, 50, 10, 37]
        },
      ]
    }
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Prestataire actifs',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Prestataire non actif',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    }

    this.dataAbonne = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Abonnés actifs',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#EC3F1A'
        },
        {
          label: 'Abonnés non actifs',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#20EC1A'
        }
      ]
    }
  }

  showDialog() {
    this.display = true;
  }
  showDialogPost(){
    this.displaypost = true;
  }
  showDialogPin(){
    this.displaypin = true;
  }
  showDialogstory(){
    this.displaystory= true;
  }
  onHideDialogPost(){
    this.displaypost = false;
  }
  onHideDialogPin(){
    this.displaypin = false;
  }
  onHideDialogstory(){
    this.displaystory= false;
  }
  onHide(){
    this.display = false;
  }

  /**
   * Methode pour le modal
   * @param content
   */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
