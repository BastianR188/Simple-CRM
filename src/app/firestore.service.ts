import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {


  firestore: Firestore = inject(Firestore);
  allDataUsers: any[] = [];


  constructor() {
  }

  save(user: User) {
    return addDoc(collection(this.firestore, 'users'), user.toJSON())
  }

  load() {
    const query = collection(this.firestore, 'users');
    onSnapshot(query, (querySnapshot) => {
      this.allDataUsers = [];
      querySnapshot.forEach((doc) => {
        this.allDataUsers.push({ id: doc.id, ...doc.data() });
      });
      console.log(this.allDataUsers);
    });

  }
}