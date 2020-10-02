import {Component, Input} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {firestore} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
})
export class FileUploadComponent {
  @Input() fileUrl: string;
  @Input() docId: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  error: boolean = false;
  errorMessage: string = '';

  constructor(private _storage: AngularFireStorage, private _afs: AngularFirestore) {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event) {
    const file = event.target.files[0];
    const filePath = this.fileUrl + '/' + event.target.files[0].name + '_' + new Date().getTime();
    const fileRef = this._storage.ref(filePath);
    // const task = this._storage.upload(filePath, file);
    const task = fileRef.put(file);
    // observe percentage changes
    this.percentage = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL()),
    )
      .subscribe((res) => {
        // if (res.bytesTransferred === res.totalBytes) {
        //   this._backendService.updateFileUpload(this.fileUrl, this.docId, res.ref['location'].path);
        // }
        // this.updateFileUpload(this.fileUrl, this.docId, res.ref['location']).then((data) => {
        //   // tslint:disable-next-line:no-console
        //   console.log(data);
        // });
        // tslint:disable-next-line:no-console
        console.log(res);
      });
  }

  updateFileUpload(coll: string, docId: string, filePath: string) {
    // tslint:disable-next-line:no-console
    console.log(docId);
    // tslint:disable-next-line:no-console
    console.log(filePath);
    const timestamp = this.timestamp;
    const docRef = this._afs.collection('documents').doc('1212312313');
    // tslint:disable-next-line:no-console
    console.log(filePath);
    // return docRef.update({
    //   files: firestore.FieldValue.arrayUnion(filePath),
    //   updatedAt: timestamp,
    //   // username: this.afAuth.auth.currentUser.displayName,
    //   // useremail: this.afAuth.auth.currentUser.email,
    //   // author: this.afAuth.auth.currentUser.uid
    // });
  }

  get timestamp() {
    const d = new Date();
    return d;
    // return firebase.firestore.FieldValue.serverTimestamp();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}