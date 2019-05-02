import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { SessionStore } from './session.store';
import { StitchService } from 'src/app/services/stitch/stitch.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(
    private sessionStore: SessionStore,
    private stitch: StitchService
  ) {
  }

  async auth(credentials: { email: string, password: string }) {
    const user = await this.stitch.auth(credentials);
    this.sessionStore.update({ email: user.profile.email });
    return user;
  }

  isLoggin() {
    return this.stitch.isLoggedIn$;
  }

}
