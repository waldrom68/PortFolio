import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, list, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})



// upLoadFile()
export class UploadMediaService {
  url: string = "";
  constructor(
    private storage: Storage,
  ) { }





  // upLoadFile(evento: any, path: string, name: string) {
  //   const file = evento.target.files[0];
  //   const fileref = ref(this.storage, path + name );
   
    
  //   uploadBytes(fileref, file)
  //   .then( r => {
  //     console.log("resultado de uploadBytes", r)
      
  //     this.getUrlFile();
  //   })
  //   .catch( e  => console.log("Error de la subida"));

  // }


  getUrlFile() {
    const imageRef = ref(this.storage, "image/1");
    
    
    list(imageRef)
    .then(async r => {
      console.log(r);

      for(let file of r.items) {
        console.log("Encontrado a " + file);
        if (file.name == "fotoPerfil") {
          this.url = await getDownloadURL(file);
          console.log("URL COINCIDENTE-> " + this.url);
        }
      }
    })
    .catch(e  => console.log("Error al obtener URL de descarga"))

  }

  // Fuente: https://firebase.google.com/docs/storage/web/upload-files?hl=es-419
  upLoadFile(evento: any, path: string, name: string) {
    // PENDIENTE MOSTRAR BARRA DE PROGRESO.
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
          this.url = downloadURL;
        });
      }
    );
  }

}
