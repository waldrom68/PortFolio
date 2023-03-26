import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, list, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { FullPersonDTO, Mensaje, Person } from '../models';
import { MatAlertComponent } from '../shared/mat-alert/mat-alert.component';
import { BaseDataService, DataService } from './data.service';
import { ProgressValueService } from './ui.service';


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

    private dialog: MatDialog,


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
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at -> ', downloadURL);

          // PENDIENTE, es una truchada, repensarlo y refactorizar
          // me duelen los ojos al ver lo que hice aquí ;)
          if (name == "/fotoBG") {
            person.pathBgImage = downloadURL;
          } else {
            person.pathFoto = downloadURL;
          }


          this.dataService.upDateEntity(person, "/person").subscribe({
            next: (v) => {
              this.alertDialog(
                "ok",
                ['Imagen guardada exitosamente'],
                1500);

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
              msg.push("Se quizo modificar sin exito la imagen");
              msg.push(e.message);
              this.alertDialog("error", msg, 0);

              console.log("Se quizo cambiar imagen del Perfil sin exito");
              // Restauro valor original
            },
            complete: () => console.log("Completada la actualizacion de la imagen del perfil")
          });




        });
      }
    );
  }

    // Mensaje de alerta.
  // type: "ok", "error", "info"
  alertDialog( type:string="ok", data:string[], timer:number=0) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-warn";

    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // dialogConfig.maxWidth = '700px';
    dialogConfig.data = new Mensaje(type, data, timer)


    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
  }
}
