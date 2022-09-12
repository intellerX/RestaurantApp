import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { PersonalService } from '../../services/personal.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-personal-table',
  templateUrl: './personal-table.component.html',
  styleUrls: ['./personal-table.component.css']
})
export class PersonalTableComponent implements OnInit {

  elements: any = [
    { id: 1, name: 'Luis Andres Gomez', birthdate: '04/01/1997', job_tittle: 'Gerente', document: '111278937' },
    { id: 2, name: 'Carlos Andres Sepulveda', birthdate: '0/01/2001', job_tittle: 'Supervisor', document: '991278937' },
    { id: 3, name: 'Pedro Henao', birthdate: '04/01/1997', job_tittle: 'Jefe de Proyecto', document: '101278937' },
  ];

  headElements = ['NOMBRE', 'FECHA', 'CARGO', 'CC', 'BOTONES'];

  modules = [];
  module_actual = false;

  constructor(private personalService: PersonalService, private cookieService: CookieService) { }

  valitadeModule() {
    for (let index = 0; index < this.modules.length; index++) {
      if (this.modules[index] == "Empleados") {
        console.log("si");
        this.module_actual = true;
      }
    }

  }

  loadingToast() {
    const LoadToast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        Swal.showLoading()
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    LoadToast.fire({
      icon: 'question',
      title: 'Cargando...'
    })
  }

  buyToast() {
    Swal.fire({
      icon: 'info',
      title: 'Puedes adquirir este modulo en la tienda',
      footer: '<a href="/shop">Ir a la Tienda</a>'
    })

  }

  ngOnInit(): void {
    this.module_actual = true;
    this.loadingToast();
    console.log(this.elements);
    this.elements = this.elements;
    // console.log(this.personalService.get().subscribe({
    //   next: value => {
    //     this.elements = value["results"];
    //     this.modules = JSON.parse(this.cookieService.get('modules'));
    //     console.log(this.modules);
    //     //this.valitadeModule();
    //     if (this.module_actual) {

    //     }
    //     else {
    //       //this.buyToast();
    //     }



    //   }, error: error => {
    //     console.log(error);
    //     //this.buyToast();
    //   }
    // }))

  }

  async RegistrarPersonal() {
    const { value: formValues } = await Swal.fire({
      title: 'Datos:',
      html:
        '<input placeholder="Nombre" id="swal-input1" class="swal2-input"> ' +
        '<input placeholder="Fecha Nacimiento" id="swal-input2" class="swal2-input">' +

        '<input placeholder="Email" id="swal-input2" class="swal2-input">' +
        '<input placeholder="Telefono" id="swal-input2" class="swal2-input">' +
        '<input placeholder="Dirección" id="swal-input2" class="swal2-input">' +
        '<input placeholder="Fecha" id="swal-input2" class="swal2-input">' +
        '<input placeholder="Ciudad" id="swal-input2" class="swal2-input">' +
        '<input placeholder="Departamentp" id="swal-input2" class="swal2-input">' +
        '<input placeholder="Eps" id="swal-input2" class="swal2-input">' +
        '<input placeholder="CC" id="swal-input4" class="swal2-input">'
      ,
      input: 'select',
      inputOptions: {
        'Cargos': {
          one: 'Supervisor',
          two: 'Gerente',
          tree: 'Compras',
          four: 'Jefe de Proyecto'
        },
      },
      inputPlaceholder: 'Cargo',
      focusConfirm: false,
      preConfirm: () => {
        var inputValue = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        var inputValue2 = (<HTMLInputElement>document.getElementById('swal-input2')).value;

        return [
          "Comprueba los Siguientes campos: ", inputValue, inputValue2
        ]
      }
    })

    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }
  }

}
