import {Provider, Next} from '@loopback/core';
import {Middleware, MiddlewareContext} from '@loopback/rest';
import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';

export class AuthMiddlewareProvider implements Provider<Middleware> {
  value(): Middleware {
    return async (context: MiddlewareContext, next: Next) => {
      const {request} = context;
      const secretKey = '#'; // Replace with actual key or use env variable

      // Read the cookie from headers
      const cookie = request.headers['cookie'];
      if (!cookie) {
        return next();
      }

      // Assume the cookie name is 'authCookie'
      const cookieEntry = cookie.split('; ').find(row => row.startsWith('authCookie='));
      if (!cookieEntry) {
        return next();
      }

      const encryptedCookie = cookieEntry.split('=')[1];

      try {
        // Decrypt the cookie
        const bytes = CryptoJS.AES.decrypt(encryptedCookie, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        const userId = JSON.parse(decryptedData).userId;

        // Generate JWT
        const token = jwt.sign({userId}, '#', {expiresIn: '1h'});

        // Add the JWT to the authorization header
        request.headers['authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error decrypting cookie or generating JWT:', error);
      }

      return next();
    };
  }
}
