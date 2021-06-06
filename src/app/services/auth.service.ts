import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDatas;
  private isUserLoggedIn = false;

  private isUserAuthd = new Subject<boolean>();

  constructor(private router: Router) {
    localStorage.setItem("userDatas", JSON.stringify([
      {"id": "jjohn12", "name": "Joffin John", "pwd": "123qwe"},
      {"id": "akumar759", "name": "Arikeri Veeresh Kumar", "pwd": "abc123"},
      {"id": "wshetty", "name": "Wilma Shetty", "pwd": "qwerty"},
      {"id": "rgupta69", "name": "Rahul Gupta", "pwd": "asdfg123"},
      {"id": "aabraham6", "name": "Arun Abraham", "pwd": "456abc"}
    ]));
  }

  getUserAuthd(): Observable<boolean> {
    return this.isUserAuthd.asObservable();
  }

  getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  async checkUser(loginUserData): Promise<void> {
    const userPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(JSON.parse(localStorage.getItem("userDatas")));
      }, 2000);
    });
    this.userDatas = await userPromise;
    const userData = this.userDatas.filter(user => {
      return user.id === loginUserData.username;
    });
    if (userData && userData.length === 1) {
      if (userData[0].pwd === loginUserData.passwrd) {
        this.saveLoggedInUserData(loginUserData.username);
        this.isUserLoggedIn = true;
        this.isUserAuthd.next(true);
        this.router.navigate(['']);
      } else {
        alert("Please enter valid password !!");
      }
    } else {
      alert("Username provided doesnt exist. Please signup with your username");
      this.router.navigate(['/signUp']);
    }
  }

  signInUser(userSignInData): void {
    const newUserData = {
      id: userSignInData.userId,
      name: userSignInData.username,
      pwd: userSignInData.password,
    };
    const userPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("userDatas"));
        if (users && users.length) {
          users.push(newUserData);
          localStorage.setItem('userDatas', JSON.stringify(users));
          resolve(users);
        } else {
          reject('SignIn failed');
        }
      }, 2000);
    });

    userPromise.then((users) => {
      console.log(users);
      alert("Your SignIn was successfull, Please login to continue.");
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
      alert("SignIn was unsuccessfull, Please signIn again.. :)");
    });
  }

  saveLoggedInUserData(userId): void {
    localStorage.setItem('userId', userId);
  }

  retrieveLoggedInUserData(): string {
    const userId = localStorage.getItem('userId');
    return userId;
  }

  logOut(): void {
    this.isUserLoggedIn = false;
    this.isUserAuthd.next(false);
    this.clearLoggedUserData();
    this.router.navigate(['']);
  }

  clearLoggedUserData(): void {
    localStorage.removeItem('userId');
  }


}
