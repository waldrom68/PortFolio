import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, list, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { FullPersonDTO, Person } from '../models';
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
  upLoadFile(evento: any, path: string, name: string, person:Person) {
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
          person.pathFoto = downloadURL;

          this.dataService.upDateEntity(person, "/person").subscribe( {
            next: (v) => {
              console.log("Guardado correctamente: ", v)
              // actualizo los valores
              this.baseData.pathFoto = downloadURL;
              this.baseDataService.setCurrentBaseData( this.baseData );
            },
            error: (e) => {
              alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
              console.log("Se quizo cambiar imagen del Perfil sin exito");
              // Restauro valor original
            },
            complete: () => console.log("Completada la actualizacion de la imagen del perfil")
          } );




        });
      }
    );
  }

}
