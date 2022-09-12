import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) { }

  clickEvent() {
    Swal.fire({
      icon: 'error',
      text: 'Verifica los campos!',
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.cookieService.deleteAll();


    Swal.fire({
      title: 'Cargando...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })



    if (this.form.valid) {
      this.form.value["keep_logged_in"] = true;
      //this.router.navigate(['/main/personal']);

      this.cookieService.set('company', 'name');
      this.cookieService.set('refresh', 'refresh');
      this.cookieService.set('token', 'token');
      this.cookieService.set('id', 'id');
      this.cookieService.set('modules', JSON.stringify('modules'));


      this.router.navigate(['/main/personal']);
      Swal.close()

      this.authService.post(this.form.value).subscribe({
        next: value => {
          //console.log(value);


        }, error: error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Usuario o Contraseña no coinciden'
          })
        }
      })
    }
    else {
      Object.keys(this.form.controls).forEach(key => {
        if (this.form.controls[key].status == "INVALID") {
          Swal.fire({
            icon: 'error',
            title: 'Valor invalido',
            text: 'Valida el campo: ' + key
          })
        }
        console.log(this.form.controls[key]);
      });
    }

  }



}
