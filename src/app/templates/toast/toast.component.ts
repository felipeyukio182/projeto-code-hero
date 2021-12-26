import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  // @ViewChild('toast') toast!: HTMLDivElement

  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  mostrarToast() {
    // debugger
    if(this.toastService.mostrarToast) {
      return `mostrar ${this.toastService.estilo}` 
    } else {
      return ""
    }
  }

}
