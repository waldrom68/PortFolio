import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, list, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { FullPersonDTO, Mensaje, Person } from '../models';
import { MatAlertComponent } from '../shared/mat-alert/mat-alert.component';
import { BaseDataService, DataService } from './data.service';
import { ProgressValueService, UiService } from './ui.service';


@Injectable({
  providedIn: 'root'
})



// upLoadFile()
export class UploadMediaService {
  url: string = "";
  // DATAPORTFOLIO: FullPersonDTO;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  valueSubscription: Subscription;
  progreesValueabc: number;
  progreesValueabc$?: Observable<number>;


  constructor(
    private storage: Storage,
    private dataService: DataService,
    private baseDataService: BaseDataService,

    private uiService: UiService, 

  ) {
    // this.DATAPORTFOLIO = this.dataService.getData();
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );
    this.progreesValueabc$ = this.dataService.getCurrentValue$();
    this.progreesValueabc$.subscribe(valor => this.progreesValueabc = valor);

    // this.dataService.setCurrentValue(0);


  }


  // Fuente: https://firebase.google.com/docs/storage/web/upload-files?hl=es-419
  upLoadFile(evento: any, path: string, name: string, person: Person) {
    // PENDIENTE MOSTRAR BARRA DE PROGRESO.
    // SI YA TENIA UNA IMAGEN DE PERFIL, ELIMINARLA DEL REPO DE GOOGLE AL FINALIZAR
    // LA ACTUALIZACION. 
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, path + name);
    const uploadTask = uploadBytesResumable(storageRef, evento.target.files[0], metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        this.dataService.setCurrentValue(progress);

        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');

            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        let errText: string = "";
        switch (error.code) {
          case 'storage/unauthorized':
            errText = "Almacenamiento no autorizado, sin permisos suficientes"
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            errText = "Almacenameniento cancelado por el usuario"
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            errText = "Ha ocurrido un error inseperado, problemas con la respuesta del servidor o sin respuesda del mismo"
            break;
        }
        let msg = new Array()
        msg.push("Se quizo guardar la imagen sin ," + error.code + errText);
        this.uiService.msgboxErr( msg,);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        this.uiService.msgboxOk(['Nueva imagen almacenada exitosamente'],);
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at -> ', downloadURL);

          // PENDIENTE, es una truchada, repensarlo y refactorizar
          // 
          if (name == "/fotoBG") {
            person.pathBgImage = downloadURL;
          } else {
            person.pathFoto = downloadURL;
          }


          this.dataService.upDateEntity(person, "/person").subscribe({
            next: (v) => {
              this.uiService.msgboxOk( ['Nueva imagen obtenida exitosamente'],);
              console.log("Guardado correctamente: ", v)

              // actualizo los valores
              if (name == "/fotoBG") {
                this.baseData.pathBgImage = downloadURL;
              } else {
                this.baseData.pathFoto = downloadURL;
              }
              this.baseDataService.setCurrentBaseData(this.baseData);

            },
            error: (e) => {
              let msg = new Array()
              console.log("Se quizo cambiar la imagen sin exito");
              msg.push("Se quizo obtener la nueva imagen sin exito;");
              msg.push(e.error.mensaje ? e.error.mensaje : e.message);
              this.uiService.msgboxErr( msg,); 

              // Restauro valor original
            },
            complete: () => console.log("Completada la actualizacion de la imagen")
          });




        });
      }
    );
  }

}
