import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { commonUserInterface } from '../../models/commonuser.interface';
import { environment } from '../../../environments/environment';
import { ValidatorService } from '../../shared/validators/validator.service';

export interface Usuario {
  id: number;
  Name: string;
  Surname: string;
  Nick: string;
  Email: string;
  Password: string;
  themes: number[];
  avatarImage: string | null;
  avatarImageFormat: string;

  Blocked: boolean;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  @ViewChild('findImage') findImage!: ElementRef;

  title = 'imagenes';
  nuevaImagen: string = '';

  imagenCargada: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(environment.IMG_STRING);
  base64Image: string | null = null;

  imageFormat: string = 'png';

  myForm!: FormGroup;

  imagendividida: string[] = [];

  themesList: number[] = [];

  constructor(
    private authservice: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder,
    private _validatorService: ValidatorService
  ) {
    if (localStorage.getItem('email') != null) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        // Define tus controles de formulario y validaciones aquí
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        nick: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.minLength(10),
            Validators.maxLength(40),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        repeatpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
      },
      {
        validators: [
          this._validatorService.camposIguales('password', 'repeatpassword'),
        ],
      }
    );
  }

  cargarImagen() {
    if (this.base64Image == null) {
      alert('No hay imagen cargada en memoria.');
    } else {
      this.imagenCargada = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.base64Image
      );
    }
  }

  buscarImagen(event: Event) {
    event.preventDefault();
    this.findImage.nativeElement.click();
  }

  handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file != undefined) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const image = new Image();
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          const format = file.type.split('/')[1];
          this.imageFormat = format;
          console.log(
            `Formato: ${format}, Ancho: ${width}px, Alto: ${height}px`
          );
          console.log(
            'Longitud de la cadena: ' + (fileReader.result as string).length
          );
          if (
            (format === 'jpeg' || format === 'png') &&
            width <= 600 &&
            height <= 2048
          ) {
            this.base64Image = fileReader.result as string;
            this.imagenCargada = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.base64Image
            );
            console.log(this.base64Image);
            this.imagendividida = this.base64Image.split('base64,');
            console.log(this.imagendividida[1]);
            console.log('Longitud de la cadena: ' + this.base64Image.length);
            console.log(
              'tamaño del archivo: ' +
                this.base64Image.length / 1.37 / 1024 +
                ' kb'
            );
          } else if (format !== 'jpeg' && format !== 'png') {
            console.log('El archivo seleccionado no es una imagen jpg o png');
          } else if (width > 600 || height > 2048) {
            alert('La imagen tiene un ancho mayor a 600px');
          }
        };
        image.onerror = () => {
          console.log(
            'El archivo seleccionado no es un archivo de imagen válido.'
          );
        };
        image.src = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }
  }

  registrar(evento: Event) {
    const inputActivado = evento.target as HTMLInputElement;
    evento.preventDefault();

    if (this.imagendividida.length == 0) {
      alert(
        'Por favor, seleccione una imagen para usar como avatar de perfil. Recuerde: debe tener un ancho de 600px o menor.'
      );
    } else if (this.themesList.length == 0) {
      alert(
        'Seleccione algún género de interes para poder ofrecerle los mejores eventos.'
      );
    } else {
      let newCommonUserData: commonUserInterface = {
        name: this.myForm.get('name')?.value,
        surname: this.myForm.get('surname')?.value,
        nick: this.myForm.get('nick')?.value,
        email: this.myForm.get('email')?.value,
        password: this.myForm.get('password')?.value,
        rol: 1,
        themes: this.themesList.join(),
        imagenavatar: this.imagendividida[1],
        imagenavatarformat: this.imageFormat,
      };

      let emailregisterservice: string = 'usuario@usuario.es';
      let passwordregisterservice: string = 'password';
      if (this.myForm.get('email')?.value.length > 0) {
        emailregisterservice = this.myForm.get('email')?.value;
      }
      if (this.myForm.get('password')?.value.length > 0) {
        passwordregisterservice = this.myForm.get('password')?.value;
      }

      //Añadir a partir de aquí el almacenamiento en mi BackEnd del nuevo usuario.
      this.authservice
        .register(emailregisterservice, passwordregisterservice)
        .then(async () => {
          let currentUser = await this.authservice.getCurrentUser();
          console.log(currentUser);
          if (currentUser == null) {
            alert('No se ha creado el nuevo usuario.');
          } else {
            this.authservice.logout();
            this.authservice
              .registerAPI(newCommonUserData)
              .subscribe((response) => {
                if (response['result'] == 'success') {
                  alert('registro realizado con éxito.');
                  this.router.navigate(['/home']);
                }
              });
            this.router.navigateByUrl('/home');
          }
        });
    }
  }

  selectTheme(event: MatCheckboxChange) {
    console.log(event.source.value);
    const isChecked = event.checked;
    if (isChecked) {
      this.themesList.push(parseInt(event.source.value));
    } else {
      this.themesList = this.themesList.filter(
        (num) => num !== parseInt(event.source.value)
      );
    }
    console.log('Checkbox is checked:', isChecked);
    console.log(this.themesList);
  }

  iraEventos(event: Event) {
    event.preventDefault();
    this.router.navigate(['/listaeventos']);
  }
}
