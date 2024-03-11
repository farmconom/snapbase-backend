import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  MockSignInInput,
  SignInWithEmailInput,
  SignUpWithEmailInput,
} from './dto/sing.input';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
  ) {}

  // Mock
  @Post('mock-signin')
  async mockSignIn(@Body() body: MockSignInInput) {
    const user = await this.firebaseService.signInWithEmailAndPassword(body);
    const tokens = this.authService.generateTokens({
      userId: user.data.uid,
    });
    const data = { ...user, data: { ...user.data, tokens } };
    return data;
  }

  // Email Auth
  @Post('email/sign-up')
  async signUpWithEmail(@Body() body: SignUpWithEmailInput) {
    const user = await this.firebaseService.signUpWithEmailAndPassword(body);
    const tokens = this.authService.generateTokens({
      userId: user.data.uid,
    });
    const data = { ...user, data: { ...user.data, tokens } };
    return data;
  }

  @Post('email/sign-in')
  async signInWithEmail(@Body() body: SignInWithEmailInput) {
    const user = await this.firebaseService.signInWithEmailAndPassword(body);
    const tokens = this.authService.generateTokens({
      userId: user.data.uid,
    });
    const data = { ...user, data: { ...user.data, tokens } };
    return data;
  }

  // Google Auth
  @Post('google/sign-in')
  async googleSignIn() {
    const user = await this.firebaseService.signInWithGoogle();
    const tokens = this.authService.generateTokens({
      userId: user.data.uid,
    });
    const data = { ...user, data: { ...user.data, tokens } };
    return data;
  }
}
