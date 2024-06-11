import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { OrganizationInterface } from '../../models/organization.interface';
import { environment } from '../../../environments/environment';

export interface Organizacion {
  id: number;
  name: string;
  description: string;
  webpage: string;
  nick: string;
  email: string;
  password: string;
  themes: string;
  avatarImage: string | null;
  avatarImageFormat: string;
}

@Component({
  selector: 'app-register-organization',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register-organization.component.html',
  styleUrl: './register-organization.component.css',
  providers: [AuthService],
})
export class RegisterOrganizationComponent {
  @ViewChild('findImage') findImage!: ElementRef;

  title = 'imagenes';
  nuevaImagen: string = '';
  imagenCargada: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(environment.IMG_STRING);

  base64Image: string | null = null;

  myForm!: FormGroup;

  imageFormat: string = 'png';

  imagendividida: string[] = [];

  themesList: number[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.myForm = this.fb.group({
      // Define tus controles de formulario y validaciones aquí
      name: ['', Validators.required],
      description: [''],
      webpage: [''],
      email: [''],
      password: [''],
      repeatpassword: [''],
    });
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
          //if ((format === 'jpeg' || format === 'png') && width <= 2048 && height <= 2048) {
          if (format === 'jpeg' || format === 'png') {
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
          } /* else if (width > 2048 || height > 2048) {
                console.log('Las dimensiones de la imagen son mayores a 1024x720px');
            } */
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

  registrarv1(evento: Event) {
    const inputActivado = evento.target as HTMLInputElement;
    alert('registrado');
  }

  registrar(evento: Event) {
    const inputActivado = evento.target as HTMLInputElement;
    evento.preventDefault();
    console.log(this.myForm.get('name')?.value);

    let newOrganizationData: OrganizationInterface = {
      name: this.myForm.get('name')?.value,
      description: this.myForm.get('description')?.value,
      webpage: this.myForm.get('webpage')?.value,
      email: this.myForm.get('email')?.value,
      password: this.myForm.get('password')?.value,
      rol: 2,
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
          alert(
            'Usuario creado con éxito. A partir de aquí, crearemos un nuevo usuario en nuestra BD, para almacenar el resto de la información.'
          );
          this.authservice.logout();
          this.authservice
            .registerOrganizationAPI(newOrganizationData)
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
