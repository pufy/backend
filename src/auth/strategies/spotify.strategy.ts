import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Strategy } from 'passport-spotify';
import { AuthService } from '../auth.service';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy) {

  constructor(
    @Inject('ConfigService') private readonly config,
    private authService: AuthService
  ) {
    super(
      {
        clientID: config.spotify.client_id,
        clientSecret: config.spotify.client_secret,
        callbackURL: config.spotify.callback_url,
        scope: [
          'user-read-playback-state',
          'user-modify-playback-state',
          'user-read-currently-playing',
          'user-read-email',
          'user-read-private'
        ],
        showDialog: true
      }
    )
  }

  async validate(accessToken, refreshToken, profile, done) {
    const placeId = 2, accountSpotify = 1;
    await this.authService.createSessionSpotify(accessToken, refreshToken, placeId, accountSpotify);
    return done(null, profile);
  }
}