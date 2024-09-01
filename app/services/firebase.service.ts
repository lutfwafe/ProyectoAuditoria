import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {getFirestore, setDoc, doc, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);


  // ============ Autenticacion ==============
  getAuth(){
    return getAuth();
  }




  // ============ Acceder ==============
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ============ Acceder ==============
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //============ Actualizar usuario =========
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

  // ============ Enviar Email para restablecer la contraseña ===============
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(),email);
  }


  //============= Base de datos ===================


  //=========== Setear un documento ===============
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  //========== obtener un documento ==============
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}
